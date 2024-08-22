import { title } from "@/components/primitives";
import { HomeButton } from "@/components/layout/HomeButton";

export default function DocsPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className={title({ size: "lg" })}>Docs</h1>
      <p>Documentation will be here. Not now, but very soon.</p>
      <p>
        <HomeButton />
      </p>
    </div>
  );
}
