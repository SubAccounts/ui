"use client";

import React from "react";

import { setPassword, setStage } from "@/stores/polkadot/polkadotAccount";
import { titleH2 } from "@/components/primitives";
import { PasswordEditor } from "@/components/polkadot/stages/passwordEditor";

export const Stage2: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>Step 2. Create account password.</h2>
        </div>
      </div>
      <PasswordEditor
        backButtonClick={() => setStage(1)}
        nextButtonClick={setPassword}
      />
    </>
  );
};
