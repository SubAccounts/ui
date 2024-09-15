"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";

import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";

export const ConnectWalletButton: React.FC = () => {
  const web3 = useWeb3Onboard();

  return (
    <Button
      className={buttonStyles({
        variant: "bordered",
        radius: "sm",
        color: "secondary",
      })}
      onClick={web3.connect}
    >
      Connect wallet
    </Button>
  );
};
