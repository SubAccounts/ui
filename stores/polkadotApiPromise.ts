import { atom } from "nanostores";
import { ApiPromise, WsProvider } from "@polkadot/api";

export const polkadotApiPromise = atom<ApiPromise | null>(null);

let creatingNow: Promise<ApiPromise> | null = null;

async function createApiPromise() {
  return await ApiPromise.create({
    provider: new WsProvider(process.env.NEXT_PUBLIC_POLKADOT_RPC_NODE_URL),
  });
}

export async function loadApiPromise() {
  const apiPromise = polkadotApiPromise.get();

  if (apiPromise) {
    return apiPromise;
  }

  if (creatingNow) {
    return await creatingNow;
  }

  creatingNow = createApiPromise();

  const newApiPromise = await creatingNow;

  polkadotApiPromise.set(newApiPromise);

  creatingNow = null;

  return newApiPromise;
}

// onMount(polkadotApiPromise, () => {
//   ApiPromise.create({
//     provider: new WsProvider("wss://polkadot-rpc.publicnode.com"),
//   }).then((apiPromise) => {
//     polkadotApiPromise.set(apiPromise);
//   });
// });
