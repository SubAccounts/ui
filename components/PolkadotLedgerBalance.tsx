"use client";

import React from "react";
import { useStore } from "@nanostores/react";
import { BigNumber } from "ethers";
import { toBigNumber } from "common-crypto-tools/common";

import { polkadotBalanceValue } from "@/utils/polkadotBalanceValue";
import { polkadotLedgerStore } from "@/stores/polkadotLedgerStore";

type PolkadotAccountBalanceProps = {
  account: string;
  param?: "staking" | "unstaking" | "total";
};

export const PolkadotLedgerBalance: React.FC<PolkadotAccountBalanceProps> = ({
  account,
  param,
}) => {
  const $polkadotLedgerStore = useStore(polkadotLedgerStore);

  const data = $polkadotLedgerStore[account];

  let balance: BigNumber = toBigNumber(0);

  if (data) {
    if (param === "total") {
      balance = toBigNumber(data.total);
    } else if (param === "staking") {
      balance = toBigNumber(data.active);
    } else if (param === "unstaking") {
      data.unlocking.forEach((element) => {
        balance = balance.add(toBigNumber(element.value));
      });
    }
  }

  return <>{polkadotBalanceValue(balance)}</>;
};
