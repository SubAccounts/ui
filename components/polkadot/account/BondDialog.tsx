import React from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import { toBigFloat } from "common-crypto-tools/common";
import { useStore } from "@nanostores/react";

import { Dialog, DialogBaseProps } from "@/components/Dialog/Dialog";
import { useSubAccount } from "@/components/polkadot/account/WithCorrectOwner";
import { buttonStyles } from "@/utils/ui/buttonStyles";
import { UnlockAccountButton } from "@/components/UnlockAccountButton";
import {
  loadPolkadotAccount,
  polkadotAccountsStore,
} from "@/stores/polkadot/polkadotAccountsStore";
import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { addPolkadotTransaction, isSendingNow } from "@/stores/transactions";
import {
  loadPolkadotLedger,
  polkadotLedgerStore,
} from "@/stores/polkadot/polkadotLedgerStore";
import { PolkadotChainConfig } from "@/config/polkadotChainConfig";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";

type BondDialogProps = DialogBaseProps;

const defaultValue = PolkadotChainConfig.minimalBalanceToStakeHuman.toString();

export const BondDialog: React.FC<BondDialogProps> = ({ isOpen, onClose }) => {
  const web3 = useWeb3Onboard();
  const $polkadotAccountsStore = useStore(polkadotAccountsStore);
  const $polkadotLedgerStore = useStore(polkadotLedgerStore);
  const $isSendingNow = useStore(isSendingNow);
  const [loading, set_loading] = React.useState<boolean>(false);
  const { subAccount, account, unlockedAccount, unlockAccount } =
    useSubAccount();

  const accountData = account ? $polkadotAccountsStore[subAccount] : null;

  const [restoredAccount, set_restoredAccount] =
    React.useState<KeyringPair | null>(null);
  const [value, set_value] = React.useState<string>(defaultValue);

  const polkadotValue = toBigFloat(+value * 10 ** 10);

  const maxValue = accountData
    ? toBigFloat(accountData.data.transferable)
        .div(10 ** 10)
        .toString()
    : defaultValue;

  function onInputBlur(value: number) {
    console.log(maxValue);
    if (value > +maxValue) {
      set_value(maxValue);
    } else if ($polkadotLedgerStore[subAccount]) {
      //
    } else if (value < PolkadotChainConfig.minimalBalanceToStakeHuman) {
      set_value(defaultValue);
    }
  }

  async function sendTransaction() {
    if (restoredAccount && web3.wallet) {
      const ledgerData = $polkadotLedgerStore[subAccount];
      const apiPromise = await loadApiPromise();

      let extrinsic = apiPromise.tx.staking.bond(+value * 10 ** 10, {
        Staked: null,
      });

      if (ledgerData && ledgerData.active > 0) {
        console.log("!");
        extrinsic = apiPromise.tx.staking.bondExtra(+value * 10 ** 10);
      }

      set_loading(true);
      addPolkadotTransaction(
        extrinsic,
        restoredAccount,
        "Bond",
        web3.wallet.accounts[0].address,
      ).then((result) => {
        if (result) {
          onClose();
          set_value(defaultValue);
        }
        loadPolkadotLedger(subAccount);
        loadPolkadotAccount(subAccount);
        set_loading(false);
      });

      set_restoredAccount(null);
    }
  }

  return (
    <Dialog
      footer={
        <div className="flex items-end gap-4">
          {unlockedAccount ? (
            restoredAccount || loading ? (
              <button
                className={buttonStyles({
                  variant: "bordered",
                  radius: "sm",
                  color: "secondary",
                  isDisabled: polkadotValue.lte(0) || $isSendingNow,
                })}
                disabled={polkadotValue.lte(0) || $isSendingNow}
                onClick={sendTransaction}
              >
                {loading ? "Bonding..." : "Bond"}
              </button>
            ) : (
              <UnlockAccountButton onAccountRestore={set_restoredAccount} />
            )
          ) : (
            <button
              className={buttonStyles({
                variant: "bordered",
                radius: "sm",
              })}
              onClick={unlockAccount}
            >
              Restore account
            </button>
          )}
        </div>
      }
      header={<>Bond DOTs to staking</>}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full flex-col gap-4">
        <p>
          Make sure your transferable balance includes <b>at least 1 DOT</b> to
          cover the network fees like staking, unstaking, and withdrawals
          transactions.
        </p>
        <div className="flex flex-col w-full items-start justify-start">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="amount"
          >
            Amount of DOTs to stake
          </label>
          <input
            required
            autoComplete="off"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="amount"
            max={maxValue}
            placeholder="xxx DOT"
            type="number"
            value={value}
            onBlurCapture={(e) => onInputBlur(+e.target.value)}
            onChange={(e) => set_value(e.target.value)}
          />
        </div>
      </div>
    </Dialog>
  );
};
