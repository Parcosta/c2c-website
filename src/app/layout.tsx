import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Sans, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { defaultLocale, isLocale, type Locale } from "@/lib/locale";
import { getSiteName, getSiteUrl } from "@/lib/seo";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import { buildSiteLabelsQuery } from "@/sanity/queries";

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

async function getRootDescription(locale: Locale): Promise<string> {
  if (!isSanityConfigured()) return "";
  const labels = await sanityFetch(buildSiteLabelsQuery(locale));
  // The rootDescription lives on siteLabels.footer.tagline for now — it is
  // the one-line positioning statement shared across meta/og/social cards.
  return labels?.footer?.tagline ?? "";
}

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-locale");
  const locale: Locale = headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale;
  const description = await getRootDescription(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: getSiteName(),
      template: `%s | ${getSiteName()}`
    },
    description
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerStore = await headers();
  const locale = headerStore.get("x-locale") ?? defaultLocale;

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.variable} ${dmSans.variable} antialiased bg-black text-gray-50`}>
        {children}
      </body>
    </html>
  );
}
