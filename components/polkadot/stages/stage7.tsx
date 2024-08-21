"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";

import { titleH2 } from "@/components/primitives";
import { setStage } from "@/stores/polkadotAccount";
import { SendTransactionButton } from "@/components/polkadot/stages/SendTransactionButton";

export const Stage7: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>Step 7. Send transaction.</h2>
        </div>
      </div>

      <div
        className="
        flex flex-col items-center justify-center
        gap-4 w-full border-1 overflow-scroll
        rounded p-4 bg-gray-100 dark:bg-gray-900
        "
      >
        <div className="flex flex-col w-full text-left items-start">
          <p className="break-all">
            🤷‍♀ You have skipped the decryption checking.
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
          })}
          onClick={() => setStage(6)}
        >
          Check decryption
        </Button>

        <SendTransactionButton disabled={false} />
      </div>
    </>
  );
};
