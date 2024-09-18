import React from "react";
import debounce from "lodash.debounce";
import { useStore } from "@nanostores/react";
import { toBigFloat } from "common-crypto-tools";

import { titleH3 } from "@/components/primitives";
import { Input } from "@/components/common/Input";
import {
  Assets,
  AssetsNames,
} from "@/components/polkadot/account/chainflip/assets";
import { accountBalance } from "@/stores/erc20Store";
import { polkadotAccountsStore } from "@/stores/polkadot/polkadotAccountsStore";

type AmountInputProps = {
  account: string;
  onChange: (value: string) => void;
  value: string;
  asset: Assets;
  action: string;
  disabled: boolean;
};

const MinValues: Record<Assets, string> = {
  [Assets.DOT]: "4",
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
    if (action === "withdraw") {
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
    <>
      <h3 className={titleH3({ size: "sm" })}>Amount</h3>
      <div className="flex flex-col w-full items-start justify-start">
        <Input
          disabled={disabled}
          id="amount"
          label={`Amount of ${AssetsNames[asset]} to ${action}`}
          placeholder="xxx"
          type="number"
          value={internalValue}
          onChange={updateValue}
        />
      </div>
    </>
  );
};
