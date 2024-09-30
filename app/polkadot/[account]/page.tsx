"use client";
import React, { useEffect } from "react";
import { abbreviateAddress } from "common-crypto-tools";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { addHTMLBreaksToAddress } from "common-crypto-tools";

import Title from "@/components/layout/Title";
import { subtitle, title } from "@/components/primitives";
import { explorers } from "@/config/explorers";
import { WithCorrectOwner } from "@/components/polkadot/account/WithCorrectOwner";
import { Chains } from "@/config/chains";
import { PolkadotAccountBalance } from "@/components/polkadot/PolkadotAccountBalance";
import { loadPolkadotAccount } from "@/stores/polkadot/polkadotAccountsStore";
import { SubAccountInfo } from "@/components/polkadot/account/SubAccountInfo";
import { resetPinCode } from "@/stores/pinCodeStore";

export default function PolkadotPage({
  params: { account },
}: {
  params: { account: string };
}) {
  useEffect(() => {
    void loadPolkadotAccount(account);
    void resetPinCode();
  }, [account]);

  return (
    <section className="flex flex-col h-full w-full items-start justify-center gap-4">
      <Title>
        <h1 className={title()}>Account {abbreviateAddress(account)}&nbsp;</h1>
        <h1 className={title({ color: "pink" })}>
          <PolkadotAccountBalance account={account} />{" "}
        </h1>
        <div className="w-full">
          <Link
            isExternal
            className={linkStyles({ color: "secondary" })}
            href={explorers.polkadot("account", account)}
          >
            <h2
              dangerouslySetInnerHTML={{
                __html: addHTMLBreaksToAddress(account),
              }}
              className={subtitle({
                size: "sm",
                truncate: true,
                color: "inherit",
                breakSpaces: true,
              })}
            />
          </Link>
        </div>
      </Title>
      <WithCorrectOwner chain={Chains.Polkadot} subAccount={account}>
        <SubAccountInfo account={account} />
      </WithCorrectOwner>
    </section>
  );
}
