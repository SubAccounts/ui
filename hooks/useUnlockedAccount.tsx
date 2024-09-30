import React from "react";
import { KeyringPair } from "@polkadot/keyring/types";

export function useUnlockedAccount(): {
  value: KeyringPair | null;
  set: (value: KeyringPair | null) => void;
} {
  const [unlockedAccount, set_unlockedAccount] =
    React.useState<KeyringPair | null>(null);

  return {
    value: unlockedAccount,
    set: set_unlockedAccount,
  };
}
