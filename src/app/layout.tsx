import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { getSiteName, getSiteUrl } from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: getSiteName(),
    template: `%s | ${getSiteName()}`
  },
  description: "Live modular techno & DJ. Music, shows, and releases by Coast2Coast (C2C)."
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Root layout doesn't set lang attribute - that's done in [locale]/layout
  // This allows the middleware to redirect to the appropriate locale
  return (
    <html className="dark">
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased bg-slate-950 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
