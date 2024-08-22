"use client";

import React from "react";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/navigation";

import {
  addEthereumTransaction,
  isSendingNow,
  setSendingStatus,
} from "@/stores/transactions";
import { accountStore } from "@/stores/polkadot/polkadotAccount";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { Chains } from "@/config/chains";

type SendTransactionButtonProps = {
  disabled: boolean;
};

export const SendTransactionButton: React.FC<SendTransactionButtonProps> = ({
  disabled,
}) => {
  const router = useRouter();
  const $isSendingNow = useStore(isSendingNow);
  const { account, signedData } = useStore(accountStore);
  const { wallet, contract } = useWeb3Onboard();

  async function sendTransaction() {
    if (contract && account && wallet) {
      setSendingStatus(true);
      const tx = await contract.storeEncryptedAccount(
        signedData,
        Chains.Polkadot,
        account.address,
      );

      const success = await addEthereumTransaction(
        tx,
        wallet.accounts[0].address,
        "Create wallet",
      );

      if (success) {
        router.push("/polkadot");
      }
    }
  }

  return (
    <Button
      className={buttonStyles({
        variant: "bordered",
        radius: "sm",
        color: "secondary",
        isDisabled: $isSendingNow || disabled,
      })}
      disabled={$isSendingNow || disabled}
      onClick={sendTransaction}
    >
      Send transaction
    </Button>
  );
};
