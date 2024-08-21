import { Chains } from "@/config/chains";

type Link = {
  label: string;
  href: string;
};

const externalLinks = {
  github: "https://github.com/nextui-org/nextui",
  twitter: "https://twitter.com/getnextui",
  docs: "https://nextui.org",
  discord: "https://discord.gg/9b6yyZKmH4",
  sponsor: "https://patreon.com/jrgarciadev",
};

export type SiteConfig = {
  name: string;
  description: string;
  navItems: Link[];
  footerItems: Link[];
  mobileItems: Link[];
  links: typeof externalLinks;
};

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Polkadot",
    href: `/${Chains.Polkadot}`,
  },
];

const footerItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "White paper",
    href: "/white_paper",
  },
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const mobileItems = [
  {
    label: "Polkadot",
    href: `/${Chains.Polkadot}`,
  },
  ...footerItems,
];

export const siteConfig: SiteConfig = {
  name: "SubAccounts - we are awesome",
  description: "Make beautiful websites regardless of your design experience.",
  navItems,
  footerItems,
  mobileItems,
  links: externalLinks,
};
