import React from "react";

import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { getNetworkSubAccounts } from "@/utils/getNetworkSubAccounts";
import { loadPolkadotAccount } from "@/stores/polkadot/polkadotAccountsStore";

export function useSubAccountsBalanceLoad(network: string) {
  const web3 = useWeb3Onboard();

  const accounts = getNetworkSubAccounts(network, web3.encodedSubAccounts);

  React.useEffect(() => {
    accounts.forEach((account) => {
      void loadPolkadotAccount(account.networkAddress);
    });
  }, [accounts.map((e) => e.networkAddress).join("")]);

  return accounts;
}
