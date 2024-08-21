import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Stake to&nbsp;</h1>
          <h1 className={title({ color: "pink" })}>POLKADOT&nbsp;</h1>
          <br />
          <h1 className={title()}>right here and right now</h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Ethereum wallet - all what you need
          </h2>
        </div>

        <div className="flex gap-2">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/polkadot"
          >
            Stake now
          </Link>
        </div>

        {/*<div className="flex gap-3">*/}
        {/*  <Link*/}
        {/*    isExternal*/}
        {/*    className={buttonStyles({*/}
        {/*      color: "primary",*/}
        {/*      radius: "full",*/}
        {/*      variant: "shadow",*/}
        {/*    })}*/}
        {/*    href={siteConfig.links.docs}*/}
        {/*  >*/}
        {/*    Documentation*/}
        {/*  </Link>*/}
        {/*  <Link*/}
        {/*    isExternal*/}
        {/*    className={buttonStyles({ variant: "bordered", radius: "full" })}*/}
        {/*    href={siteConfig.links.github}*/}
        {/*  >*/}
        {/*    <GithubIcon size={20} />*/}
        {/*    GitHub*/}
        {/*  </Link>*/}
        {/*</div>*/}

        {/*<div className="mt-8">*/}
        {/*  <Snippet hideCopyButton hideSymbol variant="bordered">*/}
        {/*    <span>*/}
        {/*      Get started by editing <Code color="primary">app/page.tsx</Code>*/}
        {/*    </span>*/}
        {/*  </Snippet>*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
