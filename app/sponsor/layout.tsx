import TextPage from "@/components/layout/TextPage";

export default function SponsorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TextPage>{children}</TextPage>;
}
