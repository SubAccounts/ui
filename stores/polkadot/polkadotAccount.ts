import { atom } from "nanostores";
import { KeyringPair } from "@polkadot/keyring/types";
import AES from "crypto-js/aes";
import { Keyring } from "@polkadot/keyring";
import CryptoJS from "crypto-js/core";

import { generateAccount } from "@/utils/polkadot/generateAccount";

type AccountStore = {
  account: KeyringPair | null;
  password: string;
  encodingPassword: string;
  stage: number;
  encryptedDataString: string;
  signedData: string;
};

const defaultValue: AccountStore = {
  account: null,
  password: "",
  encodingPassword: "",
  stage: 1,
  encryptedDataString: "",
  signedData: "",
};

export const accountStore = atom<AccountStore>(defaultValue);

export function generateNewAccount() {
  const account = generateAccount(4312);

  accountStore.set({ ...accountStore.get(), account });
}

export function setPassword(password: string) {
  accountStore.set({ ...accountStore.get(), password });
  setStage(3);
}

export function setEncodingPassword(encodingPassword: string) {
  accountStore.set({ ...accountStore.get(), encodingPassword });
  setStage(4);
}

function setEncryptedDataString(encryptedDataString: string) {
  accountStore.set({ ...accountStore.get(), encryptedDataString });
  setStage(5);
}

export function setSignedData(signedData: string) {
  accountStore.set({ ...accountStore.get(), signedData });
  setStage(6);
}

export function setStage(stage: number) {
  accountStore.set({ ...accountStore.get(), stage });
}

export function tryToRestoreAccount(
  encryptedData: string,
  accountPassword: string,
  encodingPassword: string,
): string {
  const decodedAccountString = AES.decrypt(
    encryptedData,
    encodingPassword,
  ).toString(CryptoJS.enc.Utf8);

  const keyring = new Keyring();
  const decodedAccount = keyring.addFromJson(JSON.parse(decodedAccountString));

  decodedAccount.decodePkcs8(accountPassword);

  return decodedAccount.address;
}

export function prepareData() {
  const { account, password, encodingPassword } = accountStore.get();
  const encodedAccount = account?.toJson(password);

  const doubleEncodedAccount = AES.encrypt(
    JSON.stringify(encodedAccount),
    encodingPassword,
  );

  const decodedAccountAddress = tryToRestoreAccount(
    doubleEncodedAccount.toString(),
    password,
    encodingPassword,
  );

  if (decodedAccountAddress === account?.address) {
    setEncryptedDataString(doubleEncodedAccount.toString());
  }
}

export function setAccountToStore(account: KeyringPair) {
  const data = accountStore.get();

  accountStore.set({
    ...data,
    account,
  });
}
