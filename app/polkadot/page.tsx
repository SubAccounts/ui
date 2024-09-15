"use client";
import React from "react";

import { title } from "@/components/primitives";
import { AccountsList } from "@/components/AccountsList";
import Center from "@/components/layout/Center";
import { Chains } from "@/config/chains";
import { WalletConnector } from "@/components/Web3/WalletConnector";

type Currency = {
  name: string;
  color: "green" | "blue";
};

const ETH: Currency = {
  name: "ETH",
  color: "green",
};

const USDC: Currency = {
  name: "USDC",
  color: "blue",
};

let interval: number = 0;

export default function PolkadotPage() {
  const [currency, set_currency] = React.useState<Currency>(USDC);

  React.useEffect(() => {
    interval = setInterval(() => {
      set_currency((e) => (e.name === USDC.name ? ETH : USDC));
    }, 10_000) as unknown as number;

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Center>
      <section className="flex flex-col h-full w-full items-start justify-center gap-4">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="inline-block w-full text-left justify-center">
            <h1 className={title()}>Stake your </h1>
            <h1 className={title({ color: currency.color })}>
              {currency.name}&nbsp;
            </h1>
            <h1 className={title()}>to </h1>
            <h1 className={title({ color: "pink" })}>POLKADOT</h1>
          </div>
        </div>
        <WalletConnector>
          <AccountsList network={Chains.Polkadot} />
        </WalletConnector>
      </section>
    </Center>
  );
}
