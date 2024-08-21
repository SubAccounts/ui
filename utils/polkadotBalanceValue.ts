import { BigNumberish } from "ethers";
import { toBigNumber } from "common-crypto-tools/common";

export function polkadotBalanceValue(value: BigNumberish) {
  const balance =
    typeof value !== "undefined"
      ? value
        ? toBigNumber(value)
            .div(10 ** 8)
            .toNumber() /
          10 ** 2
        : 0
      : "...";

  return `${balance} DOT`;
}
