import { NetworksWithDeployedContract } from "sub-accounts-contract/contracts";

export const DEFAULT_CHAIN: NetworksWithDeployedContract =
  NetworksWithDeployedContract.Sepolia;

export const Networks: Record<NetworksWithDeployedContract, string> = {
  [NetworksWithDeployedContract.Ethereum]: "Ethereum",
  [NetworksWithDeployedContract.Sepolia]: "Sepolia",
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
};
