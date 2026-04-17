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

  // Map Sanity data to the translation structure expected by HeroBlockClient
  // Fallback values ensure the component works even without Sanity configured
  const translations = {
    tag1: "Multimedia Artist from Mexico",
    tag2: "Modular Synthesis",
    title: page?.hero?.heading ?? "Live modular techno",
    description:
      page?.hero?.subheading ?? "Coast2Coast (C2C) — bold sound, dark visuals, clean interface.",
    ctaPrimary: page?.hero?.cta?.label ?? "Get in touch",
    ctaSecondary: labels?.navigation?.portfolio ?? "Portfolio",
    audioPlaceholder: audioTitle ?? "Track Name"
  };

  return <HeroBlockClient locale={locale} translations={translations} className={className} />;
}
