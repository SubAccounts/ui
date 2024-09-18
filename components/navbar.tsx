"use client";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useStore } from "@nanostores/react";
import { usePathname } from "next/dist/client/components/navigation";
import React from "react";
import { abbreviateAddress } from "common-crypto-tools";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  DiscordIcon,
  GithubIcon,
  HeartFilledIcon,
  Logo,
  TwitterIcon,
} from "@/components/icons";
import { navbarStore, toggleNavBar } from "@/stores/layout/navbar";
import {
  accountAddress,
  accountBalance,
  accountEthBalance,
} from "@/stores/erc20Store";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useToggleHandler } from "@/hooks/useToggleHandler";
export const Navbar = () => {
  const pathname = usePathname();
  const $navbarStore = useStore(navbarStore);
  const $accountAddress = useStore(accountAddress);
  const $accountBalance = useStore(accountBalance);
  const $accountEthBalance = useStore(accountEthBalance);

  const [accountDropdown, toggleAccountDropdown] = useToggleHandler(false);

  React.useEffect(() => {
    toggleNavBar(false);
  }, [pathname]);

  return (
    <NextUINavbar
      isBordered
      isMenuOpen={$navbarStore.isOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={toggleNavBar}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-4 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">SubAccounts</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({
                    color:
                      item.href === "/polkadot" ? "secondary" : "foreground",
                    underline: pathname === item.href ? "always" : "none",
                  }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          {siteConfig.links.discord && (
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.discord}
            >
              <DiscordIcon className="text-default-500" />
            </Link>
          )}

          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor and Support
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {$accountAddress ? (
            <div className="relative">
              <Button
                aria-expanded="true"
                aria-haspopup="true"
                className="text-sm font-normal text-white dark:text-default-600 dark:bg-green-950 bg-green-700"
                id="menu-button"
                variant="flat"
                onClick={toggleAccountDropdown()}
              >
                {abbreviateAddress($accountAddress, 4)}
              </Button>
              {accountDropdown && (
                <div
                  aria-labelledby="menu-button"
                  aria-orientation="vertical"
                  className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md
                  bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                >
                  <div className="py-1" role="none">
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100"
                      href="#"
                      id="menu-item-0"
                      role="menuitem"
                    >
                      Account settings
                    </Link>
                    <span className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100">
                      {$accountBalance} USDC
                    </span>
                    <span className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100">
                      {$accountEthBalance} ETH
                    </span>

                    <span className="divide-divider" />
                    <span className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 cursor-pointer">
                      Logout
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ConnectWalletButton />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <Link aria-label="Sponsor" href={siteConfig.links.sponsor}>
          <HeartFilledIcon className="text-danger" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.mobileItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink
                className={clsx(
                  linkStyles({
                    color:
                      item.href === "/polkadot" ? "secondary" : "foreground",
                    underline: pathname === item.href ? "always" : "none",
                  }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
