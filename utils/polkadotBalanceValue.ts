import { BigNumberish } from "ethers";
import { toBigFloat } from "common-crypto-tools";

import { numberFormat } from "@/utils/numberFormat";
import { PolkadotChainConfig } from "@/config/polkadotChainConfig";

export function polkadotBalanceValue(value: BigNumberish, decimals = 8) {
  const balance = value
    ? toBigFloat(`${value}`).div(PolkadotChainConfig.decimals).toString()
    : null;

  return balance
    ? `${numberFormat(balance, {
        minimumFractionDigits: 10 - decimals,
        maximumFractionDigits: 10 - decimals,
      })} DOT`
    : "...";
}
