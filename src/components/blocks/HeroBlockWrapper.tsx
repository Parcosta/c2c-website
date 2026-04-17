import type { Locale } from "@/lib/i18n";
import { getClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/config";
import { buildHomepageQuery, buildSiteLabelsQuery } from "@/sanity/queries";
import { HeroBlock } from "./HeroBlock";

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

  const heroContent = {
    brand: labels?.brand ?? "Coast2Coast",
    heroTitle: page?.hero?.heading ?? "Live modular techno",
    heroSubtitle: page?.hero?.subheading ?? "",
    heroCtaPrimary: page?.hero?.cta?.label ?? "Get in touch",
    heroCtaSecondary: labels?.navigation?.portfolio ?? "Portfolio",
    // These fields would need to be added to Sanity schema for full two-column support
    tag1: undefined,
    tag2: undefined,
    audioPlaceholder: "Track Name"
  };

  return (
    <HeroBlock
      locale={locale}
      content={heroContent}
      className={className}
      audioSrc={audioSrc}
      audioTitle={audioTitle}
    />
  );
}
