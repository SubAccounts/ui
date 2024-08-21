"use client";

import React from "react";
import { useStore } from "@nanostores/react";

import { accountStore } from "@/stores/polkadotAccount";
import { Stage1 } from "@/components/polkadot/stages/stage1";
import { Stage2 } from "@/components/polkadot/stages/stage2";
import { Stage3 } from "@/components/polkadot/stages/stage3";
import { Stage4 } from "@/components/polkadot/stages/stage4";
import { Stage5 } from "@/components/polkadot/stages/stage5";
import { Stage6 } from "@/components/polkadot/stages/stage6";
import { Stage7 } from "@/components/polkadot/stages/stage7";

export const Stages: React.FC = () => {
  const { stage } = useStore(accountStore);

  return (
    <>
      {stage === 1 && <Stage1 />}
      {stage === 2 && <Stage2 />}
      {stage === 3 && <Stage3 />}
      {stage === 4 && <Stage4 />}
      {stage === 5 && <Stage5 />}
      {stage === 6 && <Stage6 />}
      {stage === 7 && <Stage7 />}
    </>
  );
};
