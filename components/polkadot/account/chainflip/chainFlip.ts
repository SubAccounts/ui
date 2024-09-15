import {
  Asset,
  Assets as _Assets,
  Chain,
  ChainflipNetwork,
  Chains,
  QuoteResponse,
  SwapSDK,
  DepositAddressResponse,
} from "@chainflip/sdk/swap";
import { toBigFloat } from "common-crypto-tools/common";
import { ethers } from "ethers";

import { Assets } from "@/components/polkadot/account/chainflip/assets";
import { PolkadotChainConfig } from "@/config/polkadotChainConfig";

export function init(signer?: ethers.providers.JsonRpcSigner) {
  const network: ChainflipNetwork = "mainnet";
  const options = {
    network,
    signer,
  };

  // @ts-ignore
  return new SwapSDK(options);
}

const AssetsMapper: Record<Assets, Asset> = {
  [Assets.DOT]: _Assets.DOT,
  [Assets.ETH]: _Assets.ETH,
  [Assets.USDC]: _Assets.USDC,
};

export function prepareRequestData(
  asset: Assets,
  value: string,
  action: string,
): {
  srcChain: Chain;
  destChain: Chain;
  srcAsset: Asset;
  destAsset: Asset;
  amount: string;
} {
  const srcChain = action === "withdraw" ? Chains.Polkadot : Chains.Arbitrum;
  const destChain = action === "withdraw" ? Chains.Arbitrum : Chains.Polkadot;
  const srcAsset = action === "withdraw" ? _Assets.DOT : AssetsMapper[asset];
  const destAsset = action === "withdraw" ? AssetsMapper[asset] : _Assets.DOT;

  let multiplier = 10 ** 18;

  if (action === "withdraw") {
    multiplier = PolkadotChainConfig.decimals;
  } else {
    if (asset === Assets.USDC) {
      multiplier = 10 ** 6;
    }
  }
  const amount = toBigFloat(value).multipliedBy(multiplier).toString();

  return {
    srcChain,
    destChain,
    srcAsset,
    destAsset,
    amount,
  };
}

export async function fetchQuotes(
  swapSDK: SwapSDK,
  {
    amount,
    onChange,
    srcChain,
    destChain,
    srcAsset,
    destAsset,
  }: {
    amount: string;
    onChange: (value: null | QuoteResponse) => void;
    srcChain: Chain;
    destChain: Chain;
    srcAsset: Asset;
    destAsset: Asset;
  },
) {
  if (+amount <= 0) {
    return;
  }

  onChange(null);

  const quoteRequest = {
    srcChain,
    destChain,
    srcAsset,
    destAsset,
    amount,
    brokerCommissionBps: 100,
    affiliateBrokers: [],
  };

  try {
    const quotes = await swapSDK.getQuote(quoteRequest);

    onChange(quotes);
  } catch (e: any) {
    if (e?.response?.data?.message) {
      throw new Error(e.response.data.message);
    } else {
      throw e;
    }
  }
}

export async function requestDepositChannel(
  swapSDK: SwapSDK,
  {
    amount,
    srcChain,
    destChain,
    srcAsset,
    destAsset,
    destAddress,
  }: {
    destAddress: string;
    amount: string;
    srcChain: Chain;
    destChain: Chain;
    srcAsset: Asset;
    destAsset: Asset;
  },
): Promise<DepositAddressResponse> {
  try {
    return await swapSDK.requestDepositAddress({
      srcChain,
      destChain,
      srcAsset,
      destAsset,
      amount,
      destAddress,
    });
  } catch (e: any) {
    if (e?.response?.data?.message) {
      throw new Error(e.response.data.message);
    } else {
      throw e;
    }
  }
}
