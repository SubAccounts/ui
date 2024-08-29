import React from "react";
import { Link } from "@nextui-org/link";
import { addHTMLBreaksToAddress } from "common-crypto-tools/common";
import { button as buttonStyles } from "@nextui-org/theme";

import { Dialog, DialogBaseProps } from "@/components/Dialog/Dialog";

type DepositDialogProps = DialogBaseProps & {
  account: string;
};

export const DepositDialog: React.FC<DepositDialogProps> = ({
  account,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog
      footer={
        <div className="flex items-end gap-4">
          <button
            className={buttonStyles({
              variant: "bordered",
              radius: "sm",
            })}
            onClick={onClose}
          >
            Close
          </button>
          <Link
            isExternal
            className={buttonStyles({
              variant: "bordered",
              radius: "sm",
              color: "primary",
            })}
            href="https://swap.chainflip.io/"
          >
            ChainFlip
          </Link>
        </div>
      }
      header={
        <>
          Deposit to{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: addHTMLBreaksToAddress(account),
            }}
          />
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <p>
        We are actively working on integrating{" "}
        <Link isExternal href="https://chainflip.io/">
          ChainFlip
        </Link>{" "}
        into our platform. Currently, this functionality is under development
        and is planned to be seamlessly incorporated into our user interface in
        the near future. Until this integration is complete, we kindly suggest
        visiting the official{" "}
        <Link isExternal href="https://swap.chainflip.io/">
          ChainFlip website
        </Link>{" "}
        to carry out any bridging transactions directly through their service.
      </p>
      <p>
        This temporary approach will ensure you have access to the necessary
        cross-chain capabilities while we finalize our integration. Thank you
        for your patience and understanding as we work to enhance your
        experience with this new feature.
      </p>
      <img alt="ChainFlip Swap" className="w-full" src="/chainflip-swap.webp" />
    </Dialog>
  );
};
