"use client";

import React from "react";
import { useStore } from "@nanostores/react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { titleH2 } from "@/components/primitives";
import {
  accountStore,
  setStage,
  tryToRestoreAccount,
} from "@/stores/polkadot/polkadotAccount";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { decryptMessage } from "@/utils/web3-onboard/services";
import { SendTransactionButton } from "@/components/polkadot/stages/SendTransactionButton";
import { TextBlock } from "@/components/layout/TextBlock";

export const Stage6: React.FC = () => {
  const { account, signedData } = useStore(accountStore);
  const { wallet } = useWeb3Onboard();
  const [decryptedSignature, set_decryptedSignature] =
    React.useState<string>("");
  const [encodingPassword, set_encodingPassword] = React.useState<string>("");
  const [accountPassword, set_accountPassword] = React.useState<string>("");
  const [restoredAccountAddress, set_restoredAccountAddress] =
    React.useState<string>("");

  async function onDecodeClick() {
    if (wallet) {
      const signedDataJson = JSON.parse(signedData);
      const decryptedMessage = await decryptMessage(wallet, signedDataJson);

      set_decryptedSignature(decryptedMessage);
    }
  }

  async function restoreAccount() {
    const restoredAccountAddress = tryToRestoreAccount(
      decryptedSignature,
      accountPassword,
      encodingPassword,
    );

    set_restoredAccountAddress(restoredAccountAddress);
  }

  const messages: [string, string, boolean?][] = [
    [signedData, "Signed message", false],
    [decryptedSignature, "Decrypted signature", false],
    [
      restoredAccountAddress,
      "Restored account address",
      restoredAccountAddress === account?.address,
    ],
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>
            Step 6. Check restoring and send transaction.
          </h2>
        </div>
      </div>

      <TextBlock
        lines={messages.map(([value, title, success]) =>
          value
            ? [
                title,
                <p
                  key={title}
                  className={clsx("break-all", { "text-green-600": success })}
                >
                  {value}
                </p>,
              ]
            : null,
        )}
      />

      {decryptedSignature && !restoredAccountAddress && (
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full items-start justify-start">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="password_"
            >
              Account password
            </label>
            <input
              required
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="password_"
              placeholder="•••••••••"
              type="password"
              value={accountPassword}
              onChange={(e) => set_accountPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full items-start justify-start">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="password_"
            >
              Encoding password
            </label>
            <input
              required
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="password_"
              placeholder="•••••••••"
              type="password"
              value={encodingPassword}
              onChange={(e) => set_encodingPassword(e.target.value)}
            />
          </div>
        </div>
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
          onClick={() => setStage(5)}
        >
          Back
        </Button>
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "warning",
          })}
          onClick={() => setStage(7)}
        >
          Skip checking
        </Button>
        {!restoredAccountAddress &&
          (decryptedSignature ? (
            <Button
              className={buttonStyles({
                variant: "bordered",
                radius: "sm",
                color: "primary",
              })}
              onClick={restoreAccount}
            >
              Restore account
            </Button>
          ) : (
            <Button
              className={buttonStyles({
                variant: "bordered",
                radius: "sm",
                color: "primary",
              })}
              onClick={onDecodeClick}
            >
              Decrypt message
            </Button>
          ))}
        <SendTransactionButton
          disabled={!(restoredAccountAddress === account?.address)}
        />
      </div>
    </>
  );
};
