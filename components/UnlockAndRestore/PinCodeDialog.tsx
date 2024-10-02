import React, { useState } from "react";

import { buttonStyles } from "@/utils/ui/buttonStyles";
import { Dialog } from "@/components/Dialog/Dialog";

export type PinCodeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onPinCodeChange: (value: string) => void;
};

export const PinCodeDialog: React.FC<PinCodeDialogProps> = ({
  isOpen,
  onClose,
  onPinCodeChange,
}) => {
  const [pinCode, setPinCode] = useState<string>("");

  const onPinCodeSetHandler = () => {
    pinCode && onPinCodeChange(pinCode);
    onClose();
  };

  return (
    <>
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
              Continue without PIN code
            </button>
            <button
              className={buttonStyles({
                variant: "bordered",
                radius: "sm",
                color: "primary",
              })}
              onClick={onPinCodeSetHandler}
            >
              Set Up PIN code
            </button>
          </div>
        }
        header="Pin code for faster operation"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex w-full flex-col gap-4">
          <p>
            Would you like to set a PIN code for quick account recovery? The PIN
            will only be valid during the current session and will be deleted if
            the page is refreshed or the account is switched
          </p>
          <div className="flex flex-col w-full items-start justify-start">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="account_pincode"
            >
              Pin code
            </label>
            <input
              required
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="account_pincode"
              placeholder="Enter pin code"
              type="password"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
