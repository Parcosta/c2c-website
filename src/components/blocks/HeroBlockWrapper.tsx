import type { Locale } from "@/lib/i18n";
import { getClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/config";
import { buildHomepageQuery, buildSiteLabelsQuery } from "@/sanity/queries";
import { HeroBlockClient } from "./HeroBlockClient";

interface HeroBlockWrapperProps {
  locale: Locale;
  className?: string;
  audioSrc?: string;
  audioTitle?: string;
}

// Locale-aware fallback content for when Sanity is not configured
const fallbackContent: Record<
  Locale,
  {
    tag1: string;
    tag2: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    audioPlaceholder: string;
  }
> = {
  en: {
    tag1: "Multimedia Artist from Mexico",
    tag2: "Modular Synthesis",
    title: "Live modular techno",
    description: "Coast2Coast (C2C) — bold sound, dark visuals, clean interface.",
    ctaPrimary: "Get in touch",
    ctaSecondary: "Portfolio",
    audioPlaceholder: "Track Name"
  },
  es: {
    tag1: "Artista Multimedia de México",
    tag2: "Síntesis Modular",
    title: "Techno modular en vivo",
    description: "Coast2Coast (C2C) — sonido audaz, visuales oscuros, interfaz limpia.",
    ctaPrimary: "Contactar",
    ctaSecondary: "Portafolio",
    audioPlaceholder: "Nombre de Pista"
  }
};

export async function HeroBlockWrapper({
  locale,
  className,
  audioSrc,
  audioTitle
}: HeroBlockWrapperProps) {
  const pageDef = buildHomepageQuery(locale);
  const labelsDef = buildSiteLabelsQuery(locale);
  const [page, labels] = isSanityConfigured()
    ? await Promise.all([
        getClient().fetch(pageDef.query, pageDef.params),
        getClient().fetch(labelsDef.query, labelsDef.params)
      ])
    : [null, null];

  // Get locale-aware fallbacks
  const fallback = fallbackContent[locale] ?? fallbackContent.en;

  // Map Sanity data to the translation structure expected by HeroBlockClient
  // Uses Sanity data when available, falls back to locale-aware defaults
  const translations = {
    tag1: fallback.tag1,
    tag2: fallback.tag2,
    title: page?.hero?.heading ?? fallback.title,
    description: page?.hero?.subheading ?? fallback.description,
    ctaPrimary: page?.hero?.cta?.label ?? fallback.ctaPrimary,
    ctaSecondary: labels?.navigation?.portfolio ?? fallback.ctaSecondary,
    audioPlaceholder: audioTitle ?? fallback.audioPlaceholder
  };

  return (
    <HeroBlockClient
      locale={locale}
      translations={translations}
      className={className}
      audioSrc={audioSrc}
    />
  );
}
