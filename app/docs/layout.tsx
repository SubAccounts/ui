import TextPage from "@/components/layout/TextPage";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TextPage>{children}</TextPage>;
}
