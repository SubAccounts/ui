import React from "react";

import { buttonStyles } from "@/utils/ui/buttonStyles";

type ControlsProps = {
  onClose: () => void;
  disabled: boolean;
  actionText: string;
  onSend: () => void | Promise<void>;
};

export const DepositControls: React.FC<ControlsProps> = ({
  onClose,
  disabled,
  actionText,
  onSend,
}) => {
  return (
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
      <button
        className={buttonStyles({
          variant: "bordered",
          radius: "sm",
          color: "secondary",
          isDisabled: disabled,
        })}
        disabled={disabled}
        onClick={onSend}
      >
        {actionText}
      </button>
    </div>
  );
};
