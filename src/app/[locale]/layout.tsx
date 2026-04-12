import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale, locales } from "@/lib/i18n";
import { SiteHeaderWrapper } from "@/components/site/SiteHeaderWrapper";
import { FooterWrapper } from "@/components/site/FooterWrapper";
import { I18nProvider } from "@/components/providers/I18nProvider";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <I18nProvider locale={locale}>
      <div className="min-h-dvh">
        <SiteHeaderWrapper locale={locale} />
        {children}
        <FooterWrapper locale={locale} />
      </div>
    </I18nProvider>
  );
}
