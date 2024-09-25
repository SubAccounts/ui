import React from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import { Button } from "@nextui-org/react";

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

export const PoladotAccountDialogControls: React.FC<ControlsProps> = ({
  unlockedAccount,
  onClose,
  disabled,
  actionText,
  updateUnlockedAccount,
  onSend,
}) => {
  return (
    <div className="flex items-end gap-4">
      <Button color="default" variant="bordered" onClick={onClose}>
        Close
      </Button>
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
