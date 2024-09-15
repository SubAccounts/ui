import React from "react";
import { abbreviateAddress } from "common-crypto-tools/common";
import { DepositAddressResponse, SwapSDK } from "@chainflip/sdk/swap";
import { ethers } from "ethers";

import {
  Assets,
  AssetsNames,
} from "@/components/polkadot/account/chainflip/assets";
import { DialogBaseProps } from "@/components/Dialog/Dialog";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { useToggleHandler } from "@/hooks/useToggleHandler";
import { ChainFlipDialog } from "@/components/polkadot/account/chainflip/dialogs/ChainFlipDialog";
import {
  init,
  prepareRequestData,
  requestDepositChannel,
} from "@/components/polkadot/account/chainflip/chainFlip";
import { DepositControls } from "@/components/polkadot/account/chainflip/controls/DepositControls";
import { addEthereumTransaction } from "@/stores/transactions";
import { transferErc20, transferEth } from "@/stores/erc20Store";

type WithdrawDialogProps = DialogBaseProps & {
  account: string;
};

export const DepositDialog: React.FC<WithdrawDialogProps> = ({
  onClose,
  isOpen,
  account,
}) => {
  const [swapSDK, set_swapSDK] = React.useState<SwapSDK | null>(null);
  const [asset, set_asset] = React.useState<Assets>(Assets.USDC);
  const [status, set_status] = React.useState<string>("");
  const [loading, toggleLoading] = useToggleHandler(false);

  const { currentAccountAddress, wallet } = useWeb3Onboard();
  const [depositChannel, set_depositChannel] =
    React.useState<DepositAddressResponse | null>(null);
  const [amount, set_amount] = React.useState<string>("");
  const [hasQuotes, set_hasQuotes] = React.useState<boolean>(false);

  async function sendTransaction() {
    if (currentAccountAddress && account && swapSDK) {
      set_status("Creating deposit channel");

      const {
        srcChain,
        destChain,
        srcAsset,
        destAsset,
        amount: _amount,
      } = prepareRequestData(asset, amount, "deposit");

      toggleLoading(true, true);

      try {
        const depositChannel = await requestDepositChannel(swapSDK, {
          srcChain,
          srcAsset,
          destChain,
          destAsset,
          destAddress: account,
          amount: _amount,
        });

        set_depositChannel(depositChannel);

        set_status("Sending transaction");

        const result = await addEthereumTransaction(
          async () => {
            if (asset === Assets.USDC) {
              return await transferErc20(
                depositChannel.depositAddress,
                _amount,
              );
            } else {
              return await transferEth(depositChannel.depositAddress, _amount);
            }
          },
          currentAccountAddress,
          `Deposit ${AssetsNames[asset]}`,
        );

        if (result) {
          set_status("Done");
        } else {
          set_status("Error");
        }
      } catch (e) {
        //
      }
    }
  }

  React.useEffect(() => {
    if (wallet) {
      const provider = new ethers.providers.Web3Provider(wallet.provider);

      const signer = provider.getSigner();

      set_swapSDK(init(signer));
    } else {
      set_swapSDK(null);
    }
  }, [wallet]);

  const actionIsDisabled = !hasQuotes || loading;

  return (
    <ChainFlipDialog
      account={account}
      action={"deposit"}
      amount={amount}
      asset={asset}
      controls={
        <DepositControls
          actionText={"Deposit"}
          disabled={actionIsDisabled}
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
      title={`Deposit ${AssetsNames[asset]}'s to ${abbreviateAddress(account)}`}
      toggleLoading={toggleLoading}
      onAmountChange={set_amount}
      onAssetChange={set_asset}
      onClose={onClose}
      onDepositChannelChange={set_depositChannel}
      onHasQuotesChange={set_hasQuotes}
    />
  );
};

// import React from "react";
// import { Link } from "@nextui-org/link";
// import { addHTMLBreaksToAddress } from "common-crypto-tools/common";
// import { button as buttonStyles } from "@nextui-org/theme";
//
// import { Dialog, DialogBaseProps } from "@/components/Dialog/Dialog";
//
// type DepositDialogProps = DialogBaseProps & {
//   account: string;
// };
//
// export const DepositDialog: React.FC<DepositDialogProps> = ({
//   account,
//   isOpen,
//   onClose,
// }) => {
//   return (
//     <Dialog
//       footer={
//         <div className="flex items-end gap-4">
//           <button
//             className={buttonStyles({
//               variant: "bordered",
//               radius: "sm",
//             })}
//             onClick={onClose}
//           >
//             Close
//           </button>
//           <Link
//             isExternal
//             className={buttonStyles({
//               variant: "bordered",
//               radius: "sm",
//               color: "primary",
//             })}
//             href="https://swap.chainflip.io/"
//           >
//             ChainFlip
//           </Link>
//         </div>
//       }
//       header={
//         <>
//           Deposit to{" "}
//           <span
//             dangerouslySetInnerHTML={{
//               __html: addHTMLBreaksToAddress(account),
//             }}
//           />
//         </>
//       }
//       isOpen={isOpen}
//       onClose={onClose}
//     >
//       <p>
//         We are actively working on integrating{" "}
//         <Link isExternal href="https://chainflip.io/">
//           ChainFlip
//         </Link>{" "}
//         into our platform. Currently, this functionality is under development
//         and is planned to be seamlessly incorporated into our user interface in
//         the near future. Until this integration is complete, we kindly suggest
//         visiting the official{" "}
//         <Link isExternal href="https://swap.chainflip.io/">
//           ChainFlip website
//         </Link>{" "}
//         to carry out any bridging transactions directly through their service.
//       </p>
//       <p>
//         This temporary approach will ensure you have access to the necessary
//         cross-chain capabilities while we finalize our integration. Thank you
//         for your patience and understanding as we work to enhance your
//         experience with this new feature.
//       </p>
//       <img alt="ChainFlip Swap" className="w-full" src="/chainflip-swap.webp" />
//     </Dialog>
//   );
// };
