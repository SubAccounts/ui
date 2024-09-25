import { EncodedSubAccount } from "@/types";
import { Chains } from "@/config/chains";
import { getAccountAddressForNetwork } from "@/utils/polkadot/getAccountAddressForNetwork";

export type EncodedSubWalletWithNetworkAddress = EncodedSubAccount & {
  networkAddress: string;
};
export function getNetworkSubAccounts(
  network: string,
  accounts: EncodedSubAccount[],
): EncodedSubWalletWithNetworkAddress[] {
  return [...accounts]
    .filter((e) => e.network === network)
    .map((e) => {
      let networkAddress = e.address;

      if (network === Chains.Polkadot) {
        networkAddress = getAccountAddressForNetwork(
          e.address,
          Chains.Polkadot,
        );
      }

      return {
        ...e,
        networkAddress,
      };
    });
}
