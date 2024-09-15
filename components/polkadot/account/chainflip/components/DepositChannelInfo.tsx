import React from "react";
import { SwapStatusResponse } from "@chainflip/sdk/swap";
import { Link } from "@nextui-org/link";

import { init } from "@/components/polkadot/account/chainflip/chainFlip";

type DepositChannelInfoProps = {
  depositChannelId: string;
  onDone: () => void;
};

let interval: number;

export const DepositChannelInfo: React.FC<DepositChannelInfoProps> = ({
  depositChannelId,

  onDone,
}) => {
  const [swapStatus, set_swapStatus] =
    React.useState<SwapStatusResponse | null>(null);

  async function loadSwapStatus(id: string) {
    const swapSDK = init();
    const status = await swapSDK.getStatus({
      id,
    });

    if (status.state === "COMPLETE") {
      clearInterval(interval);

      setTimeout(() => {
        onDone();
      }, 1_000);
    }
    set_swapStatus(status);
  }

  React.useEffect(() => {
    clearInterval(interval);
    if (depositChannelId) {
      interval = setInterval(() => {
        loadSwapStatus(depositChannelId);
      }, 5_000) as unknown as number;
    } else {
      set_swapStatus(null);
    }
  }, [depositChannelId]);

  return (
    <>
      <p>
        Deposit channel created.{" "}
        <Link isExternal href={`/swaps/${depositChannelId}`}>
          {depositChannelId}
        </Link>{" "}
        {swapStatus ? `Status: ${swapStatus.state}.` : ""}{" "}
        <Link
          isExternal
          href={`https://scan.chainflip.io/channels/${depositChannelId}`}
        >
          ChainFlip explorer
        </Link>
        .
      </p>
      <p>Deposit or withdrawal takes some time. Please wait.</p>
    </>
  );
};
