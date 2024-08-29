"use client";

import React, { useEffect } from "react";
import { button as buttonStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { abbreviateAddress } from "common-crypto-tools";
import { useRouter } from "next/navigation";

import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { titleH2 } from "@/components/primitives";
import { EncodedSubAccount } from "@/types";
import { getAccountAddressForNetwork } from "@/utils/polkadot/getAccountAddressForNetwork";
import { loadPolkadotAccount } from "@/stores/polkadot/polkadotAccountsStore";
import { PolkadotAccountBalance } from "@/components/polkadot/PolkadotAccountBalance";
import { Chains } from "@/config/chains";

type AccountsListProps = {
  network: string;
};

type EncodedSubWalletWithNetworkAddress = EncodedSubAccount & {
  networkAddress: string;
};

export const AccountsList: React.FC<AccountsListProps> = ({ network }) => {
  const router = useRouter();
  const web3 = useWeb3Onboard();

  const accounts: EncodedSubWalletWithNetworkAddress[] = [
    ...web3.encodedSubAccounts,
  ]
    .filter((e) => e.network === network)
    .map((e) => {
      let networkAddress = e.address;

      if (network === Chains.Polkadot) {
        networkAddress = getAccountAddressForNetwork(
          e.address,
          Chains.Polkadot,
        );
      }

      return {
        ...e,
        networkAddress,
      };
    });

  React.useEffect(() => {
    accounts.forEach((account) => {
      void loadPolkadotAccount(account.networkAddress);
    });
  }, [accounts.map((e) => e.networkAddress).join("")]);

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
        <Link
          className={buttonStyles({
            variant: "bordered",
            radius: "sm",
            color: "secondary",
          })}
          href={`/${network}/new`}
        >
          Create new one
        </Link>
      </div>
    </>
  );
};
