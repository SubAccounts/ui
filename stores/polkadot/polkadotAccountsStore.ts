import { atom } from "nanostores";
import { api, types } from "polkadot-typed-api";
import { toBigNumber } from "common-crypto-tools";

import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { withRequestTimeout } from "@/stores/helpers/withRequestTimeout";

type System_Account_Json_Updated = Omit<
  types.api.query.system.System_Account_Json,
  "data"
> & {
  data: types.api.query.system.System_Account_Json["data"] & {
    transferable: string;
  };
};

export const polkadotAccountsStore = atom<
  Record<string, System_Account_Json_Updated>
>({});

export async function loadPolkadotAccount(account: string) {
  await withRequestTimeout(`balance_${account}`, async function () {
    const apiPromise = await loadApiPromise();
    const accountData: types.api.query.system.System_Account_Json | null =
      await api.query.system.account(apiPromise, account);

    if (accountData) {
      const _accountData: System_Account_Json_Updated = {
        ...accountData,
        data: {
          ...accountData.data,
          transferable: toBigNumber(accountData.data.free)
            .sub(toBigNumber(accountData.data.frozen))
            .toString(),
        },
      };

      polkadotAccountsStore.set({
        ...polkadotAccountsStore.get(),
        [account]: _accountData,
      });

      return true;
    }

    return false;
  });
}
