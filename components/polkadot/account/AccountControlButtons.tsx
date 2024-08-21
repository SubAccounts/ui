"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { useStore } from "@nanostores/react";
import { toBigNumber } from "common-crypto-tools/common";

import { polkadotAccountsStore } from "@/stores/polkadotAccountsStore";
import { DepositDialog } from "@/components/polkadot/account/DepositDialog";

type AccountControlButtonsProps = {
  account: string;
};

export const AccountControlButtons: React.FC<AccountControlButtonsProps> = ({
  account,
}) => {
  const [depositModalIsOpen, set_depositModalIsOpen] =
    React.useState<boolean>(false);
  const $polkadotAccountsStore = useStore(polkadotAccountsStore);

  const data = $polkadotAccountsStore[account];

  const isNotZeroBalance = data ? toBigNumber(data.data.free).gt(0) : false;

  return (
    <>
      <DepositDialog
        account={account}
        isOpen={depositModalIsOpen}
        onClose={() => set_depositModalIsOpen(false)}
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
          onClick={() => set_depositModalIsOpen(true)}
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
        >
          Withdraw
        </Button>
      </div>
    </>
  );
};
