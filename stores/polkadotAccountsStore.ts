import { atom } from "nanostores";
import { api } from "common-crypto-tools/polkadot";
import { System_Account_Json } from "common-crypto-tools/types/polkadot";

import { loadApiPromise } from "@/stores/polkadotApiPromise";
import { withRequestTimeout } from "@/stores/helpers/withRequestTimeout";

export const polkadotAccountsStore = atom<Record<string, System_Account_Json>>(
  {},
);

export async function loadPolkadotAccount(account: string) {
  await withRequestTimeout(`balance_${account}`, async function () {
    const apiPromise = await loadApiPromise();
    const accountData = await api.query.system.account(apiPromise, account);

    if (accountData) {
      polkadotAccountsStore.set({
        ...polkadotAccountsStore.get(),
        [account]: accountData,
      });

      return true;
    }

    return false;
  });
}
