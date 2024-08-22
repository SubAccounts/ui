"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { useStore } from "@nanostores/react";

import { titleH2 } from "@/components/primitives";
import {
  accountStore,
  setSignedData,
  setStage,
} from "@/stores/polkadot/polkadotAccount";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { encryptMessage } from "@/utils/web3-onboard/services";
import { TextBlock } from "@/components/layout/TextBlock";

export const Stage5: React.FC = () => {
  const { wallet } = useWeb3Onboard();
  const { encryptedDataString } = useStore(accountStore);

  async function onSignClick() {
    if (wallet) {
      const encryptedMessage = await encryptMessage(
        wallet,
        encryptedDataString,
      );

      setSignedData(encryptedMessage);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>Step 5. Encrypt the message.</h2>
        </div>
      </div>

      <TextBlock>
        <p className="break-all">
          📝 Please provide your public encryption key. We will encrypt your new
          account data by this key. Nobody can restore it, only you.
        </p>
      </TextBlock>

      <div
        className="
        flex w-full
        items-center justify-start gap-4"
      >
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
          })}
          onClick={() => setStage(4)}
        >
          Back
        </Button>
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "secondary",
          })}
          onClick={onSignClick}
        >
          Encrypt
        </Button>
      </div>
    </>
  );
};
