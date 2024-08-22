import React from "react";
import { Link } from "@nextui-org/link";
import { button } from "@nextui-org/theme";

type HomeButtonProps = {};

export const HomeButton: React.FC<HomeButtonProps> = () => {
  return (
    <Link
      className={button({ color: "primary", variant: "bordered" })}
      href="/"
    >
      Home
    </Link>
  );
};
