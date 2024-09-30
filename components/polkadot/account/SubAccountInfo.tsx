"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useStore } from "@nanostores/react";

import { titleH2, titleH3 } from "@/components/primitives";
import { loadPolkadotLedger } from "@/stores/polkadot/polkadotLedgerStore";
import { AccountControlButtons } from "@/components/polkadot/account/AccountControlButtons";
import { OrangeButton } from "@/components/buttons/OrangeButton";
import { StakeDialog } from "@/components/polkadot/account/dialogs/StakeDialog";
import { useToggler } from "@/hooks/useToggler";
import {
  accountsNominationPoolStateStore,
  loadAccountNominationPoolData,
} from "@/stores/polkadot/nominationPools/accountsNominationPoolStateStore";
import {
  accountsPendingRewardsStore,
  loadAccountsPendingRewards,
} from "@/stores/polkadot/nominationPools/accountsPendingRewardsStore";
import { polkadotBalanceValue } from "@/utils/polkadotBalanceValue";
import { polkadotAccountsStore } from "@/stores/polkadot/polkadotAccountsStore";
import { SizedContainer } from "@/components/layout/SizedContainer";

type AccountInfoProps = {
  account: string;
};

const blockClassName =
  "w-full flex-col flex h-full p-4 gap-4 " +
  "bg-blue-50 dark:bg-gray-950 " +
  "rounded border-1 border-blue-900 dark:border-gray-700";

const titleClassName = titleH3({ fullWidth: true });

export const SubAccountInfo: React.FC<AccountInfoProps> = ({ account }) => {
  const $accountsNominationPoolStateStore = useStore(
    accountsNominationPoolStateStore,
  );
  const $accountsPendingRewardsStore = useStore(accountsPendingRewardsStore);
  const $polkadotAccountsStore = useStore(polkadotAccountsStore);

  const pool = $accountsNominationPoolStateStore[account];
  const pendingRewards = $accountsPendingRewardsStore[account];
  const accountBalance =
    $polkadotAccountsStore[account]?.data.transferable || "0";

  const stakeDialogIsOpen = useToggler(false);

  useEffect(() => {
    if (account.length) {
      void loadPolkadotLedger(account);
      void loadAccountNominationPoolData(account);
      void loadAccountsPendingRewards(account);
    }
  }, [account]);

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <h2 className={titleH2()}>Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <Card className="w-full flex">
            <CardHeader className="justify-between px-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    Balances
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    {" "}
                  </h5>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-4 py-0 text-small text-default-500">
              <p>
                Transferable:{" "}
                <span className="font-bold">
                  {polkadotBalanceValue(accountBalance)}
                </span>
              </p>
              <p>
                Staking:{" "}
                <span className="font-bold">
                  {pool ? polkadotBalanceValue(pool.points) : "0"}
                </span>
              </p>
            </CardBody>
            <CardFooter className="gap-4 px-4">
              <AccountControlButtons account={account} />
            </CardFooter>
          </Card>
          <Card className="w-full flex">
            <CardHeader className="justify-between px-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    Smart Staking
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    Status: {pool ? "Active" : "Not active"}
                  </h5>
                </div>
              </div>
              <OrangeButton
                size="sm"
                variant="bordered"
                onClick={stakeDialogIsOpen.handler(true)}
              >
                {pool ? "Manage" : "Stake"}
              </OrangeButton>
            </CardHeader>
            <CardBody className="px-4 py-0 text-small text-default-500">
              <p>
                Pool ID:{" "}
                <span className="font-semibold">
                  {pool ? pool.poolId : "N/A"}
                </span>
              </p>
            </CardBody>
            <CardFooter className="gap-4 px-4 text-xs xl:text-small">
              <div className="flex gap-2">
                <p className="text-default-400">Your stake:</p>
                <p className="font-semibold text-default-400">
                  {pool ? polkadotBalanceValue(pool.points) : "None"}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-default-400">Pending rewards:</p>
                <p className="font-semibold text-default-400">
                  {pendingRewards
                    ? polkadotBalanceValue(pendingRewards, 6)
                    : "None"}
                </p>
              </div>
            </CardFooter>
          </Card>
          <Card className="w-full flex transition-all grayscale hover:grayscale-0">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Soon...
              </p>
              <h4 className="text-white/90 font-medium text-xl">
                Became Genius
              </h4>
            </CardHeader>
            <CardFooter className="absolute bg-black/80 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-tiny text-white">Became Genius</p>
                  <p className="text-tiny text-white">With SubAccount Proxy</p>
                </div>
              </div>
              <Button disabled color="success" size="sm" variant="bordered">
                Soon...
              </Button>
            </CardFooter>
            <SizedContainer ratio={[16, 9]}>
              <Image
                removeWrapper
                className="z-0 w-full h-full object-cover"
                src="/smart.webp"
              />
            </SizedContainer>
          </Card>
        </div>
      </div>
      <StakeDialog
        isOpen={stakeDialogIsOpen.value}
        subAccount={account}
        onClose={stakeDialogIsOpen.handler(false)}
      />
    </>
  );
};
