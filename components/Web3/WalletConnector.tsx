import React from "react";

import { ConnectWallet } from "@/components/Web3/ConnectWallet";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";

type WalletConnectorProps = {
  children: React.ReactNode;
};

export const WalletConnector: React.FC<WalletConnectorProps> = ({
  children,
}) => {
  const web3 = useWeb3Onboard();

  return (
    <>
      {web3.wallet ? (
        web3.isValidChain ? (
          children
        ) : (
          "invalid chain"
        )
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};
