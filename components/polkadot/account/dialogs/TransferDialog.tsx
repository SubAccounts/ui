import React from "react";
import { toBigFloat, toBigNumber } from "common-crypto-tools";
import { useStore } from "@nanostores/react";
import { api } from "polkadot-typed-api";
import { Checkbox } from "@nextui-org/react";

import { Dialog, DialogBaseProps } from "@/components/Dialog/Dialog";
import { AmountInput } from "@/components/polkadot/account/components/AmountInput";
import { Assets } from "@/components/polkadot/account/chainflip/assets";
import { useToggleHandler } from "@/hooks/useToggleHandler";
import { PoladotAccountDialogControls } from "@/components/polkadot/account/components/PoladotAccountDialogControls";
import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import {
  loadPolkadotAccount,
  polkadotAccountsStore,
} from "@/stores/polkadot/polkadotAccountsStore";
import { PolkadotChainConfig } from "@/config/polkadotChainConfig";
import { Chains } from "@/config/chains";
import { Tabs } from "@/components/ui/buttons/Tabs";
import { Input } from "@/components/common/Input";
import { useSubAccountsBalanceLoad } from "@/hooks/useSubAccountsBalanceLoad";
import { AccountSelector } from "@/components/polkadot/account/components/AccountSelector";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { addPolkadotTransaction } from "@/stores/transactions";
import { loadPolkadotLedger } from "@/stores/polkadot/polkadotLedgerStore";
import { useUnlockedAccount } from "@/hooks/useUnlockedAccount";

type TransferDialogProps = DialogBaseProps & {
  account: string;
};

export const TransferDialog: React.FC<TransferDialogProps> = ({
  isOpen,
  onClose,
  account,
}) => {
  const web3 = useWeb3Onboard();
  const [accountSelectIsAvailable, toggleAccountSelectIsAvailable] =
    useToggleHandler(false);
  const [mode, set_mode] = React.useState<string>("sub_account");
  const [value, set_value] = React.useState<string>("0");
  const [destination, set_destination] = React.useState<string>("");
  const [loading, toggleLoading] = useToggleHandler(false);
  const [allowDeath, toggleAllowDeath] = useToggleHandler(false);

  const unlockedAccount = useUnlockedAccount();

  const accounts = useSubAccountsBalanceLoad(Chains.Polkadot);
  const $polkadotAccountsStore = useStore(polkadotAccountsStore);

  function onCloseHandler() {
    if (!loading) {
      set_destination("");
      set_value("0");
      unlockedAccount.set(null);
      toggleLoading(false, true);
      onClose();
    }
  }

  const valueInMiniDots = toBigNumber(
    toBigFloat(value).multipliedBy(PolkadotChainConfig.decimals).toString(),
  ).toString();

  const accountBalance =
    $polkadotAccountsStore[account]?.data.transferable || "0";

  const balanceAfterTransfer =
    toBigFloat(accountBalance).minus(valueInMiniDots);

  const balanceIsLessThan1DOT = balanceAfterTransfer.isLessThanOrEqualTo(
    PolkadotChainConfig.decimals,
  );

  const transferAll = balanceAfterTransfer.isLessThanOrEqualTo(
    PolkadotChainConfig.decimals * 0.1,
  );

  const afterState = allowDeath ? "Allow Death" : "Keep Alive";
  let txName = "Transfer";

  if (transferAll) {
    txName = `Transfer All (${afterState})`;
  } else if (balanceIsLessThan1DOT) {
    txName = `Transfer (${afterState})`;
  }

  async function onTransfer() {
    if (unlockedAccount.value && web3.currentAccountAddress) {
      const apiPromise = await loadApiPromise();
      let extrinsic = await api.tx.balances.transferAll(
        apiPromise,
        destination,
        !allowDeath,
      );

      if (!transferAll) {
        if (allowDeath) {
          extrinsic = await api.tx.balances.transferAllowDeath(
            apiPromise,
            destination,
            valueInMiniDots,
          );
        } else {
          extrinsic = await api.tx.balances.transferKeepAlive(
            apiPromise,
            destination,
            valueInMiniDots,
          );
        }
      }

      toggleLoading(true, true);
      try {
        addPolkadotTransaction(
          extrinsic,
          unlockedAccount.value,
          "Transfer",
          web3.currentAccountAddress,
        )
          .then((result) => {
            console.log(result);
            if (result) {
              onCloseHandler();
            }

            unlockedAccount.set(null);
          })
          .catch((e) => {
            console.error("!", e);
          })
          .finally(() => {
            toggleLoading(false, true);
            loadPolkadotLedger(account);
            loadPolkadotAccount(account);
            loadPolkadotAccount(destination);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  React.useEffect(() => {
    toggleAccountSelectIsAvailable(accounts.length > 1, true);
  }, [accounts.length]);

  React.useEffect(() => {
    if (!balanceIsLessThan1DOT) {
      toggleAllowDeath(false, true);
    }
  }, [balanceIsLessThan1DOT]);

  React.useEffect(() => {
    set_destination("");
  }, [mode]);

  const actionIsDisabled =
    toBigFloat(value).isLessThanOrEqualTo(0) || loading || !destination;

  const accountsToSelect = accounts.map((e) => ({ address: e.networkAddress }));

  return (
    <Dialog
      footer={
        <PoladotAccountDialogControls
          actionText={txName}
          disabled={actionIsDisabled}
          unlockedAccount={unlockedAccount.value}
          updateUnlockedAccount={unlockedAccount.set}
          onClose={onCloseHandler}
          onSend={onTransfer}
        />
      }
      header="Transfer your DOT's"
      isOpen={isOpen}
      onClose={onCloseHandler}
    >
      <div className="flex flex-col w-full gap-4">
        <Tabs
          disabled={loading}
          options={[
            ["sub_account", "To SubAccount", !accountSelectIsAvailable],
            ["external", "To External Account"],
          ]}
          value={mode}
          onChange={set_mode}
        />
        {mode === "sub_account" ? (
          <AccountSelector
            disabled={loading}
            disabledKeys={[account]}
            options={accountsToSelect}
            value={destination}
            onChange={set_destination}
          />
        ) : (
          <Input
            disabled={loading}
            id="dest"
            label="Destination account"
            placeholder="1..."
            type="text"
            value={destination}
            onChange={set_destination}
          />
        )}

        <AmountInput
          account={account}
          action="transfer"
          asset={Assets.DOT}
          disabled={loading}
          value={value}
          onChange={set_value}
        />

        {balanceIsLessThan1DOT && (
          <Checkbox
            disabled={loading}
            isSelected={allowDeath}
            onValueChange={toggleAllowDeath(!allowDeath)}
          >
            Allow account death
          </Checkbox>
        )}
      </div>
    </Dialog>
  );
};
