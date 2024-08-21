import { atom } from "nanostores";
import { ContractTransaction } from "ethers";

import { createSimplePersistentAtom } from "@/utils/helpers/createSimplePersistentAtom";

type Transaction = {
  signer: string;
  hash: string;
  status: "new" | "success" | "error";
};
export const transactionsStore = createSimplePersistentAtom<Transaction[]>(
  [],
  "transactions",
);

export const isSendingNow = atom<boolean>(false);

export function setSendingStatus(status: boolean) {
  isSendingNow.set(status);
}

export async function addEthereumTransaction(
  tx: ContractTransaction,
  signer: string,
): Promise<boolean> {
  isSendingNow.set(true);
  transactionsStore.set([
    ...transactionsStore.get(),
    {
      signer,
      hash: tx.hash,
      status: "new",
    },
  ]);

  let success = false;

  try {
    await tx.wait();
    success = true;
  } catch (e) {
    console.log(e);
  }
  isSendingNow.set(false);
  transactionsStore.set([
    ...[...transactionsStore.get()].map((e) => {
      if (e.hash === tx.hash) {
        e.status = success ? "success" : "error";
      }

      return e;
    }),
  ]);

  return success;
}
