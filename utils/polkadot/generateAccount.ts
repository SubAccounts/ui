import { Keyring } from "@polkadot/keyring";
import { generateMnemonic } from "@polkadot/util-crypto/mnemonic/bip39";

export function generateAccount(countOfGenerations: number = 0) {
  const keyring = new Keyring();

  let mnemonic = generateMnemonic(24);

  for (let i = 0; i < countOfGenerations; i++) {
    mnemonic = generateMnemonic(24);
  }

  return keyring.addFromMnemonic(mnemonic);
}
