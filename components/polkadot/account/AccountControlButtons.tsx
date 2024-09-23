"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { useStore } from "@nanostores/react";
import { toBigNumber } from "common-crypto-tools";

import {
  loadPolkadotAccount,
  polkadotAccountsStore,
} from "@/stores/polkadot/polkadotAccountsStore";
import { DepositDialog } from "@/components/polkadot/account/chainflip/dialogs/DepositDialog";
import { WithdrawDialog } from "@/components/polkadot/account/chainflip/dialogs/WithdrawDialog";
import { useToggleHandler } from "@/hooks/useToggleHandler";
import { TransferDialog } from "@/components/polkadot/account/chainflip/dialogs/TransferDialog";

type AccountControlButtonsProps = {
  account: string;
};

let depositModalWasOpen = false;
let withdrawModalWasOpen = false;

export const AccountControlButtons: React.FC<AccountControlButtonsProps> = ({
  account,
}) => {
  // const [depositModalIsOpen, set_depositModalIsOpen] =
  //   React.useState<boolean>(false);
  const [depositModalIsOpen, toggleDepositModalIsOpen] =
    useToggleHandler(false);
  const [withdrawModalIsOpen, toggleWithdrawModalIsOpen] =
    useToggleHandler(false);
  const [transferModalIsOpen, toggleTransferModalIsOpen] =
    useToggleHandler(false);
  const $polkadotAccountsStore = useStore(polkadotAccountsStore);

  const data = $polkadotAccountsStore[account];

  const isNotZeroBalance = data ? toBigNumber(data.data.free).gt(0) : false;

  React.useEffect(() => {
    if (!depositModalIsOpen && depositModalWasOpen) {
      void loadPolkadotAccount(account);
    } else {
      depositModalWasOpen = true;
    }
  }, [depositModalIsOpen]);

  React.useEffect(() => {
    if (!withdrawModalIsOpen && withdrawModalWasOpen) {
      void loadPolkadotAccount(account);
    } else {
      withdrawModalWasOpen = true;
    }
  }, [withdrawModalIsOpen]);

  return (
    <>
      <DepositDialog
        account={account}
        isOpen={depositModalIsOpen}
        onClose={toggleDepositModalIsOpen(false)}
      />
      <WithdrawDialog
        account={account}
        isOpen={withdrawModalIsOpen}
        onClose={toggleWithdrawModalIsOpen(false)}
      />
      <TransferDialog
        account={account}
        isOpen={transferModalIsOpen}
        onClose={toggleTransferModalIsOpen(false)}
      />
      <div
        className="
        flex w-full
        items-start justify-start gap-4"
      >
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "primary",
          })}
          onClick={toggleDepositModalIsOpen(true)}
        >
          Deposit
        </Button>
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "secondary",
            isDisabled: !isNotZeroBalance,
          })}
          disabled={!isNotZeroBalance}
          onClick={toggleWithdrawModalIsOpen(true)}
        >
          Withdraw
        </Button>
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "success",
            isDisabled: !isNotZeroBalance,
          })}
          disabled={!isNotZeroBalance}
          onClick={toggleTransferModalIsOpen(true)}
        >
          Transfer
        </Button>
      </div>
    </>
  );
};
