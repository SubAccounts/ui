import React from "react";
import { Button, ButtonProps } from "@nextui-org/react";
import clsx from "clsx";

import styles from "./OrangeButton.module.css";

type OrangeButtonProps = ButtonProps;

export const OrangeButton: React.FC<OrangeButtonProps> = ({
  variant,
  ...props
}) => {
  return (
    <>
      {variant === "bordered" ? (
        <div
          className={clsx(
            "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-small",
            styles.container,
          )}
        >
          <Button
            className={clsx(
              "bg-gray-100 dark:bg-gray-950 text-pink-500",
              styles.child,
            )}
            {...props}
          />
        </div>
      ) : (
        <Button
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          {...props}
        />
      )}
    </>
  );
};
