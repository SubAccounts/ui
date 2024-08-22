import { Chains } from "@/config/chains";

type Link = {
  label: string;
  href: string;
};

const externalLinks = {
  github: "https://github.com/SubAccounts",
  twitter: "https://twitter.com/",
  docs: "https://sub-accounts.org/docs",
  discord: null,
  sponsor: "/sponsor",
  ronin: "https://t.me/blockchain_ronin",
  support: "0x3877fbDe425d21f29F4cB3e739Cf75CDECf8EdCE",
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
    label: "Home",
    href: "/",
  },
  {
    label: "Polkadot",
    href: `/${Chains.Polkadot}`,
  },
  ...footerItems,
];

export const siteConfig: SiteConfig = {
  name: "SubAccounts - smart accounts for each blockchain.",
  description:
    "SubAccounts enables secure Polkadot staking using Ethereum wallets. Effortlessly manage encrypted SubAccounts, cross-chain integrations, and staking operations through a user-friendly interface.\n",
  navItems,
  footerItems,
  mobileItems,
  links: externalLinks,
};
