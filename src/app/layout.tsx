import type { Metadata } from "next";
import { headers } from "next/headers";
import type { CSSProperties, ReactNode } from "react";

import { getSiteName, getSiteUrl } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: getSiteName(),
    template: `%s | ${getSiteName()}`
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerStore = await headers();
  const locale = headerStore.get("x-locale") ?? "en";

  return (
    <html lang={locale} className="dark">
      <body
        className="antialiased bg-slate-950 text-slate-50"
        style={
          {
            "--font-inter": "Inter",
            "--font-dm-sans": "DM Sans"
          } as CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
