import { atom } from "nanostores";
import { api } from "common-crypto-tools/polkadot";
import { Staking_Ledger_Json } from "common-crypto-tools/types/polkadot";

import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { withRequestTimeout } from "@/stores/helpers/withRequestTimeout";

export const polkadotLedgerStore = atom<Record<string, Staking_Ledger_Json>>(
  {},
);

export async function loadPolkadotLedger(account: string) {
  console.log("loadPolkadotLedger", account);
  await withRequestTimeout(`ledger_${account}`, async function () {
    console.log("asd");
    const apiPromise = await loadApiPromise();
    const accountData = await api.query.staking.ledger(apiPromise, account);

    console.log("asdddd", accountData, account);

    if (accountData) {
      polkadotLedgerStore.set({
        ...polkadotLedgerStore.get(),
        [account]: accountData,
      });

      console.log(accountData);

      return true;
    }

    return false;
  });
}
