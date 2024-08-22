"use client";

import React from "react";

import {
  setEncodingPassword,
  setStage,
} from "@/stores/polkadot/polkadotAccount";
import { titleH2 } from "@/components/primitives";
import { PasswordEditor } from "@/components/polkadot/stages/passwordEditor";

export const Stage3: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>Step 3. Create encoding password.</h2>
        </div>
      </div>
      <PasswordEditor
        backButtonClick={() => setStage(2)}
        nextButtonClick={setEncodingPassword}
      />
    </>
  );
};
