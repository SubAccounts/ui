"use client";
import React from "react";

import { title } from "@/components/primitives";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { ConnectWallet } from "@/components/ConnectWallet";
import { AccountsList } from "@/components/AccountsList";
import { SwitchChain } from "@/components/SwitchChain";
import Center from "@/components/layout/Center";
import { Chains } from "@/config/chains";

export default function PolkadotPage() {
  const web3 = useWeb3Onboard();

  return (
    <Center>
      <section className="flex flex-col h-full w-full items-start justify-center gap-4">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="inline-block w-full text-left justify-center">
            <h1 className={title()}>Stake your </h1>
            <h1 className={title({ color: "green" })}>USDT&nbsp;</h1>
            <h1 className={title()}>to </h1>
            <h1 className={title({ color: "pink" })}>POLKADOT</h1>
          </div>
        </div>
        {web3.wallet ? (
          web3.isValidChain ? (
            <AccountsList network={Chains.Polkadot} />
          ) : (
            <SwitchChain />
          )
        ) : (
          <ConnectWallet />
        )}
      </section>
    </Center>
  );
}
