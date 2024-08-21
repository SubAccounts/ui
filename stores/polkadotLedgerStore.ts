import { atom } from "nanostores";
import { api } from "common-crypto-tools/polkadot";
import { Staking_Ledger_Json } from "common-crypto-tools/types/polkadot";

import { loadApiPromise } from "@/stores/polkadotApiPromise";
import { withRequestTimeout } from "@/stores/helpers/withRequestTimeout";

export const polkadotLedgerStore = atom<Record<string, Staking_Ledger_Json>>(
  {},
);

export async function loadPolkadotLedger(account: string) {
  await withRequestTimeout(`ledger_${account}`, async function () {
    const apiPromise = await loadApiPromise();
    const accountData = await api.query.staking.ledger(apiPromise, account);

    if (accountData) {
      polkadotLedgerStore.set({
        ...polkadotLedgerStore.get(),
        [account]: accountData,
      });

      return true;
    }

    return false;
  });
}
