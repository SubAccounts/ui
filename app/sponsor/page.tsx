import { Link } from "@nextui-org/link";
import { addHTMLBreaksToAddress } from "common-crypto-tools/common/index";

import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { HomeButton } from "@/components/layout/HomeButton";

export default function WhitePaperPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className={title({ size: "lg" })}>Sponsor SubAccounts</h1>
      <h2 className={title({ size: "md" })}>How to sponsor</h2>
      <p>
        At the moment, there is no monetization in place for the SubAccounts
        project, so we heavily rely on the support of sponsors to keep the
        development going. If you believe in our vision and want to help us
        grow, you can contribute by sending funds to the following address:{" "}
        <b
          dangerouslySetInnerHTML={{
            __html: addHTMLBreaksToAddress(siteConfig.links.support),
          }}
        />
        . Every contribution is highly appreciated and directly supports the
        development and maintenance of the project.
      </p>
      <h2 className={title({ size: "md" })}>How to support</h2>
      <p>
        SubAccounts is a fully open-source project, and we welcome all kinds of
        contributions from the community. Whether it’s code, documentation,
        testing, or even just sharing feedback, your help is invaluable. You can
        get involved by contributing to our{" "}
        <Link isExternal href={siteConfig.links.github}>
          GitHub
        </Link>{" "}
        repositories or by suggesting ideas that can make SubAccounts better for
        everyone.
      </p>
      <h2 className={title({ size: "md" })}>Join Us</h2>
      <p>
        We are always looking for like-minded people to join us on this journey.
        Connect with us and be part of the community!
        <ul className="list-disc ml-4">
          <li>
            <b>Creator: </b>
            <Link isExternal href={siteConfig.links.ronin}>
              @blockchain_ronin
            </Link>
          </li>
          <li>
            <b>GitHub: </b>
            <Link isExternal href={siteConfig.links.github}>
              SubAccounts
            </Link>
          </li>
        </ul>
      </p>
      <p>
        <HomeButton />
      </p>
    </div>
  );
}
