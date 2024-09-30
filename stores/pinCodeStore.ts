import { atom } from "nanostores";
import AES from "crypto-js/aes";

// @ts-ignore
export type PinCodeType = ReturnType<AES.encrypt>;
export const pinCodeStore = atom<PinCodeType | string | null>(null);

export const SEPARATOR = [...Array(10)].map((e) => Math.random()).join("-");

export function setPinCode(
  value: string,
  password1: string,
  password2: string,
) {
  const hash = `${password1}${SEPARATOR}${password2}`;
  const encryptedHash: PinCodeType = AES.encrypt(hash, value);

  pinCodeStore.set(encryptedHash);
}

export function restorePasswords(pinCode: string) {
  const encryptedHash = pinCodeStore.get();

  return AES.decrypt(encryptedHash, pinCode)
    .toString(CryptoJS.enc.Utf8)
    .split(SEPARATOR);
}

export function resetPinCode() {
  pinCodeStore.set(null);
}

export function isPinCodeSetUp() {
  return pinCodeStore.get() !== null;
}