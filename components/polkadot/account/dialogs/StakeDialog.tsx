import React from "react";
import { useStore } from "@nanostores/react";
import { toBigFloat } from "common-crypto-tools";
import { api } from "polkadot-typed-api";

import { Dialog, DialogBaseProps } from "@/components/Dialog/Dialog";
import {
  loadPools,
  polkadotNominationPoolsStore,
} from "@/stores/polkadot/polkadotNominationPoolsStore";
import { PoolCard } from "@/components/polkadot/account/components/PoolCard";
import { useToggler } from "@/hooks/useToggler";
import { InputWithTitle } from "@/components/common/InputWithTitle";
import {
  loadPolkadotAccount,
  polkadotAccountsStore,
} from "@/stores/polkadot/polkadotAccountsStore";
import { PoladotAccountDialogControls } from "@/components/polkadot/account/components/PoladotAccountDialogControls";
import { useUnlockedAccount } from "@/hooks/useUnlockedAccount";
import { PolkadotChainConfig } from "@/config/polkadotChainConfig";
import { loadApiPromise } from "@/stores/polkadot/polkadotApiPromise";
import { addPolkadotTransaction } from "@/stores/transactions";
import { useWeb3Onboard } from "@/utils/web3-onboard/useWeb3Onboard";
import { loadPolkadotLedger } from "@/stores/polkadot/polkadotLedgerStore";
import {
  accountsNominationPoolStateStore,
  loadAccountNominationPoolData,
} from "@/stores/polkadot/nominationPools/accountsNominationPoolStateStore";

type StakeDialogProps = DialogBaseProps & {
  subAccount: string;
};

const defaultPoolId = 189;

export const StakeDialog: React.FC<StakeDialogProps> = ({
  subAccount,
  isOpen,
  onClose,
}) => {
  const $polkadotNominationPoolsStore = useStore(polkadotNominationPoolsStore);
  const $polkadotAccountsStore = useStore(polkadotAccountsStore);
  const $accountsNominationPoolStateStore = useStore(
    accountsNominationPoolStateStore,
  );

  const unlockedAccount = useUnlockedAccount();
  const web3 = useWeb3Onboard();

  const [poolId, set_poolId] = React.useState<number>(defaultPoolId);
  const [value, set_value] = React.useState<string>("");
  const loading = useToggler(false);
  const accountData = subAccount ? $polkadotAccountsStore[subAccount] : null;

  const userPool = $accountsNominationPoolStateStore[subAccount];

  const maxValue = accountData
    ? toBigFloat(accountData.data.transferable)
        .div(PolkadotChainConfig.decimals)
        .toString()
    : "0";

  const _selectedPool = $polkadotNominationPoolsStore.find(
    ([id]) => id === poolId,
  );

  const selectedPoolData = _selectedPool ? _selectedPool[1] : null;

  async function send() {
    if (unlockedAccount.value && web3.currentAccountAddress) {
      const valueToStake = toBigFloat(value)
        .multipliedBy(PolkadotChainConfig.decimals)
        .toString();

      const apiPromise = await loadApiPromise();

      loading.toggle(true);

      let extrinsic = await api.tx.nominationPools.join(
        apiPromise,
        valueToStake,
        poolId,
      );

      let transactionName = "Stake to pool";

      if (userPool) {
        extrinsic = await api.tx.nominationPools.bondExtra(apiPromise, {
          FreeBalance: valueToStake,
        });

        transactionName = "Bond extra";
      }

      addPolkadotTransaction(
        extrinsic,
        unlockedAccount.value,
        transactionName,
        web3.currentAccountAddress,
      )
        .then((result) => {
          if (result) {
            onClose();
          }

          unlockedAccount.set(null);
        })
        .catch((e) => {
          console.error("!", e);
        })
        .finally(() => {
          loading.toggle(false);

          loadPolkadotLedger(subAccount);
          loadPolkadotAccount(subAccount);
        });
    }
  }

  function reset() {
    set_poolId(defaultPoolId);
    set_value("");
  }

  React.useEffect(() => {
    if (isOpen) {
      void loadPools();
      void loadAccountNominationPoolData(subAccount);
    } else {
      reset();
    }
  }, [isOpen]);

  return (
    <Dialog
      footer={
        <PoladotAccountDialogControls
          actionText="Stake"
          disabled={loading.value}
          unlockedAccount={unlockedAccount.value}
          updateUnlockedAccount={unlockedAccount.set}
          onClose={onClose}
          onSend={send}
        />
      }
      header="Smart Stake"
      isOpen={isOpen}
      onClose={onClose}
    >
      {selectedPoolData && <PoolCard id={poolId} pool={selectedPoolData} />}

      <InputWithTitle
        disabled={loading.value}
        id="amount"
        label="How much DOT's to stake"
        max={+maxValue}
        placeholder="xxx"
        type="number"
        value={value}
        onChange={set_value}
      />
    </Dialog>
  );
};
