import { atom, onSet } from "nanostores";
import { ethers } from "ethers";

const erc20Abi = [
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
];

const USDC_ARB = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";

export const erc20Store = atom<ethers.Contract | null>(null);

export const accountBalance = atom<string | null>(null);

export const accountEthBalance = atom<string | null>(null);

export const accountAddress = atom<string | null>(null);

const provider = atom<ethers.providers.JsonRpcProvider | null>(null);

const signer = atom<ethers.providers.JsonRpcSigner | null>(null);

export async function setSigner(
  _signer: ethers.providers.JsonRpcSigner,
): Promise<void> {
  signer.set(_signer);
  const contract = new ethers.Contract(USDC_ARB, erc20Abi, _signer);

  erc20Store.set(contract);
  accountAddress.set(await _signer.getAddress());
}

export async function setProvider(_provider: ethers.providers.JsonRpcProvider) {
  provider.set(_provider);
}

export async function getErc20Balance() {
  const contract = erc20Store.get();
  const account = accountAddress.get();

  if (contract && account) {
    const balance = await contract.balanceOf(account);

    accountBalance.set(ethers.utils.formatUnits(balance, 6) || "0");
  }
}

export async function getEthBalance() {
  const account = accountAddress.get();
  const _provider = provider.get();

  if (account && _provider) {
    const balance = await _provider.getBalance(account);

    accountEthBalance.set(
      (+ethers.utils.formatUnits(balance, 18)).toFixed(8) || "0",
    );
  }
}

export async function transferErc20(to: string, amount: string) {
  const contract = erc20Store.get();

  if (contract) {
    return contract.transfer(to, amount);
  }

  throw new Error("");
}

export async function transferEth(to: string, amount: string) {
  const _signer = signer.get();

  if (_signer) {
    const tx = {
      from: await _signer.getAddress(),
      to,
      value: amount,
    };

    return _signer.sendTransaction(tx);
  }

  throw new Error("");
}

let interval: number;

onSet(accountAddress, (value) => {
  if (interval) {
    clearInterval(interval);
  }

  setTimeout(() => {
    getErc20Balance();
    getEthBalance();
  }, 1_000);

  interval = setInterval(() => {
    getErc20Balance();
    getEthBalance();
  }, 10_000) as unknown as number;
});
