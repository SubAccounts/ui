import React from "react";
import { Button, ButtonProps } from "@nextui-org/react";

type OrangeButtonProps = ButtonProps;

export const OrangeButton: React.FC<OrangeButtonProps> = ({ ...props }) => {
  return (
    <Button
      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      {...props}
    />
  );
};
