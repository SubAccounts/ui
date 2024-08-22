"use client";

import React from "react";
import { useStore } from "@nanostores/react";

import { polkadotAccountsStore } from "@/stores/polkadot/polkadotAccountsStore";
import { polkadotBalanceValue } from "@/utils/polkadotBalanceValue";

type PolkadotAccountBalanceProps = {
  account: string;
  param?: "free" | "reserved" | "frozen";
};

export const PolkadotAccountBalance: React.FC<PolkadotAccountBalanceProps> = ({
  account,
  param = "free",
}) => {
  const $polkadotAccountsStore = useStore(polkadotAccountsStore);

  const data = $polkadotAccountsStore[account];

  if (!data) {
    return <>...</>;
  }

  return <>{polkadotBalanceValue(data.data[param])}</>;
};
