import { NetworksWithDeployedContract } from "sub-accounts-contract/contracts";

export const DEFAULT_CHAIN: NetworksWithDeployedContract =
  NetworksWithDeployedContract.Arbitrum;

export const Networks: Record<NetworksWithDeployedContract, string> = {
  [NetworksWithDeployedContract.Ethereum]: "Ethereum",
  [NetworksWithDeployedContract.Sepolia]: "Sepolia",
  [NetworksWithDeployedContract.Arbitrum]: "Arbitrum",
};

export const networkConfig: Record<
  NetworksWithDeployedContract,
  {
    id: number;
    token: string;
    label: string;
    rpcUrl: string;
    blockExplorerUrls?: string[];
  }
> = {
  [NetworksWithDeployedContract.Sepolia]: {
    id: 11155111,
    token: "ETH",
    label: "Sepolia",
    rpcUrl: "https://rpc.sepolia.org/",
    // blockExplorerUrls: ["https://ropsten.etherscan.io"],
  },
  [NetworksWithDeployedContract.Ethereum]: {
    id: 1,
    token: "ETH",
    label: "Ethereum",
    rpcUrl: "https://rpc.sepolia.org/",
  },
  [NetworksWithDeployedContract.Arbitrum]: {
    id: 42161,
    token: "ETH",
    label: "Arbitrum",
    rpcUrl: "https://arbiscan.io/",
  },
};
