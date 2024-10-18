"use client";

import React, { useEffect } from "react";
import { Link } from "@nextui-org/link";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { abbreviateAddress } from "common-crypto-tools";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

import styles from "./AccountsList.module.css";

import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { titleH2 } from "@/components/primitives";
import { PolkadotAccountBalance } from "@/components/polkadot/PolkadotAccountBalance";
import { OrangeButton } from "@/components/ui/buttons/OrangeButton";
import { useSubAccountsBalanceLoad } from "@/hooks/useSubAccountsBalanceLoad";
import { AccountImage } from "@/components/ui/AccountImage";

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
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {accounts.map((account) => (
              <Card
                key={account.address}
                isPressable
                className={clsx("w-full flex", styles.card)}
                shadow="sm"
                onClick={() => {
                  router.push(`/polkadot/${account.networkAddress}`);
                }}
              >
                <CardBody className="overflow-visible p-0">
                  <AccountImage account={account.networkAddress} ratio="2/1" />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{abbreviateAddress(account.networkAddress, 6)}</b>
                  <p className="text-default-500">
                    <PolkadotAccountBalance account={account.networkAddress} />
                  </p>
                </CardFooter>
              </Card>
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
