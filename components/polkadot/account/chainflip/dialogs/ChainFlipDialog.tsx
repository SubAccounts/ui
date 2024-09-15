import React from "react";
import { DepositAddressResponse } from "@chainflip/sdk/swap";

import { AssetSelector } from "@/components/polkadot/account/chainflip/components/AssetSelector";
import { Assets } from "@/components/polkadot/account/chainflip/assets";
import { Toggler } from "@/hooks/useToggleHandler";
import { AmountInput } from "@/components/polkadot/account/chainflip/components/AmountInput";
import { QuotesDisplay } from "@/components/polkadot/account/chainflip/components/QuotesDisplay";
import { Dialog, DialogBaseProps } from "@/components/Dialog/Dialog";
import { DepositChannelInfo } from "@/components/polkadot/account/chainflip/components/DepositChannelInfo";

type ChainFlipDialogProps = DialogBaseProps & {
  account: string;
  asset: Assets;
  onAssetChange: (value: Assets) => void;
  status: string;
  action: "withdraw" | "deposit";
  subAccountAddress: string;
  title: string;
  amount: string;
  onAmountChange: (value: string) => void;
  controls: React.ReactNode;
  hasQuotes: boolean;
  onHasQuotesChange: (value: boolean) => void;
  loading: boolean;
  toggleLoading: Toggler;
  depositChannel: DepositAddressResponse | null;
  onDepositChannelChange: (value: DepositAddressResponse | null) => void;
};

export const ChainFlipDialog: React.FC<ChainFlipDialogProps> = ({
  account,
  depositChannel,
  onDepositChannelChange,
  status,
  action,
  onClose,
  isOpen,
  title,
  amount,
  onAmountChange,
  controls,
  onHasQuotesChange,
  loading,
  toggleLoading,
  onAssetChange,
  asset,
}) => {
  function onCloseHandler() {
    onAmountChange("");
    onAssetChange(Assets.USDC);
    toggleLoading(false, true);
    onDepositChannelChange(null);

    onClose();
  }

  React.useEffect(() => {
    onAmountChange("");
  }, [asset]);

  return (
    <Dialog
      footer={controls}
      header={title}
      isOpen={isOpen}
      onClose={onCloseHandler}
    >
      <div className="flex flex-col w-full gap-4">
        <AssetSelector
          action={action}
          disabled={loading}
          value={asset}
          onChange={onAssetChange}
        />
        <AmountInput
          account={account}
          action={action}
          asset={action === "withdraw" ? Assets.DOT : asset}
          disabled={loading}
          value={amount}
          onChange={onAmountChange}
        />
        <QuotesDisplay
          action={action}
          asset={asset}
          value={amount}
          onHasQuotesChange={onHasQuotesChange}
        />

        {depositChannel ? (
          <DepositChannelInfo
            depositChannelId={depositChannel.depositChannelId}
            onDone={onCloseHandler}
          />
        ) : (
          <p>{status}</p>
        )}
      </div>
    </Dialog>
  );
};
