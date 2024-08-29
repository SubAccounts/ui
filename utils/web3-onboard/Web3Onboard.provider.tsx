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

// import { SubAccounts__factory } from "@/utils/contracts/typechain/ethers-v5/SubAccounts";

export interface IWeb3OnboardProviderContext {
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

  console.log(encodedSubAccounts);

  async function loadSubWallets(address: string, contract: SubAccounts) {
    const accounts = await contract.getSubAccountsByAddress(address);

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
    // const chainId = NetworkIds.Sepolia;

    if (wallet) {
      const { provider } = wallet;

      try {
        // Запрос на смену сети
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }], // Например, '0x3' для Ropsten Testnet
        });

        console.log(`Успешно переключились на сеть с chainId: ${chainId}`);
      } catch (error) {
        console.error("Ошибка при смене сети:", error);

        // Если сети еще нет в кошельке, добавляем ее
        // @ts-ignore
        if (error.code === 4902) {
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [networkConfig[chainId]],
            });
          } catch (addError) {
            console.error("Ошибка при добавлении новой сети:", addError);
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

      const signer = provider.getSigner();

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
    }
  }, [wallet]);

  return (
    <Web3OnboardProviderContext.Provider
      value={{
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
