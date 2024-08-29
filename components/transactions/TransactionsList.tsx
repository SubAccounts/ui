import React from "react";
import { useStore } from "@nanostores/react";
import { polkadotExplorerUrl } from "common-crypto-tools/polkadot";
import { Link } from "@nextui-org/link";
import { abbreviateAddress } from "common-crypto-tools/common";
import clsx from "clsx";

import { HeadCell } from "@/components/table/HeadCell";
import { BodyCell } from "@/components/table/BodyCell";
import {
  TransactionNetworkName,
  TransactionNetworks,
  transactionsStore,
  TransactionStatus,
  TransactionStatusName,
} from "@/stores/transactions";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { formatDate } from "@/utils/helpers/formatDate";

type TransactionsListProps = {
  //
};

const _polkadotExplorerUrl = polkadotExplorerUrl("polkadot");

function explorerUrl(
  address: string,
  type: "account" | "transaction",
  network: TransactionNetworks,
): string {
  if (network === TransactionNetworks.Polkadot) {
    return _polkadotExplorerUrl(type, address);
  }

  return `https://${network === TransactionNetworks.Sepolia ? "sepolia." : ""}etherscan.io/${type === "transaction" ? "tx" : type}/${address}`;
}

export const TransactionsList: React.FC<TransactionsListProps> = () => {
  const $transactionsStore = useStore(transactionsStore);
  const web3 = useWeb3Onboard();
  const transactions = [...$transactionsStore]
    .filter((e) =>
      web3.wallet ? e.owner === web3.wallet.accounts[0].address : false,
    )
    .reverse();

  return (
    <div className="w-full relative rounded-xl overflow-auto">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <HeadCell>Network</HeadCell>
            <HeadCell>Date</HeadCell>
            <HeadCell>Signer</HeadCell>
            <HeadCell>Status</HeadCell>
            <HeadCell>Hash</HeadCell>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? (
            transactions.map((e, index, arr) => (
              <tr key={e.hash}>
                <BodyCell isLast={index === arr.length - 1}>
                  {TransactionNetworkName[e.network]}
                </BodyCell>
                <BodyCell isLast={index === arr.length - 1}>
                  {formatDate(e.date)}
                </BodyCell>
                <BodyCell isLast={index === arr.length - 1}>
                  <Link
                    isExternal
                    href={explorerUrl(e.signer, "account", e.network)}
                  >
                    {abbreviateAddress(e.signer, 8)}
                  </Link>
                </BodyCell>
                <BodyCell isLast={index === arr.length - 1}>
                  <span
                    className={clsx("text-primary", {
                      "text-success": e.status === TransactionStatus.Success,
                      "text-error": e.status === TransactionStatus.Error,
                    })}
                  >
                    {TransactionStatusName[e.status]}
                  </span>
                </BodyCell>
                <BodyCell isLast={index === arr.length - 1}>
                  <Link
                    isExternal
                    href={explorerUrl(e.hash, "transaction", e.network)}
                  >
                    {abbreviateAddress(e.hash, 8)}
                  </Link>
                </BodyCell>
              </tr>
            ))
          ) : (
            <tr>
              <BodyCell isLast colSpan={5}>
                There are no transactions
              </BodyCell>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
