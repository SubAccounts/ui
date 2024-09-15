import { ethers } from "ethers";
import { toBigFloat } from "common-crypto-tools/common";

export function humanToArbitrumUsdc(amount: string | number): ethers.BigNumber {
  return ethers.utils.parseUnits(`${amount}`, 6);
}

export function arbitrumUsdcToHuman(amount: string | number): string {
  return toBigFloat(amount)
    .div(10 ** 6)
    .toString();
}
