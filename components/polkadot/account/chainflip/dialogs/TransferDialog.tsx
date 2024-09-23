import React from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import { toBigFloat, toBigNumber } from "common-crypto-tools";
import { api } from "polkadot-typed-api";

import { Dialog, DialogBaseProps } from "@/components/Dialog/Dialog";
import { AmountInput } from "@/components/polkadot/account/chainflip/components/AmountInput";
import { Assets } from "@/components/polkadot/account/chainflip/assets";
import { useToggleHandler } from "@/hooks/useToggleHandler";
import { PoladotAccountDialogControls } from "@/components/polkadot/account/chainflip/controls/PoladotAccountDialogControls";
import { InputWithTitle } from "@/components/common/InputWithTitle";
import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { addPolkadotTransaction } from "@/stores/transactions";
import { loadPolkadotLedger } from "@/stores/polkadot/polkadotLedgerStore";
import { loadPolkadotAccount } from "@/stores/polkadot/polkadotAccountsStore";
import { PolkadotChainConfig } from "@/config/polkadotChainConfig";

type TransferDialogProps = DialogBaseProps & {
  account: string;
};

export const TransferDialog: React.FC<TransferDialogProps> = ({
  isOpen,
  onClose,
  account,
}) => {
  const [value, set_value] = React.useState<string>("0");
  const [destination, set_destination] = React.useState<string>("");
  const [loading, toggleLoading] = useToggleHandler(false);
  const [unlockedAccount, set_unlockedAccount] =
    React.useState<KeyringPair | null>(null);

  function onCloseHandler() {
    if (!loading) {
      set_destination("");
      set_value("0");
      onClose();
    }
  }

  async function onTransfer() {
    if (unlockedAccount) {
      const apiPromise = await loadApiPromise();
      const extrinsic = await api.tx.balances.transferKeepAlive(
        apiPromise,
        destination,
        toBigNumber(
          toBigFloat(value)
            .multipliedBy(PolkadotChainConfig.decimals)
            .toString(),
        ).toString(),
      );

      toggleLoading(true, true);
      addPolkadotTransaction(
        extrinsic,
        unlockedAccount,
        "Transfer",
        destination,
      ).then((result) => {
        if (result) {
          onCloseHandler();
        }
        loadPolkadotLedger(account);
        loadPolkadotAccount(account);
        set_unlockedAccount(null);
      });
    }
    //
  }

  const actionIsDisabled =
    toBigFloat(value).isLessThanOrEqualTo(0) || loading || !destination;

  return (
    <Dialog
      footer={
        <PoladotAccountDialogControls
          actionText="Transfer"
          disabled={actionIsDisabled}
          unlockedAccount={unlockedAccount}
          updateUnlockedAccount={set_unlockedAccount}
          onClose={onCloseHandler}
          onSend={onTransfer}
        />
      }
      header="Transfer your DOT's"
      isOpen={isOpen}
      onClose={onCloseHandler}
    >
      <div className="flex flex-col w-full gap-4">
        <InputWithTitle
          disabled={loading}
          id="dest"
          label="Destination account"
          placeholder="xxx"
          title="Destination"
          type="text"
          value={destination}
          onChange={set_destination}
        />

        <AmountInput
          account={account}
          action="transfer"
          asset={Assets.DOT}
          disabled={loading}
          value={value}
          onChange={set_value}
        />
      </div>
    </Dialog>
  );
};
