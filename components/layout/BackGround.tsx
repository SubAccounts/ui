"use client";
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/dist/client/components/navigation";

import styles from "./BackGround.module.css";

import { useToggleHandler } from "@/hooks/useToggleHandler";

type BackGroundProps = {
  //
};

const textLines: string[] = [
  "ETHEREUM + POLKADOT = <3",
  "STAKE SLEEP EARN REPEAT",
  "HOW TO STAKE USDC TO DOT? EASY!",
  "IN STAKE WE TRUST!",
  "HAVE YOU EVER HEARD OF SOLANA? SOON...",
];

export const BackGround: React.FC<BackGroundProps> = () => {
  const pathname = usePathname();

  const [active, toggleActive] = useToggleHandler(false);
  const [shown, toggleShown] = useToggleHandler(false);
  const [visible, toggleVisible] = useToggleHandler(false);

  React.useEffect(() => {
    if (pathname === "/") {
      toggleShown(true, true);
      setTimeout(toggleVisible(true), 300);
      setTimeout(toggleActive(true), 1_000);
    } else {
      toggleVisible(false, true);
      setTimeout(() => toggleShown(false, true), 1_000);
      setTimeout(toggleActive(false), 1_000);
    }
  }, [pathname]);

  return (
    <>
      {shown && (
        <div
          className={clsx(
            "absolute z-0 w-full h-full top-0 left-0 overflow-hidden transition-opacity duration-1000",
            {
              "opacity-10": visible,
              "opacity-0": !visible,
            },
          )}
        >
          <div
            className={clsx(
              "rotate-6 absolute z-0 w-full h-full top-0 left-0 flex flex-col gap-4 justify-center",
              {
                [styles.active]: active,
              },
            )}
          >
            {[...textLines, ...textLines].map((line, index) => (
              <p key={index} className={styles.transparentOutlinedText}>
                {`${line} `.repeat(3)}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
