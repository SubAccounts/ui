import { ethers } from "ethers";

import { humanToArbitrumUsdc } from "@/utils/arbitrumUsdcToHuman";

const erc20Abi = [
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
];

const USDC_ARB = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";

export function ERC20Contract(wallet: ethers.providers.JsonRpcSigner) {
  const contract = new ethers.Contract(USDC_ARB, erc20Abi, wallet);

  async function getBalance(address: string) {
    const balance = await contract.balanceOf(address);

    console.log(
      `Balance of ${address}: ${humanToArbitrumUsdc(balance)} tokens`,
    );
  }

  async function transferTokens(to: string, amount: number) {
    const tx = await contract.transfer(to, humanToArbitrumUsdc(amount));

    await tx.wait();
    console.log(`Transfer of ${amount} tokens to ${to} completed.`);
  }

  return {
    getBalance,
    transferTokens,
  };
}
