"use client";

import React from "react";

import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { Chains } from "@/config/chains";
import { getAccountAddressForNetwork } from "@/utils/polkadot/getAccountAddressForNetwork";

type WithCorrectOwnerProps = {
  children: React.ReactNode;
  subAccount: string;
  chain: Chains;
};

export const WithCorrectOwner: React.FC<WithCorrectOwnerProps> = ({
  children,
  subAccount,
  chain,
}) => {
  const web3 = useWeb3Onboard();

  const account = web3.encodedSubWallets.find(
    (e) => getAccountAddressForNetwork(e.address, chain) === subAccount,
  );

  return (
    <>
      {account ? (
        children
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
