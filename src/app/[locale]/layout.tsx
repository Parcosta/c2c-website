import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const siteUrl = getSiteUrl();
  
  // Build hreflang alternates for all locales
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = `${siteUrl}/${loc}`;
  });
  
  return {
    alternates: {
      canonical: `${siteUrl}/${validLocale}`,
      languages,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  return (
    <div className="min-h-dvh" lang={validLocale}>
      <SiteHeader locale={validLocale} />
      {children}
      <Footer locale={validLocale} />
    </div>
  );
}
