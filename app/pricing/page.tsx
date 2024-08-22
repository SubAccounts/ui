import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import { HomeButton } from "@/components/layout/HomeButton";
import { siteConfig } from "@/config/site";

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className={title({ size: "lg" })}>Pricing</h1>
      <p>
        At this stage, we haven{"'"}t yet figured out the best way to monetize
        our project, so for now, it will remain completely free for users.
        However, please note that bridge providers may charge fees for using
        their services, and this is currently an unavoidable aspect of the
        project.
      </p>
      <p>
        If you would like to support our development efforts, please visit our{" "}
        <Link href={siteConfig.links.sponsor}>Sponsor</Link> page. Your
        contributions help us keep SubAccounts free and accessible to everyone.
      </p>
      <p>
        <HomeButton />
      </p>
    </div>
  );
}
