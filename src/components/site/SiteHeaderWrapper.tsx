import type { Locale } from "@/lib/i18n";
import { loadTranslations, getTranslation } from "@/lib/server-i18n";
import { SiteHeaderClient } from "./SiteHeaderClient";

interface SiteHeaderWrapperProps {
  locale: Locale;
}

export async function SiteHeaderWrapper({ locale }: SiteHeaderWrapperProps) {
  const translations = await loadTranslations(locale);

  // Extract the specific translations needed for the header
  const navTranslations = {
    brand: getTranslation(translations, "brand"),
    navHome: getTranslation(translations, "nav.home"),
    navPortfolio: getTranslation(translations, "nav.portfolio"),
    navServices: getTranslation(translations, "nav.services"),
    navPress: getTranslation(translations, "nav.press"),
    navAbout: getTranslation(translations, "nav.about"),
    navContact: getTranslation(translations, "nav.contact"),
    navMobileMenu: getTranslation(translations, "nav.mobileMenu"),
    navClose: getTranslation(translations, "nav.close"),
    languageSwitchToEnglish: getTranslation(translations, "language.switchToEnglish"),
    languageSwitchToSpanish: getTranslation(translations, "language.switchToSpanish")
  };

  return <SiteHeaderClient locale={locale} translations={navTranslations} />;
}
