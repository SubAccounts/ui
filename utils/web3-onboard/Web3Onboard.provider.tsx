"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { OnboardAPI, WalletState } from "@web3-onboard/core";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import {
  SubAccounts,
  SubAccounts__factory,
} from "sub-accounts-contract/ethers-v5";
import {
  contracts,
  NetworksWithDeployedContract,
} from "sub-accounts-contract/contracts";

import { initWeb3Onboard } from "@/utils/web3-onboard/services";
import { EncodedSubAccount } from "@/types";
import { DEFAULT_CHAIN, networkConfig } from "@/utils/web3-onboard/networks";
import { getAccountAddressForNetwork } from "@/utils/polkadot/getAccountAddressForNetwork";
import { Chains } from "@/config/chains";
import { setProvider, setSigner } from "@/stores/erc20Store";

export interface IWeb3OnboardProviderContext {
  currentAccountAddress: string | null;
  wallet: WalletState | null;
  connect: () => void;
  disconnect: () => void;
  loading: boolean;
  contract: SubAccounts | null;
  encodedSubAccounts: EncodedSubAccount[];
  subWalletsLoading: boolean;
  reload: () => void;
  isValidChain: boolean;
  switchChain: (chainId: NetworksWithDeployedContract) => void | Promise<void>;
}

export const Web3OnboardProviderContext =
  createContext<IWeb3OnboardProviderContext>({
    currentAccountAddress: null,
    wallet: null,
    loading: true,
    connect: () => {
      // do nothing
    },
    disconnect: () => {
      // do nothing
    },
    reload: () => {
      // do nothing
    },
    contract: null,
    encodedSubAccounts: [],
    subWalletsLoading: true,
    isValidChain: false,
    switchChain: () => {
      // do nothing
    },
  });

let loadTime = 0;

export const Web3OnboardProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccountAddress, set_currentAccountAddress] = React.useState<
    string | null
  >(null);
  const [contract, set_contract] =
    React.useState<IWeb3OnboardProviderContext["contract"]>(null);
  const [{ wallet }] = useConnectWallet();
  const [web3Onboard, setWeb3Onboard] = useState<OnboardAPI>();
  const [encodedSubAccounts, set_encodedSubAccounts] = React.useState<
    IWeb3OnboardProviderContext["encodedSubAccounts"]
  >([]);
  const [subWalletsLoading, set_subWalletsLoading] =
    React.useState<boolean>(true);
  const [reloadId, set_reloadId] = React.useState<number>(0);
  const [canConnect, set_canConnect] = React.useState<boolean>(false);
  const [currentWalletAddress, set_currentWalletAddress] =
    React.useState<string>("");

  async function loadSubWallets(address: string, contract: SubAccounts) {
    const accounts = await contract.getSubAccountsByAddress(address);

    accounts.forEach(([owner, encryptedAccount, network, accountAddress]) => {
      console.log(
        owner,
        encryptedAccount,
        network,
        accountAddress,
        getAccountAddressForNetwork(accountAddress, Chains.Polkadot),
      );
    });

    set_encodedSubAccounts(
      accounts.map(([owner, encryptedAccount, network, accountAddress]) => ({
        owner,
        encodedData: encryptedAccount,
        address: accountAddress,
        network,
      })),
    );
    set_subWalletsLoading(false);
    loadTime = +new Date();
  }

  function reload() {
    const time = Date.now();

    if (time - loadTime > 10_000) {
      set_reloadId((i) => i + 1);
    }
  }

  async function switchChain(chainId: NetworksWithDeployedContract) {
    if (wallet) {
      const { provider } = wallet;

      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } catch (error) {
        console.error("Switch network error:", error);

        // Если сети еще нет в кошельке, добавляем ее
        // @ts-ignore
        if (error.code === 4902) {
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [networkConfig[chainId]],
            });
          } catch (addError) {
            console.error("Add new network error:", addError);
          }
        }
      }
    }
  }

  useEffect(() => {
    (window as any).initWeb3Onboard = initWeb3Onboard;
    setWeb3Onboard(initWeb3Onboard);
  }, []);

  React.useEffect(() => {
    if (wallet && canConnect) {
      const provider = new ethers.providers.Web3Provider(wallet.provider);

      setProvider(provider);

      const signer = provider.getSigner();

      setSigner(signer);

      const contract = SubAccounts__factory.connect(
        contracts[DEFAULT_CHAIN],
        signer,
      );

      set_contract(contract);
    } else {
      set_contract(null);
    }
  }, [wallet, canConnect]);

  React.useEffect(() => {
    if (wallet) {
      set_currentWalletAddress(wallet.accounts[0].address);
    }
  }, [wallet ? wallet.accounts[0].address : ""]);

  React.useEffect(() => {
    set_encodedSubAccounts([]);
    if (currentWalletAddress && contract) {
      set_subWalletsLoading(true);
      void loadSubWallets(currentWalletAddress, contract);
    }
  }, [currentWalletAddress, reloadId, contract]);

  React.useEffect(() => {
    if (wallet) {
      const chains = wallet.chains;

      set_canConnect(chains[0].id === DEFAULT_CHAIN);
      set_currentAccountAddress(wallet.accounts[0].address);
    } else {
      set_currentAccountAddress(null);
    }
  }, [wallet]);

  return (
    <Web3OnboardProviderContext.Provider
      value={{
        currentAccountAddress,
        loading: !web3Onboard,
        wallet,
        connect: () => web3Onboard?.connectWallet(),
        disconnect: () =>
          wallet ? web3Onboard?.disconnectWallet(wallet) : null,
        contract,
        encodedSubAccounts,
        subWalletsLoading,
        reload,
        isValidChain: canConnect,
        switchChain,
      }}
    >
      {children}
    </Web3OnboardProviderContext.Provider>
  );
};
