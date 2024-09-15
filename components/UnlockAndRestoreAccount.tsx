import React from "react";
import { KeyringPair } from "@polkadot/keyring/types";

import { useSubAccount } from "@/components/polkadot/account/WithCorrectOwner";
import { UnlockAccountButton } from "@/components/UnlockAccountButton";
import { buttonStyles } from "@/utils/ui/buttonStyles";

type UnlockAndRestoreAccountProps = {
  onUnlock: (account: KeyringPair) => void | Promise<void>;
  restoreButtonIsDisabled?: boolean;
};

export const UnlockAndRestoreAccount: React.FC<
  UnlockAndRestoreAccountProps
> = ({ onUnlock, restoreButtonIsDisabled }) => {
  const { restoredAccount, restoreAccount } = useSubAccount();

  return (
    <>
      {restoredAccount ? (
        <UnlockAccountButton onAccountUnlock={onUnlock} />
      ) : (
        <button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "primary",
            isDisabled: restoreButtonIsDisabled,
          })}
          disabled={restoreButtonIsDisabled}
          onClick={restoreAccount}
        >
          Restore account
        </button>
      )}
    </>
  );
};
