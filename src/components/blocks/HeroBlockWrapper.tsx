import type { Locale } from "@/lib/i18n";
import { loadTranslations, getTranslation } from "@/lib/server-i18n";
import { HeroBlockClient } from "./HeroBlockClient";

interface HeroBlockWrapperProps {
  locale: Locale;
  className?: string;
  audioSrc?: string;
  audioTitle?: string;
}

export async function HeroBlockWrapper({
  locale,
  className,
  audioSrc,
  audioTitle
}: HeroBlockWrapperProps) {
  const translations = await loadTranslations(locale);

  const heroTranslations = {
    brand: getTranslation(translations, "brand"),
    heroTitle: getTranslation(translations, "home.heroTitle"),
    heroSubtitle: getTranslation(translations, "home.heroSubtitle"),
    heroCtaPrimary: getTranslation(translations, "home.heroCtaPrimary"),
    heroCtaSecondary: getTranslation(translations, "home.heroCtaSecondary")
  };

  return (
    <HeroBlockClient
      locale={locale}
      translations={heroTranslations}
      className={className}
      audioSrc={audioSrc}
      audioTitle={audioTitle}
    />
  );
}
