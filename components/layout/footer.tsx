"use client";

import React from "react";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";

type FooterProps = {
  //
};

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full hidden md:flex items-center justify-center py-3 gap-4">
      {siteConfig.footerItems.map((link) => (
        <Link
          key={link.href}
          className="flex items-center gap-1 text-current"
          href={link.href}
          isExternal={link.href.startsWith("http")}
          title={link.label}
        >
          {link.label}
        </Link>
      ))}
    </footer>
  );
};
