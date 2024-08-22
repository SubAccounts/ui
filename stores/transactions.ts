import { atom } from "nanostores";
import { ContractTransaction } from "ethers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { KeyringPair } from "@polkadot/keyring/types";

import { createSimplePersistentAtom } from "@/utils/helpers/createSimplePersistentAtom";

enum Networks {
  Sepolia,
  Polkadot,
  Ethereum,
}

enum TransactionStatus {
  New,
  Success,
  Error,
}

type Transaction = {
  signer: string;
  hash: string;
  status: TransactionStatus;
  network: Networks;
  name: string;
};

export const transactionsStore = createSimplePersistentAtom<Transaction[]>(
  [],
  "transactions",
);

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
}: {
  signer: string;
  hash: string;
  network: Networks;
  status?: TransactionStatus;
  name: string;
}) {
  if (!transactionsStore.get().find((e) => e.hash === hash)) {
    transactionsStore.set([
      ...transactionsStore.get(),
      {
        signer,
        hash,
        status,
        network,
        name,
      },
    ]);
  }
}

function updateTransactionStatus(hash: string, status: TransactionStatus) {
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
): Promise<boolean> {
  isSendingNow.set(true);

  let hash: string;

  return new Promise((resolve) => {
    extrinsic.signAndSend(signer, (result) => {
      if (result.status.isReady) {
        hash = result.txHash.toHuman() as string;
        addTransaction({
          signer: signer.address,
          hash,
          network: Networks.Sepolia,
          name,
        });
      }
      if (result.status.isInBlock) {
        if (hash) {
          updateTransactionStatus(hash, TransactionStatus.Success);
        } else {
          addTransaction({
            signer: signer.address,
            hash,
            network: Networks.Sepolia,
            status: TransactionStatus.Success,
            name,
          });
          resolve(true);
        }
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
            network: Networks.Sepolia,
            status: TransactionStatus.Error,
            name,
          });
          resolve(false);
        }
      }
    });
  });
}

export async function addEthereumTransaction(
  tx: ContractTransaction,
  signer: string,
  name: string,
): Promise<boolean> {
  isSendingNow.set(true);

  addTransaction({ signer, hash: tx.hash, network: Networks.Sepolia, name });

  let success = false;

  try {
    await tx.wait();
    success = true;
  } catch (e) {
    console.log(e);
  }

  setSendingStatus(false);
  updateTransactionStatus(
    tx.hash,
    success ? TransactionStatus.Success : TransactionStatus.Error,
  );

  return success;
}
