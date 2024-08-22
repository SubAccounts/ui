import TextPage from "@/components/layout/TextPage";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TextPage>{children}</TextPage>;
}
