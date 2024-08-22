"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { useStore } from "@nanostores/react";
import { toBigNumber } from "common-crypto-tools/common/index";

import { polkadotLedgerStore } from "@/stores/polkadot/polkadotLedgerStore";

type BondUnbonduittonsProps = {
  account: string;
  //
};

export const BondUnBondButtons: React.FC<BondUnbonduittonsProps> = ({
  account,
}) => {
  const $polkadotLedgerStore = useStore(polkadotLedgerStore);

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
    </div>
  );
};
