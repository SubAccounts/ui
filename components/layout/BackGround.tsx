"use client";
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/dist/client/components/navigation";

import styles from "./BackGround.module.css";

import { useToggleHandler } from "@/hooks/useToggleHandler";

type BackGroundProps = {
  //
};

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
            <p className={styles.transparentOutlinedText}>
              ETHEREUM + POLKADOT = {"<"}3; ARBITRUM + POLKADOT = {"<"}
              3;ETHEREUM + POLKADOT = {"<"}3; ARBITRUM + POLKADOT = {"<"}3;
            </p>
            <p className={styles.transparentOutlinedText}>
              STAKE COLLECT EARN REPEAT STAKE COLLECT EARN REPEAT STAKE COLLECT{" "}
              EARN REPEAT{" "}
            </p>
            <p className={styles.transparentOutlinedText}>
              HOW TO STAKE USDC TO DOT? EASY! HOW TO STAKE USDC TO DOT? EASY!{" "}
            </p>
            <p className={styles.transparentOutlinedText}>
              ETHEREUM + POLKADOT = {"<"}3; ARBITRUM + POLKADOT = {"<"}
              3;ETHEREUM + POLKADOT = {"<"}3; ARBITRUM + POLKADOT = {"<"}3;
            </p>
            <p className={styles.transparentOutlinedText}>
              STAKE COLLECT EARN REPEAT STAKE COLLECT EARN REPEAT STAKE COLLECT{" "}
              EARN REPEAT{" "}
            </p>
            <p className={styles.transparentOutlinedText}>
              HOW TO STAKE USDC TO DOT? EASY! HOW TO STAKE USDC TO DOT? EASY!{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
