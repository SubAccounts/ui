"use client";
import React from "react";

import { title } from "@/components/primitives";
import { Stages } from "@/components/polkadot/stages/stages";
import Center from "@/components/layout/Center";
import Title from "@/components/layout/Title";
import { WalletConnector } from "@/components/Web3/WalletConnector";

export default function PolkadotPage() {
  return (
    <Center>
      <section className="flex flex-col h-full w-full items-start justify-center gap-4">
        <Title>
          <h1 className={title()}>Create new </h1>
          <h1 className={title({ color: "pink" })}>POLKADOT </h1>
          <h1 className={title()}>account</h1>
        </Title>
        <WalletConnector>
          <Stages />
        </WalletConnector>
      </section>
    </Center>
  );
}
