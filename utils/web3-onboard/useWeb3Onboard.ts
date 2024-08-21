import { useContext } from "react";

import {
  IWeb3OnboardProviderContext,
  Web3OnboardProviderContext,
} from "@/utils/web3-onboard/Web3Onboard.provider";

export function useWeb3Onboard(): IWeb3OnboardProviderContext {
  return useContext(Web3OnboardProviderContext);
}
