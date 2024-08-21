export enum NetworkIds {
  Ethereum = "0x1",
  Sepolia = "0xaa36a7",
}

export const DEFAULT_CHAIN: NetworkIds = NetworkIds.Sepolia;

export const Networks: Record<NetworkIds, string> = {
  [NetworkIds.Ethereum]: "Ethereum",
  [NetworkIds.Sepolia]: "Sepolia",
};

export const networkConfig: Record<
  NetworkIds,
  {
    id: number;
    token: string;
    label: string;
    rpcUrl: string;
    blockExplorerUrls?: string[];
  }
> = {
  [NetworkIds.Sepolia]: {
    id: 11155111,
    token: "ETH",
    label: "Sepolia",
    rpcUrl: "https://rpc.sepolia.org/",
    // blockExplorerUrls: ["https://ropsten.etherscan.io"],
  },
  [NetworkIds.Ethereum]: {
    id: 1,
    token: "ETH",
    label: "Ethereum",
    rpcUrl: "https://rpc.sepolia.org/",
  },
};
