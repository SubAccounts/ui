import { atom } from "nanostores";
import { Nomination_Pools_Pool_Members_Json } from "polkadot-typed-api/types/api/query/nominationPools/poolMembers";
import { api } from "polkadot-typed-api";

import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { withRequestTimeout } from "@/stores/helpers/withRequestTimeout";

export const accountsNominationPoolStateStore = atom<
  Record<string, Nomination_Pools_Pool_Members_Json | null>
>({});

export async function loadAccountNominationPoolData(account: string) {
  withRequestTimeout(
    `accountsNominationPoolStateStore_${account}`,
    async function () {
      const apiPromise = await loadApiPromise();
      const pool = await api.query.nominationPools.poolMembers(
        apiPromise,
        account,
      );

      accountsNominationPoolStateStore.set({
        ...accountsNominationPoolStateStore.get(),
        [account]: pool,
      });

      return true;
    },
  );
}
