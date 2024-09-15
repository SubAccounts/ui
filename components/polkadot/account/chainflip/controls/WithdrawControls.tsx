import React from "react";
import { KeyringPair } from "@polkadot/keyring/types";

import { buttonStyles } from "@/utils/ui/buttonStyles";
import { UnlockAndRestoreAccount } from "@/components/UnlockAndRestoreAccount";

type ControlsProps = {
  unlockedAccount: KeyringPair | null;
  updateUnlockedAccount: (account: KeyringPair | null) => void;
  onClose: () => void;
  disabled: boolean;
  actionText: string;
  onSend: () => void | Promise<void>;
};

export const WithdrawControls: React.FC<ControlsProps> = ({
  unlockedAccount,
  onClose,
  disabled,
  actionText,
  updateUnlockedAccount,
  onSend,
}) => {
  return (
    <div className="flex items-end gap-4">
      <button
        className={buttonStyles({
          variant: "bordered",
          radius: "sm",
        })}
        onClick={onClose}
      >
        Close
      </button>
      {unlockedAccount ? (
        <button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "secondary",
            isDisabled: disabled,
          })}
          disabled={disabled}
          onClick={onSend}
        >
          {actionText}
        </button>
      ) : (
        <UnlockAndRestoreAccount onUnlock={updateUnlockedAccount} />
      )}
    </div>
  );
};
