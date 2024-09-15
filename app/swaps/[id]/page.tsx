"use client";
import {
  SwapSDK,
  ChainflipNetwork,
  SwapStatusResponse,
} from "@chainflip/sdk/swap";
import React from "react";

import { subtitle, title } from "@/components/primitives";
import { useToggleHandler } from "@/hooks/useToggleHandler";

const network: ChainflipNetwork = "mainnet";
const options = {
  network, // Testnet
};

const swapSDK = new SwapSDK(options);
let interval: number;

export default function SwapPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [status, set_status] = React.useState<SwapStatusResponse | null>(null);
  const [loading, toggleLoading] = useToggleHandler(false);

  async function load(id: string) {
    const status = await swapSDK.getStatus({
      id,
    });

    if (status.state === "COMPLETE") {
      clearInterval(interval);
    }
    set_status(status);
    toggleLoading(false)();
    console.log(status);
  }

  React.useEffect(() => {
    toggleLoading(true)();
    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      load(id);
    }, 5_000) as unknown as number;
  }, [id]);

  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className={title({ size: "lg" })}>Swap: {id}</h1>
      {loading && <h2 className={subtitle()}>Loading...</h2>}
      {status && (
        <>
          <p>State: {status.state}</p>
          <p>Destination address: {status.destAddress}</p>
          <p>Destination asset: {status.destAsset}</p>
          <p>Destination chain: {status.destChain}</p>
        </>
      )}
    </div>
  );
}
