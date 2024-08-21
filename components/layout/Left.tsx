export default function Left({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-start justify-start gap-4 py-2 md:py-0">
      {children}
    </section>
  );
}
