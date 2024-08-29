"use client";

import React from "react";
import { useStore } from "@nanostores/react";
import { Link } from "@nextui-org/link";
import { abbreviateAddress } from "common-crypto-tools/common";

import {
  activeTransaction,
  transactionsStore,
  TransactionStatus,
} from "@/stores/transactions";
import { buttonStyles } from "@/utils/ui/buttonStyles";

type ActiveTransactionWidgetProps = {
  //
};

export const ActiveTransactionWidget: React.FC<
  ActiveTransactionWidgetProps
> = () => {
  const $activeTransaction = useStore(activeTransaction);
  const $transactionsStore = useStore(transactionsStore);

  const tx = $activeTransaction
    ? $transactionsStore.find((e) => e.hash === $activeTransaction)
    : null;

  let color: "default" | "primary" | "success" | "danger" = "default";

  if (tx) {
    switch (tx.status) {
      case TransactionStatus.Error:
        color = "danger";
        break;
      case TransactionStatus.Success:
        color = "success";
        break;

      default:
        color = "primary";
        break;
    }
  }

  return (
    <>
      {tx && (
        <div className="fixed bottom-4 left-4">
          <Link
            className={buttonStyles({
              variant: "bordered",
              color,
            })}
            href="/transactions"
          >
            {abbreviateAddress(tx.hash)}
          </Link>
        </div>
      )}
    </>
  );
};
