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

// Fallback content when Sanity is not configured
// These are static defaults - all content should come from Sanity CMS
const fallbackContent = {
  tag1: "Multimedia Artist from Mexico",
  tag2: "Modular Synthesis",
  title: "Live modular techno",
  description: "Coast2Coast (C2C) — bold sound, dark visuals, clean interface.",
  ctaPrimary: "Get in touch",
  ctaSecondary: "Portfolio",
  audioPlaceholder: "Track Name"
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

  // Map Sanity data to the content structure expected by HeroBlockClient
  // Uses Sanity data when available, falls back to static defaults
  const content = {
    tag1: fallbackContent.tag1,
    tag2: fallbackContent.tag2,
    title: page?.hero?.heading ?? fallbackContent.title,
    description: page?.hero?.subheading ?? fallbackContent.description,
    ctaPrimary: page?.hero?.cta?.label ?? fallbackContent.ctaPrimary,
    ctaSecondary: labels?.navigation?.portfolio ?? fallbackContent.ctaSecondary,
    audioPlaceholder: audioTitle ?? fallbackContent.audioPlaceholder
  };

  return (
    <HeroBlockClient
      locale={locale}
      translations={content}
      className={className}
      audioSrc={audioSrc}
    />
  );
}
