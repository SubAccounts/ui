import { atom } from "nanostores";
import { api } from "polkadot-typed-api";
import { toBigNumber } from "common-crypto-tools";

import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { withRequestTimeout } from "@/stores/helpers/withRequestTimeout";

export const accountsPendingRewardsStore = atom<Record<string, string | null>>(
  {},
);

export async function loadAccountsPendingRewards(account: string) {
  withRequestTimeout(
    `accountsPendingRewardsStore_${account}`,
    async function () {
      const apiPromise = await loadApiPromise();
      const pendingRewards = await api.call.nominationPoolsApi.pendingRewards(
        apiPromise,
        account,
      );

      accountsPendingRewardsStore.set({
        ...accountsPendingRewardsStore.get(),
        [account]: pendingRewards
          ? toBigNumber(pendingRewards).toString()
          : null,
      });

      return true;
    },
  );
}
