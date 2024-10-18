import React from "react";
import { abbreviateAddress } from "common-crypto-tools";
import { DepositAddressResponse } from "@chainflip/sdk/swap";

import { Assets } from "@/components/polkadot/account/chainflip/assets";
import { DialogBaseProps } from "@/components/Dialog/Dialog";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { useToggleHandler } from "@/hooks/useToggleHandler";
import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { addPolkadotTransaction } from "@/stores/transactions";
import { ChainFlipDialog } from "@/components/polkadot/account/chainflip/dialogs/ChainFlipDialog";
import { PoladotAccountDialogControls } from "@/components/polkadot/account/components/PoladotAccountDialogControls";
import {
  init,
  prepareRequestData,
  requestDepositChannel,
} from "@/components/polkadot/account/chainflip/chainFlip";
import { useUnlockedAccount } from "@/hooks/useUnlockedAccount";

type WithdrawDialogProps = DialogBaseProps & {
  account: string;
};

const swapSDK = init();

export const WithdrawDialog: React.FC<WithdrawDialogProps> = ({
  onClose,
  isOpen,
  account,
}) => {
  const [asset, set_asset] = React.useState<Assets>(Assets.USDC);
  const [status, set_status] = React.useState<string>("");
  const [loading, toggleLoading] = useToggleHandler(false);
  const unlockedAccount = useUnlockedAccount();
  const { currentAccountAddress } = useWeb3Onboard();
  const [depositChannel, set_depositChannel] =
    React.useState<DepositAddressResponse | null>(null);
  const [amount, set_amount] = React.useState<string>("");
  const [hasQuotes, set_hasQuotes] = React.useState<boolean>(false);

  async function sendTransaction() {
    if (currentAccountAddress && unlockedAccount.value) {
      set_status("Creating deposit channel");

      const {
        srcChain,
        destChain,
        srcAsset,
        destAsset,
        amount: _amount,
      } = prepareRequestData(asset, amount, "withdraw");

      toggleLoading(true, true);

      try {
        const depositChannel = await requestDepositChannel(swapSDK, {
          srcChain,
          srcAsset,
          destChain,
          destAsset,
          destAddress: currentAccountAddress,
          amount: _amount,
        });

        set_depositChannel(depositChannel);

        set_status("Preparing transaction");

        const apiPromise = await loadApiPromise();

        let extrinsic = await apiPromise.tx.balances.transferKeepAlive(
          depositChannel.depositAddress,
          _amount,
        );

        set_status("Sending transaction");

        const result = await addPolkadotTransaction(
          extrinsic,
          unlockedAccount.value,
          "Withdraw",
          currentAccountAddress,
        );

        if (result) {
          set_status("Done");
        } else {
          set_status("Error");
        }
      } catch (e) {
        console.log(e);
        //
      }
    }
  }

  const actionIsDisabled = !hasQuotes || loading;

  return (
    <ChainFlipDialog
      account={account}
      action={"withdraw"}
      amount={amount}
      asset={asset}
      controls={
        <PoladotAccountDialogControls
          actionText={"Withdraw"}
          disabled={actionIsDisabled}
          unlockedAccount={unlockedAccount.value}
          updateUnlockedAccount={unlockedAccount.set}
          onClose={onClose}
          onSend={sendTransaction}
        />
      }
      depositChannel={depositChannel}
      hasQuotes={hasQuotes}
      isOpen={isOpen}
      loading={loading}
      status={status}
      subAccountAddress={account}
      title={`Withdraw DOT's from ${abbreviateAddress(account)} to ${currentAccountAddress && abbreviateAddress(currentAccountAddress)}`}
      toggleLoading={toggleLoading}
      onAmountChange={set_amount}
      onAssetChange={set_asset}
      onClose={onClose}
      onDepositChannelChange={set_depositChannel}
      onHasQuotesChange={set_hasQuotes}
    />
  );
};
