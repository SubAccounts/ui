"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { useStore } from "@nanostores/react";

import { DepositDialog } from "@/components/polkadot/account/DepositDialog";
import { polkadotLedgerStore } from "@/stores/polkadot/polkadotLedgerStore";

type AccountControlButtonsProps = {
  account: string;
};

export const UnStakingInfoButton: React.FC<AccountControlButtonsProps> = ({
  account,
}) => {
  const [depositModalIsOpen, set_depositModalIsOpen] =
    React.useState<boolean>(false);
  const $polkadotLedgerStore = useStore(polkadotLedgerStore);

  const data = $polkadotLedgerStore[account];

  const isNotZeroBalance = data ? data.unlocking.length > 0 : false;

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
            isDisabled: !isNotZeroBalance,
          })}
          disabled={!isNotZeroBalance}
          onClick={() => set_depositModalIsOpen(true)}
        >
          Show info
        </Button>
      </div>
    </>
  );
};
