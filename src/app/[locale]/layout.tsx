import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n-server";
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

  // Preload translations on the server
  const t = await getTranslation(locale as Locale);
  const translations = {
    brand: t("brand"),
    "nav.home": t("nav.home"),
    "nav.portfolio": t("nav.portfolio"),
    "nav.services": t("nav.services"),
    "nav.press": t("nav.press"),
    "nav.about": t("nav.about"),
    "nav.contact": t("nav.contact"),
    "home.heroTitle": t("home.heroTitle"),
    "home.heroSubtitle": t("home.heroSubtitle"),
    "home.heroCtaPrimary": t("home.heroCtaPrimary"),
    "home.heroCtaSecondary": t("home.heroCtaSecondary"),
    "footer.contact": t("footer.contact"),
    "footer.language": t("footer.language"),
    "footer.follow": t("footer.follow"),
    "footer.rights": t("footer.rights")
  };

  return (
    <I18nProvider locale={locale} initialTranslations={translations}>
      <div className="min-h-dvh">
        <SiteHeaderWrapper locale={locale} />
        {children}
        <FooterWrapper locale={locale} />
      </div>
    </I18nProvider>
  );
}
