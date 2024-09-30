import React, { useState } from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import { SubAccounts } from "sub-accounts-lib";
import { useStore } from "@nanostores/react";

import { PinCodeDialog } from "./PinCodeDialog";
import { PinCodeForm } from "./PinCodeForm";
import { PasswordsForm } from "./PasswordsForm";

import { useSubAccount } from "@/components/polkadot/account/WithCorrectOwner";
import { buttonStyles } from "@/utils/ui/buttonStyles";
import { Dialog } from "@/components/Dialog/Dialog";
import { useToggleHandler } from "@/hooks/useToggleHandler";
import { defaultPassword } from "@/config/site";
import {
  accountStore,
  setAccountToStore,
} from "@/stores/polkadot/polkadotAccount";
import {
  setPinCode,
  isPinCodeSetUp,
  restorePasswords,
} from "@/stores/pinCodeStore";

type SendButtonProps = {
  onAccountUnlock: (account: KeyringPair) => void | Promise<void>;
};

export const UnlockAccountButton: React.FC<SendButtonProps> = ({
  onAccountUnlock,
}) => {
  const { account } = useStore(accountStore);
  const isPinCodeExisted = isPinCodeSetUp();
  const [dialogIsOpen, toggle] = useToggleHandler();
  const { subAccount, restoredAccount } = useSubAccount();
  const [accountPassword, set_accountPassword] =
    React.useState<string>(defaultPassword);
  const [encryptionPassword, set_encryptionPassword] =
    React.useState<string>(defaultPassword);
  const [pinCode, set_PinCode] = useState<string>("");

  const [pinDialogIsOpen, togglePinDialog] = React.useState(false);

  function restore() {
    if (isPinCodeExisted) {
      const [password1, password2] = restorePasswords(pinCode);
      // TODO: complete logic
    } else {
      if (restoredAccount) {
        const account = SubAccounts.decrypt(
          restoredAccount,
          accountPassword,
          encryptionPassword,
        );

        setAccountToStore(account);
        toggle(false);
        togglePinDialog(true);
      }
    }
  }

  let buttonText = "Hmm...";
  let disabled = true;

  if (restoredAccount) {
    buttonText = "Unlock account";
    disabled = false;
  }

  const onPinCodeChangeHandler = (pinCode: string) => {
    setPinCode(pinCode, accountPassword, encryptionPassword);
    if (account) {
      onAccountUnlock(account);
    }
  };

  const onPinCodeDialogCloseHandler = () => {
    togglePinDialog(false);
    if (account) {
      onAccountUnlock(account);
    }
  };

  return (
    <>
      <PinCodeDialog
        isOpen={pinDialogIsOpen}
        onClose={onPinCodeDialogCloseHandler}
        onPinCodeChange={onPinCodeChangeHandler}
      />
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
          {isPinCodeExisted ? (
            <PinCodeForm onChange={(value) => set_PinCode(value)} />
          ) : (
            <PasswordsForm
              onAccountPasswordChange={(value) => set_accountPassword(value)}
              onEncryptionPasswordChange={(value) =>
                set_encryptionPassword(value)
              }
            />
          )}
        </div>
      </Dialog>
    </>
  );
};
