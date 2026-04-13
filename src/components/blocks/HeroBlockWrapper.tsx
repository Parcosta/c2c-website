import type { Locale } from "@/lib/i18n";
import { loadTranslations, getTranslation } from "@/lib/server-i18n";
import { HeroBlockClient } from "./HeroBlockClient";

interface HeroBlockWrapperProps {
  locale: Locale;
  className?: string;
}

export async function HeroBlockWrapper({
  locale,
  className
}: HeroBlockWrapperProps) {
  const translations = await loadTranslations(locale);

  const heroTranslations = {
    tag1: getTranslation(translations, "home.hero.tag1"),
    tag2: getTranslation(translations, "home.hero.tag2"),
    title: getTranslation(translations, "home.hero.title"),
    description: getTranslation(translations, "home.hero.description"),
    ctaPrimary: getTranslation(translations, "home.hero.ctaPrimary"),
    ctaSecondary: getTranslation(translations, "home.hero.ctaSecondary"),
    audioPlaceholder: getTranslation(translations, "home.hero.audioPlaceholder"),
  };

  return (
    <HeroBlockClient
      locale={locale}
      translations={heroTranslations}
      className={className}
    />
  );
}
