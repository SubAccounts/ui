"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { useStore } from "@nanostores/react";
import { toBigNumber } from "common-crypto-tools/common/index";

import { polkadotLedgerStore } from "@/stores/polkadot/polkadotLedgerStore";
import { BondDialog } from "@/components/polkadot/account/BondDialog";
import { useToggleHandler } from "@/hooks/useToggleHandler";

type BondUnbonduittonsProps = {
  account: string;
  //
};

export const BondUnBondButtons: React.FC<BondUnbonduittonsProps> = ({
  account,
}) => {
  const $polkadotLedgerStore = useStore(polkadotLedgerStore);
  const [bondDialogIsOpen, toggle_bondDialogIsOpen] = useToggleHandler();

  const data = $polkadotLedgerStore[account];

  const isNotZeroBalance = data ? toBigNumber(data.active).gt(0) : false;

  return (
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
        onClick={toggle_bondDialogIsOpen(true)}
      >
        Bond
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
        UnBond
      </Button>
      <BondDialog
        isOpen={bondDialogIsOpen}
        onClose={toggle_bondDialogIsOpen(false)}
      />
    </div>
  );
};
