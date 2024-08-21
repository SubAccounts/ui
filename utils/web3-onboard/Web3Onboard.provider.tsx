"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { OnboardAPI, WalletState } from "@web3-onboard/core";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

import { initWeb3Onboard } from "@/utils/web3-onboard/services";
import { SubWallets } from "@/utils/contracts/typechain/ethers-v5/SubWallets/SubWallets";
import { SubWallets__factory } from "@/utils/contracts/typechain/ethers-v5/SubWallets";
import { Contracts } from "@/utils/contracts/contracts";
import { EncodedSubWallet } from "@/types";
import {
  DEFAULT_CHAIN,
  networkConfig,
  NetworkIds,
} from "@/utils/web3-onboard/networks";

export interface IWeb3OnboardProviderContext {
  wallet: WalletState | null;
  connect: () => void;
  disconnect: () => void;
  loading: boolean;
  contract: SubWallets | null;
  encodedSubWallets: EncodedSubWallet[];
  subWalletsLoading: boolean;
  reload: () => void;
  isValidChain: boolean;
  switchChain: (chainId: NetworkIds) => void | Promise<void>;
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
    encodedSubWallets: [],
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
  const [encodedSubWallets, set_encodedSubWallets] = React.useState<
    IWeb3OnboardProviderContext["encodedSubWallets"]
  >([]);
  const [subWalletsLoading, set_subWalletsLoading] =
    React.useState<boolean>(true);
  const [reloadId, set_reloadId] = React.useState<number>(0);
  const [canConnect, set_canConnect] = React.useState<boolean>(false);
  const [currentWalletAddress, set_currentWalletAddress] =
    React.useState<string>("");

  async function loadSubWallets(address: string, contract: SubWallets) {
    const accounts = await contract.getAccountsByAddress(address);

    set_encodedSubWallets(
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

  async function switchChain(chainId: NetworkIds) {
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

      const contract = SubWallets__factory.connect(
        Contracts[DEFAULT_CHAIN],
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
    set_encodedSubWallets([]);
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
        encodedSubWallets,
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
