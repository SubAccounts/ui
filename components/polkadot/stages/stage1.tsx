"use client";

import React, { useEffect } from "react";
import { Snippet } from "@nextui-org/snippet";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { useStore } from "@nanostores/react";

import {
  accountStore,
  generateNewAccount,
  setStage,
} from "@/stores/polkadotAccount";
import { titleH2 } from "@/components/primitives";
import { getAccountAddressForNetwork } from "@/utils/polkadot/getAccountAddressForNetwork";
import { Chains } from "@/config/chains";

export const Stage1: React.FC = () => {
  const { account } = useStore(accountStore);

  function reGenerateAccount() {
    generateNewAccount();
  }

  useEffect(() => {
    generateNewAccount();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>Step 1. Generate account.</h2>
        </div>
      </div>
      <div
        className="
        flex flex-col w-full
        items-center justify-center gap-4
        overflow-hidden
        "
      >
        <Snippet fullWidth hideCopyButton hideSymbol variant="bordered">
          <span className="overflow-auto">
            Account:{" "}
            {account
              ? getAccountAddressForNetwork(account, Chains.Polkadot)
              : "Generating..."}
          </span>
        </Snippet>
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
          })}
          onClick={reGenerateAccount}
        >
          Re-generate
        </Button>
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "secondary",
          })}
          onClick={() => setStage(2)}
        >
          Next
        </Button>
      </div>
    </>
  );
};
