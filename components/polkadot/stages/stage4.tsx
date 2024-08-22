"use client";

import React from "react";
import { useStore } from "@nanostores/react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";

import { titleH2 } from "@/components/primitives";
import {
  accountStore,
  prepareData,
  setStage,
} from "@/stores/polkadot/polkadotAccount";
import { getAccountAddressForNetwork } from "@/utils/polkadot/getAccountAddressForNetwork";
import { Chains } from "@/config/chains";
import { TextBlock } from "@/components/layout/TextBlock";

export const Stage4: React.FC = () => {
  const { account, password, encodingPassword } = useStore(accountStore);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>Step 4. Verify your data.</h2>
        </div>
      </div>
      {account && (
        <TextBlock
          lines={[
            ["Substrate account address:", account.address],
            [
              "Account address for Polkadot:",
              getAccountAddressForNetwork(account, Chains.Polkadot),
            ],
            [
              "Account address for Kusama:",
              getAccountAddressForNetwork(account, Chains.Kusama),
            ],
            ["Password:", password],
            ["Encoding password:", encodingPassword],
          ]}
        />
      )}
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
          onClick={() => setStage(3)}
        >
          Back
        </Button>
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "secondary",
          })}
          onClick={prepareData}
        >
          Next
        </Button>
      </div>
    </>
  );
};
