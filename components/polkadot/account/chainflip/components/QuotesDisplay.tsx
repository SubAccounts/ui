import React from "react";
import { QuoteResponse } from "@chainflip/sdk/swap";
import { toBigFloat } from "common-crypto-tools";

import { titleH3 } from "@/components/primitives";
import {
  fetchQuotes,
  init,
  prepareRequestData,
} from "@/components/polkadot/account/chainflip/chainFlip";
import { Assets } from "@/components/polkadot/account/chainflip/assets";
import { arbitrumUsdcToHuman } from "@/utils/arbitrumUsdcToHuman";
import { useToggleHandler } from "@/hooks/useToggleHandler";

function printFee(fee: string, asset: string): string {
  if (asset === "DOT") {
    return toBigFloat(fee)
      .div(10 ** 10)
      .toFixed(6);
  } else if (asset === "USDC") {
    return arbitrumUsdcToHuman(fee);
  }

  return toBigFloat(fee)
    .div(10 ** 18)
    .toFixed(6);
}

const swapSDK = init();

type QuotesDisplayProps = {
  action: string;
  asset: Assets;
  value: string;
  onHasQuotesChange: (value: boolean) => void;
};

export const QuotesDisplay: React.FC<QuotesDisplayProps> = ({
  action,
  asset,
  value,
  onHasQuotesChange,
}) => {
  const [quotes, set_quotes] = React.useState<QuoteResponse | null>(null);
  const [loading, toggleLoading] = useToggleHandler(false);
  const [error, set_error] = React.useState<string>("");

  async function load(action: string, asset: Assets, value: string) {
    const { srcChain, destChain, srcAsset, destAsset, amount } =
      prepareRequestData(asset, value, action);

    toggleLoading(true)();
    try {
      await fetchQuotes(swapSDK, {
        amount,
        onChange: set_quotes,
        srcChain,
        destChain,
        srcAsset,
        destAsset,
      });
      onHasQuotesChange(true);
    } catch (e) {
      const error = e as unknown as Error;

      set_error(error.message);
      onHasQuotesChange(false);
    } finally {
      toggleLoading(false)();
    }
  }

  React.useEffect(() => {
    set_error("");
    if (+value > 0) {
      void load(action, asset, value);
    } else {
      set_quotes(null);
    }
  }, [value]);

  React.useEffect(() => {
    set_quotes(null);
  }, [asset]);

  return (
    <>
      {quotes ? (
        <div className="flex flex-col w-full items-start justify-start gap-1 p-4 border-2 border-success rounded-xl bg-gray-100 dark:bg-gray-800">
          <h3 className={titleH3({ size: "sm" })}>Quotes</h3>

          <p>
            Egress amount:{" "}
            {printFee(quotes.quote.egressAmount, quotes.destAsset)}{" "}
            {quotes.destAsset}
          </p>
          <p>
            Price: 1 {quotes.srcAsset} ={" "}
            {(+quotes.quote.estimatedPrice).toFixed(6)} {quotes.destAsset}
          </p>
          <p>
            Estimated Duration:{" "}
            {(+quotes.quote.estimatedDurationSeconds).toFixed(2)} sec.
          </p>
          <h3 className={titleH3({ size: "sm" })}>Fees</h3>
          {quotes.quote.includedFees.map((fee) => (
            <p key={fee.type}>
              {fee.type} {printFee(fee.amount, fee.asset)} {fee.asset} on chain{" "}
              {fee.chain}
            </p>
          ))}
        </div>
      ) : loading ? (
        <p>Loading quotes...</p>
      ) : error ? (
        <div className="flex flex-col w-full items-start justify-start gap-1 p-4 border-1 border-warning">
          <p>Error. {error}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
