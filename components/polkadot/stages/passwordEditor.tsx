"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { defaultPassword } from "@/config/site";

const defaultPasswordMessage = "At least 24 symbols, including 0-9 #$%^&";
const successInputClass = "text-green-600 dark:text-green-500";
const warningInputClass = "text-orange-600 dark:text-orange-500";
const errorInputClass = "text-red-600 dark:text-red-500";

type PasswordEditorProps = {
  nextButtonClick: (password: string) => void;
  backButtonClick: () => void;
};

export const PasswordEditor: React.FC<PasswordEditorProps> = ({
  nextButtonClick,
  backButtonClick,
}) => {
  const [password, set_password] = React.useState<string>(defaultPassword);
  const [confirmation, set_confirmation] =
    React.useState<string>(defaultPassword);
  const [passwordMessage, set_passwordMessage] = React.useState<string>(
    defaultPasswordMessage,
  );
  const [passwordMessageClass, set_passwordMessageClass] =
    React.useState<string>("");

  const [confirmationMessage, set_confirmationMessage] =
    React.useState<string>("");
  const [confirmationMessageClass, set_confirmationMessageClass] =
    React.useState<string>("");

  const [canGoNext, set_canGoNext] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (password.length < 24) {
      set_passwordMessage(defaultPasswordMessage);
      set_passwordMessageClass(errorInputClass);
    } else if (
      !/[\@\!\#\$\%\^\&\*\(\)\=\-\§\±\`\~\<\>\?\/\.\,]/.test(password)
    ) {
      set_passwordMessage(
        "Please type at least one of special chars like @#$^&*...",
      );
      set_passwordMessageClass(warningInputClass);
    } else if (!/[0-9]/.test(password)) {
      set_passwordMessage("Please type one of numbers 0-9");
      set_passwordMessageClass(warningInputClass);
    } else {
      if (password.length < 36) {
        set_passwordMessage("Perfect!");
      } else if (password.length < 48) {
        set_passwordMessage("Bravo!");
      } else {
        set_passwordMessage("Excellent!");
      }
      set_passwordMessageClass(successInputClass);
    }
  }, [password]);

  React.useEffect(() => {
    if (password.length && confirmation.length) {
      if (password !== confirmation) {
        set_confirmationMessage("Passwords did not match.");
        set_confirmationMessageClass(errorInputClass);
        set_canGoNext(false);
      } else {
        set_confirmationMessage("");
        set_confirmationMessageClass("");
        set_canGoNext(true);
      }
    }
  }, [password, confirmation]);

  return (
    <>
      <div
        className="
        flex flex-col w-full
        items-center justify-center gap-4
        overflow-hidden
        "
      >
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full items-start justify-start">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="password_"
            >
              Password
            </label>
            <input
              required
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="password_"
              placeholder="•••••••••"
              type="password"
              value={password}
              onChange={(e) => set_password(e.target.value)}
            />
            <p className={clsx("mt-2 text-sm", passwordMessageClass)}>
              {passwordMessage}
            </p>
          </div>
          <div className="flex flex-col w-full items-start justify-start">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="confirm_password_"
            >
              Confirm password
            </label>
            <input
              required
              autoComplete="off"
              autoCorrect="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="confirm_password_"
              placeholder="•••••••••"
              type="password"
              value={confirmation}
              onChange={(e) => set_confirmation(e.target.value)}
            />
            {confirmationMessage && (
              <p className={clsx("mt-2 text-sm", confirmationMessageClass)}>
                {confirmationMessage}
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className="
        flex w-full
        items-center justify-start gap-4"
      >
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
          })}
          onClick={() => backButtonClick()}
        >
          Back
        </Button>
        <Button
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "secondary",
            isDisabled: !canGoNext,
          })}
          disabled={!canGoNext}
          onClick={() => nextButtonClick(password)}
        >
          Next
        </Button>
      </div>
    </>
  );
};
