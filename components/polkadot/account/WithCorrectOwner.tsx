"use client";

import React, { createContext, useContext } from "react";

import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { getAccountAddressForNetwork } from "@/utils/polkadot/getAccountAddressForNetwork";
import { Chains } from "@/config/chains";
import { EncodedSubAccount } from "@/types";
import { decryptMessage } from "@/utils/web3-onboard/services";

type WithCorrectOwnerProps = {
  children: React.ReactNode;
  subAccount: string;
  chain: Chains;
};

export interface IWithCorrectOwnerContext {
  account: EncodedSubAccount | null;
  subAccount: string;
  restoredAccount: string | null;
  restoreAccount: () => void | Promise<void>;
}

export const WithCorrectOwnerContext = createContext<IWithCorrectOwnerContext>({
  account: null,
  subAccount: "",
  restoredAccount: null,
  restoreAccount: () => {
    //
  },
});

export function useSubAccount(): IWithCorrectOwnerContext {
  return useContext<IWithCorrectOwnerContext>(WithCorrectOwnerContext);
}

export const WithCorrectOwner: React.FC<WithCorrectOwnerProps> = ({
  children,
  subAccount,
  chain,
}) => {
  const web3 = useWeb3Onboard();
  const [restoredAccount, set_restoredAccount] = React.useState<string | null>(
    null,
  );

  const account = web3.encodedSubAccounts.find(
    (e) => getAccountAddressForNetwork(e.address, chain) === subAccount,
  );

  async function restoreAccount() {
    if (web3 && web3.wallet && account) {
      const signedDataJson = JSON.parse(account.encodedData);
      const decryptedMessage = await decryptMessage(
        web3.wallet,
        signedDataJson,
      );

      set_restoredAccount(decryptedMessage);
    }
  }

  React.useEffect(() => {
    set_restoredAccount("");
  }, [account]);

  return (
    <>
      {account ? (
        <WithCorrectOwnerContext.Provider
          value={{ account, subAccount, restoredAccount, restoreAccount }}
        >
          {children}
        </WithCorrectOwnerContext.Provider>
      ) : (
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className="inline-block w-full text-left justify-center">
            <p>Hmmm! You have no access to {subAccount} SubAccount!</p>
          </div>
        </div>
      )}
    </>
  );
};
