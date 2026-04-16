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

  const heroTranslations = {
    brand: labels?.brand ?? "Coast2Coast",
    heroTitle: page?.hero?.heading ?? "Live modular techno",
    heroSubtitle: page?.hero?.subheading ?? "",
    heroCtaPrimary: page?.hero?.cta?.label ?? "",
    heroCtaSecondary: labels?.navigation?.portfolio ?? "Portfolio"
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
