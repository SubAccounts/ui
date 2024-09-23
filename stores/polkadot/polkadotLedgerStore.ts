import type { Staking_Ledger_Json } from "polkadot-typed-api/types/api/query/staking/ledger";

import { atom } from "nanostores";
import { api } from "polkadot-typed-api";

import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
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
