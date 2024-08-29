import { atom } from "nanostores";
import { ContractTransaction } from "ethers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { KeyringPair } from "@polkadot/keyring/types";

import { createSimplePersistentAtom } from "@/utils/helpers/createSimplePersistentAtom";

export enum TransactionNetworks {
  Sepolia,
  Polkadot,
  Ethereum,
}

export const TransactionNetworkName: Record<TransactionNetworks, string> = {
  [TransactionNetworks.Sepolia]: "Sepolia",
  [TransactionNetworks.Polkadot]: "Polkadot",
  [TransactionNetworks.Ethereum]: "Ethereum",
};

export enum TransactionStatus {
  New,
  Success,
  Error,
  Broadcast,
  InBlock,
}

export const TransactionStatusName: Record<TransactionStatus, string> = {
  [TransactionStatus.New]: "New",
  [TransactionStatus.Success]: "Success",
  [TransactionStatus.Error]: "Error",
  [TransactionStatus.Broadcast]: "Broadcasting",
  [TransactionStatus.InBlock]: "In block",
};

type Transaction = {
  signer: string;
  hash: string;
  status: TransactionStatus;
  network: TransactionNetworks;
  name: string;
  date: number;
  owner: string;
};

export const transactionsStore = createSimplePersistentAtom<Transaction[]>(
  [],
  "transactions",
);

export const activeTransaction = atom<string | null>(null);

export const isSendingNow = atom<boolean>(false);

export function setSendingStatus(status: boolean) {
  isSendingNow.set(status);
}

function addTransaction({
  signer,
  hash,
  network,
  status = TransactionStatus.New,
  name,
  owner,
}: {
  signer: string;
  hash: string;
  network: TransactionNetworks;
  status?: TransactionStatus;
  name: string;
  owner: string;
}) {
  if (!transactionsStore.get().find((e) => e.hash === hash)) {
    activeTransaction.set(hash);
    transactionsStore.set([
      ...transactionsStore.get(),
      {
        signer,
        hash,
        status,
        network,
        name,
        date: Date.now(),
        owner,
      },
    ]);
  }
}

function updateTransactionStatus(hash: string, status: TransactionStatus) {
  if (activeTransaction.get() === hash) {
    if (
      status === TransactionStatus.Success ||
      status === TransactionStatus.Error
    ) {
      setTimeout(() => {
        activeTransaction.set(null);
      }, 3000);
    }
  }
  transactionsStore.set([
    ...[...transactionsStore.get()].map((e) => {
      if (e.hash === hash) {
        e.status = status;
      }

      return e;
    }),
  ]);
}

export async function addPolkadotTransaction(
  extrinsic: SubmittableExtrinsic,
  signer: KeyringPair,
  name: string,
  owner: string,
): Promise<boolean> {
  isSendingNow.set(true);

  let hash: string;

  return new Promise((resolve) => {
    console.log("Submitting");
    setSendingStatus(true);
    extrinsic.signAndSend(signer, (result) => {
      console.log("Status", result.status.type);
      if (result.status.isReady) {
        hash = result.txHash.toHuman() as string;
        addTransaction({
          signer: signer.address,
          hash,
          network: TransactionNetworks.Polkadot,
          name,
          owner,
        });
      }
      if (hash && result.status.isBroadcast) {
        updateTransactionStatus(hash, TransactionStatus.Broadcast);
      }
      if (hash && result.status.isInBlock) {
        updateTransactionStatus(hash, TransactionStatus.InBlock);
      }
      if (result.status.isFinalized || result.status.isRetracted) {
        if (hash) {
          updateTransactionStatus(hash, TransactionStatus.Success);
        } else {
          addTransaction({
            signer: signer.address,
            hash,
            network: TransactionNetworks.Sepolia,
            status: TransactionStatus.Success,
            name,
            owner,
          });
        }
        resolve(true);
        setSendingStatus(false);
      } else if (
        result.status.isInvalid ||
        result.status.isRetracted ||
        result.status.isDropped
      ) {
        if (hash) {
          updateTransactionStatus(hash, TransactionStatus.Error);
        } else {
          addTransaction({
            signer: signer.address,
            hash,
            network: TransactionNetworks.Sepolia,
            status: TransactionStatus.Error,
            name,
            owner,
          });
        }
        resolve(false);
        setSendingStatus(false);
      }
    });
  });
}

export async function addEthereumTransaction(
  txCreator: () => Promise<ContractTransaction>,
  signer: string,
  name: string,
): Promise<boolean> {
  isSendingNow.set(true);

  let success = false;
  let hash = `undefined_tx_${Math.random()}`;

  try {
    const tx = await txCreator();

    hash = tx.hash;

    addTransaction({
      signer,
      hash: tx.hash,
      network: TransactionNetworks.Sepolia,
      name,
      owner: signer,
    });

    await tx.wait();
    success = true;
  } catch (e) {
    console.log(e);
  }

  setSendingStatus(false);
  updateTransactionStatus(
    hash,
    success ? TransactionStatus.Success : TransactionStatus.Error,
  );

  return success;
}
