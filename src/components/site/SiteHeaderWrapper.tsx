import type { Locale } from "@/lib/locale";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import { buildSiteLabelsQuery } from "@/sanity/queries";
import { SiteHeaderClient } from "./SiteHeaderClient";

interface SiteHeaderWrapperProps {
  locale: Locale;
}

export async function SiteHeaderWrapper({ locale }: SiteHeaderWrapperProps) {
  const labels = isSanityConfigured() ? await sanityFetch(buildSiteLabelsQuery(locale)) : null;
  const navTranslations = {
    brand: labels?.brand ?? "",
    navHome: labels?.navigation?.home ?? "",
    navPortfolio: labels?.navigation?.portfolio ?? "",
    navServices: labels?.navigation?.services ?? "",
    navPress: labels?.navigation?.press ?? "",
    navAbout: labels?.navigation?.about ?? "",
    navContact: labels?.navigation?.contact ?? "",
    navMobileMenu: labels?.navigation?.mobileMenu ?? "",
    navClose: labels?.navigation?.close ?? "",
    primaryAriaLabel: labels?.navigation?.primaryAriaLabel ?? "",
    mobileAriaLabel: labels?.navigation?.mobileAriaLabel ?? "",
    languageSwitchToEnglish: labels?.language?.switchToEnglish ?? "",
    languageSwitchToSpanish: labels?.language?.switchToSpanish ?? ""
  };

  return <SiteHeaderClient locale={locale} translations={navTranslations} />;
}
