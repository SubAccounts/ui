import React from "react";

import { Dialog, DialogBaseProps } from "@/components/Dialog/Dialog";
import { buttonStyles } from "@/utils/ui/buttonStyles";

type UnBondDialogProps = DialogBaseProps & {
  //
};

export const UnBondDialog: React.FC<UnBondDialogProps> = ({
  onClose,
  isOpen,
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
          {/*<Link*/}
          {/*  isExternal*/}
          {/*  className={buttonStyles({*/}
          {/*    variant: "bordered",*/}
          {/*    radius: "sm",*/}
          {/*    color: "primary",*/}
          {/*  })}*/}
          {/*  href="https://swap.chainflip.io/"*/}
          {/*>*/}
          {/*  ChainFlip*/}
          {/*</Link>*/}
        </div>
      }
      header={<>UnBond to main account</>}
      isOpen={isOpen}
      onClose={onClose}
    >
      asd
    </Dialog>
  );
};
