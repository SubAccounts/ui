import { KeyringPair } from "@polkadot/keyring/types";
import { encodeAddress } from "@polkadot/keyring";

import { Chains } from "@/config/chains";

export function getAccountAddressForNetwork(
  account: KeyringPair | string,
  chain: Chains,
): string {
  let ss58Format = 42;

  if (chain === Chains.Polkadot) {
    ss58Format = 0;
  }

  return encodeAddress(
    typeof account === "string" ? account : account.publicKey,
    ss58Format,
  );
}
