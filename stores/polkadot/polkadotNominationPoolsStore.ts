import { atom } from "nanostores";
import { Nomination_Pools_Bonded_Pools_Entries } from "polkadot-typed-api/types/api/query/nominationPools/bondedPools";
import { api } from "polkadot-typed-api";

import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { withRequestTimeout } from "@/stores/helpers/withRequestTimeout";

export const polkadotNominationPoolsStore =
  atom<Nomination_Pools_Bonded_Pools_Entries>([]);

export async function loadPools() {
  await withRequestTimeout(
    "Nomination_Pools_Bonded_Pools_Entries",
    async function () {
      try {
        const apiPromise = await loadApiPromise();
        const data =
          await api.query.nominationPools.bondedPools.entries(apiPromise);

        polkadotNominationPoolsStore.set(data);

        return true;
      } catch (e) {
        console.error(e);

        return false;
      }
    },
  );
}
