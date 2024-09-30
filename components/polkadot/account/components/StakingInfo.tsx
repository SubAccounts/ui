import React from "react";
import { useStore } from "@nanostores/react";

import { accountsNominationPoolStateStore } from "@/stores/polkadot/nominationPools/accountsNominationPoolStateStore";
import { PolkadotLedgerBalance } from "@/components/polkadot/PolkadotLedgerBalance";
import { polkadotBalanceValue } from "@/utils/polkadotBalanceValue";
import { accountsPendingRewardsStore } from "@/stores/polkadot/nominationPools/accountsPendingRewardsStore";

type StakingInfoProps = {
  account: string;
};

export const StakingInfo: React.FC<StakingInfoProps> = ({ account }) => {
  const $accountsNominationPoolStateStore = useStore(
    accountsNominationPoolStateStore,
  );
  const $accountsPendingRewardsStore = useStore(accountsPendingRewardsStore);

  const pool = $accountsNominationPoolStateStore[account];
  const pendingRewards = $accountsPendingRewardsStore[account];

  return (
    <>
      {pool ? (
        <>{polkadotBalanceValue(pool.points)}</>
      ) : (
        <PolkadotLedgerBalance account={account} param="staking" />
      )}
    </>
  );
};
