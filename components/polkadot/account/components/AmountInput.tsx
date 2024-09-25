import React from "react";
import debounce from "lodash.debounce";
import { useStore } from "@nanostores/react";
import { toBigFloat } from "common-crypto-tools";

import {
  Assets,
  AssetsNames,
} from "@/components/polkadot/account/chainflip/assets";
import { accountBalance } from "@/stores/erc20Store";
import { polkadotAccountsStore } from "@/stores/polkadot/polkadotAccountsStore";
import { InputWithTitle } from "@/components/common/InputWithTitle";

type AmountInputProps = {
  account: string;
  onChange: (value: string) => void;
  value: string;
  asset: Assets;
  action: string;
  disabled: boolean;
  title?: string;
};

const MinValues: Record<Assets, string> = {
  [Assets.DOT]: "0",
  [Assets.USDC]: "4",
  [Assets.ETH]: "0.001",
};

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  asset,
  action,
  account,
  disabled,
  title,
}) => {
  const $polkadotAccountsStore = useStore(polkadotAccountsStore);
  const $accountBalance = useStore(accountBalance);
  const [internalValue, set_internalValue] = React.useState<string>("");
  const [maxValue, set_maxValue] = React.useState<string>("10000000");
  const [minValue, set_minValue] = React.useState<string>(
    MinValues[Assets.USDC],
  );

  const onInternalChange = React.useCallback(debounce(onChange, 1_000), []);

  function updateValue(value: string) {
    let _value: string = value;

    if (maxValue && value && +value > +maxValue) {
      if (+value > +maxValue) {
        _value = maxValue;
      }
    } else if (+value < +minValue) {
      _value = minValue;
    }
    set_internalValue(_value);
  }

  React.useEffect(() => {
    set_internalValue(value);
  }, [value]);

  React.useEffect(() => {
    onInternalChange(internalValue);
  }, [internalValue]);

  React.useEffect(() => {
    if (action === "withdraw" || action === "transfer") {
      set_minValue(MinValues[Assets.DOT]);
      const accountBalances = $polkadotAccountsStore[account];

      if (accountBalances) {
        set_maxValue(
          toBigFloat(accountBalances.data.transferable)
            .div(10 ** 10)
            .minus(0.01)
            .toString(),
        );
      }
    } else {
      set_minValue(MinValues[asset]);
      if (asset === Assets.USDC && $accountBalance) {
        set_maxValue($accountBalance);
      } else {
        set_maxValue("10000000");
      }
    }
  }, [action, asset]);

  return (
    <InputWithTitle
      disabled={disabled}
      id="amount"
      label={`Amount of ${AssetsNames[asset]} to ${action}`}
      placeholder="xxx"
      title={title}
      type="number"
      value={internalValue}
      onChange={updateValue}
    />
  );
};
