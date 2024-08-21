export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="inline-block w-full text-left justify-center">
        {children}
      </div>
    </div>
  );
}
