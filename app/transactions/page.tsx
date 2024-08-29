"use client";

import { title } from "@/components/primitives";
import { WalletConnector } from "@/components/Web3/WalletConnector";
import { TransactionsList } from "@/components/transactions/TransactionsList";

export default function WhitePaperPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className={title({ size: "lg" })}>Transactions</h1>
      <WalletConnector>
        <TransactionsList />
      </WalletConnector>
    </div>
  );
}
