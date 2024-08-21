"use client";
import React from "react";

import { title } from "@/components/primitives";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { ConnectWallet } from "@/components/ConnectWallet";
import { Stages } from "@/components/polkadot/stages/stages";
import Center from "@/components/layout/Center";
import Title from "@/components/layout/Title";

export default function PolkadotPage() {
  const web3 = useWeb3Onboard();

  return (
    <Center>
      <section className="flex flex-col h-full w-full items-start justify-center gap-4">
        <Title>
          <h1 className={title()}>Create new </h1>
          <h1 className={title({ color: "pink" })}>POLKADOT </h1>
          <h1 className={title()}>account</h1>
        </Title>
        {web3.wallet ? (
          web3.isValidChain ? (
            <Stages />
          ) : (
            "invalid chain"
          )
        ) : (
          <ConnectWallet />
        )}
      </section>
    </Center>
  );
}
