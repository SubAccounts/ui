"use client";

import React from "react";

import { titleH2 } from "@/components/primitives";
import { ConnectWalletButton } from "@/components/Web3/ConnectWalletButton";

export const ConnectWallet: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>Connect your wallet.</h2>
        </div>
        <div className="inline-block w-full text-left justify-center">
          <p>To see the list of your sub-wallets or create the new one.</p>
        </div>
      </div>

      <div
        className="
        flex w-full
        items-center justify-start gap-4"
      >
        <ConnectWalletButton />
      </div>
    </>
  );
};
