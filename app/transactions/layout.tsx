import TextPage from "@/components/layout/TextPage";
import { Web3OnboardProvider } from "@/utils/web3-onboard/Web3Onboard.provider";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TextPage>
      <Web3OnboardProvider>{children}</Web3OnboardProvider>
    </TextPage>
  );
}
