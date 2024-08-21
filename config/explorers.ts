import { polkadotExplorerUrl } from "common-crypto-tools/polkadot/index";

import { Chains } from "@/config/chains";

export const explorers = {
  polkadot: polkadotExplorerUrl(Chains.Polkadot),
};
