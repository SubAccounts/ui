"use client";

import React, { useEffect } from "react";

import { titleH2, titleH3 } from "@/components/primitives";
import { PolkadotAccountBalance } from "@/components/PolkadotAccountBalance";
import { loadPolkadotLedger } from "@/stores/polkadot/polkadotLedgerStore";
import { PolkadotLedgerBalance } from "@/components/PolkadotLedgerBalance";
import { AccountControlButtons } from "@/components/polkadot/account/AccountControlButtons";
import { BondUnBondButtons } from "@/components/polkadot/account/BondUnBondButtons";
import { UnStakingInfoButton } from "@/components/polkadot/account/UnStakingInfoButton";

type AccountInfoProps = {
  account: string;
};

const blockClassName =
  "w-full flex-col flex h-full p-4 gap-4 " +
  "bg-blue-50 dark:bg-gray-950 " +
  "rounded border-1 border-blue-900 dark:border-gray-700";

const titleClassName = titleH3({ fullWidth: true });

export const SubAccountInfo: React.FC<AccountInfoProps> = ({ account }) => {
  useEffect(() => {
    if (account.length) {
      void loadPolkadotLedger(account);
    }
  }, [account]);

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className={titleH2()}>Balances</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <div className={blockClassName}>
          <h3 className={titleClassName}>Transferable</h3>
          <p>
            <PolkadotAccountBalance account={account} />
          </p>
          <AccountControlButtons account={account} />
        </div>
        <div className={blockClassName}>
          <h3 className={titleClassName}>Staking</h3>
          <p>
            <PolkadotLedgerBalance account={account} param="staking" />
          </p>
          <BondUnBondButtons account={account} />
        </div>
        <div className={blockClassName}>
          <h3 className={titleClassName}>Unstaking</h3>
          <p>
            <PolkadotLedgerBalance account={account} param="unstaking" />
          </p>
          <UnStakingInfoButton account={account} />
        </div>
      </div>
    </div>
  );
};
