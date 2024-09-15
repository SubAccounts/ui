import React from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import { SubAccounts } from "sub-accounts-lib";

import { useSubAccount } from "@/components/polkadot/account/WithCorrectOwner";
import { buttonStyles } from "@/utils/ui/buttonStyles";
import { Dialog } from "@/components/Dialog/Dialog";
import { useToggleHandler } from "@/hooks/useToggleHandler";
import { defaultPassword } from "@/config/site";

type SendButtonProps = {
  onAccountUnlock: (account: KeyringPair) => void | Promise<void>;
};

export const UnlockAccountButton: React.FC<SendButtonProps> = ({
  onAccountUnlock,
}) => {
  const [dialogIsOpen, toggle] = useToggleHandler();
  const { subAccount, restoredAccount } = useSubAccount();
  const [accountPassword, set_accountPassword] =
    React.useState<string>(defaultPassword);
  const [encryptionPassword, set_encryptionPassword] =
    React.useState<string>(defaultPassword);

  function restore() {
    if (restoredAccount) {
      const account = SubAccounts.decrypt(
        restoredAccount,
        accountPassword,
        encryptionPassword,
      );

      onAccountUnlock(account);
    }
  }

  let buttonText = "Hmm...";
  let disabled = true;

  if (restoredAccount) {
    buttonText = "Unlock account";
    disabled = false;
  }

  return (
    <>
      <button
        className={buttonStyles({
          isDisabled: disabled,
          color: "secondary",
          variant: "bordered",
          radius: "sm",
        })}
        disabled={disabled}
        onClick={toggle(true)}
      >
        {buttonText}
      </button>
      <Dialog
        footer={
          <div className="flex items-end gap-4">
            <button
              className={buttonStyles({
                variant: "bordered",
                radius: "sm",
              })}
              onClick={toggle(false)}
            >
              Close
            </button>
            <button
              className={buttonStyles({
                variant: "bordered",
                radius: "sm",
                color: "primary",
              })}
              onClick={restore}
            >
              Unlock
            </button>
          </div>
        }
        header={`Restore ${subAccount} account`}
        isOpen={dialogIsOpen}
        onClose={toggle(false)}
      >
        <div className="flex w-full flex-col gap-4">
          <p>
            Restore account via Account{"'"}s and Encryption{"'"}s passwords
          </p>
          <div className="flex flex-col w-full items-start justify-start">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="account_password"
            >
              Account password
            </label>
            <input
              required
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="account_password"
              placeholder="......."
              type="password"
              value={accountPassword}
              onChange={(e) => set_accountPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full items-start justify-start">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="encryption_password"
            >
              Encryption password
            </label>
            <input
              required
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="encryption_password"
              placeholder="......."
              type="password"
              value={encryptionPassword}
              onChange={(e) => set_encryptionPassword(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
