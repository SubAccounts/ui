import { utils } from "polkadot-typed-api";

import { Chains } from "@/config/chains";

export const explorers = {
  polkadot: utils.polkadotExplorerUrl(Chains.Polkadot),
};
