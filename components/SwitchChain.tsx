"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";

import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { titleH2 } from "@/components/primitives";
import { DEFAULT_CHAIN, Networks } from "@/utils/web3-onboard/networks";

type SwitchChainProps = {
  //
};

export const SwitchChain: React.FC<SwitchChainProps> = () => {
  const web3 = useWeb3Onboard();

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>Connect your wallet.</h2>
        </div>
        <div className="inline-block w-full text-left justify-center">
          <p className="text-warning">
            Please switch the chain to {Networks[DEFAULT_CHAIN]} to let us read
            Smart Contract.
          </p>
        </div>
      </div>

      <div
        className="
        flex w-full
        items-center justify-start gap-4"
      >
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "secondary",
          })}
          onClick={() => web3.switchChain(DEFAULT_CHAIN)}
        >
          Switch to {Networks[DEFAULT_CHAIN]}
        </Button>
      </div>
    </>
  );
};
