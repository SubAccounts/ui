import { Web3OnboardProvider } from "@/utils/web3-onboard/Web3Onboard.provider";

export default function PolkadotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Web3OnboardProvider>{children}</Web3OnboardProvider>;
}
