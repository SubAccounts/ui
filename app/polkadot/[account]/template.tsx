import Left from "@/components/layout/Left";

export default function PolkadotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Left>{children}</Left>;
}
