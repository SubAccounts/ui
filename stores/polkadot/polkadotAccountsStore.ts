import { atom } from "nanostores";
import { api } from "common-crypto-tools/polkadot";
import { System_Account_Json } from "common-crypto-tools/types/polkadot";
import { toBigNumber } from "common-crypto-tools/common/index";

import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { withRequestTimeout } from "@/stores/helpers/withRequestTimeout";

type System_Account_Json_Updated = Omit<System_Account_Json, "data"> & {
  data: System_Account_Json["data"] & {
    transferable: string;
  };
};

export const polkadotAccountsStore = atom<
  Record<string, System_Account_Json_Updated>
>({});

export async function loadPolkadotAccount(account: string) {
  await withRequestTimeout(`balance_${account}`, async function () {
    const apiPromise = await loadApiPromise();
    const accountData: System_Account_Json = await api.query.system.account(
      apiPromise,
      account,
    );

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
