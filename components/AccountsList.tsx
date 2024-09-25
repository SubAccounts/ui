"use client";

import React, { useEffect } from "react";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { abbreviateAddress } from "common-crypto-tools";
import { useRouter } from "next/navigation";

import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { titleH2 } from "@/components/primitives";
import { PolkadotAccountBalance } from "@/components/polkadot/PolkadotAccountBalance";
import { OrangeButton } from "@/components/buttons/OrangeButton";
import { useSubAccountsBalanceLoad } from "@/hooks/useSubAccountsBalanceLoad";

type AccountsListProps = {
  network: string;
};

export const AccountsList: React.FC<AccountsListProps> = ({ network }) => {
  const accounts = useSubAccountsBalanceLoad(network);
  const router = useRouter();
  const web3 = useWeb3Onboard();

  useEffect(() => {
    web3.reload();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="inline-block w-full text-left justify-center">
          <h2 className={titleH2()}>
            All your {network} SubAccounts are here.
          </h2>
        </div>
        {web3.subWalletsLoading ? (
          <div className="inline-block w-full text-left justify-center">
            <p>Loading. Please wait...</p>
          </div>
        ) : accounts.length ? (
          <div className="flex w-full flex-col items-start justify-start gap-4">
            {accounts.map((account) => (
              <Snippet
                key={account.address}
                hideSymbol
                className="hover:border-primary hover:cursor-pointer hover:text-primary"
                codeString={account.networkAddress}
                size="lg"
                variant="bordered"
                onClick={() =>
                  router.push(`/polkadot/${account.networkAddress}`)
                }
              >
                <p className="overflow-auto hidden md:flex">
                  {account.networkAddress.padEnd(40, "&nbsp;")} |{" "}
                  <PolkadotAccountBalance account={account.networkAddress} />
                </p>
                <p className="overflow-auto md:hidden">
                  {abbreviateAddress(account.networkAddress, 12)} |{" "}
                  <PolkadotAccountBalance account={account.networkAddress} />
                </p>
              </Snippet>
            ))}
          </div>
        ) : (
          <div className="inline-block w-full text-left justify-center">
            <p>Wow! You do not have any SubAccounts!</p>
          </div>
        )}
      </div>

      <div
        className="
        flex w-full
        items-center justify-start gap-4"
      >
        <OrangeButton as={Link} href={`/${network}/new`} size="lg">
          Create new one
        </OrangeButton>
      </div>
    </>
  );
};
