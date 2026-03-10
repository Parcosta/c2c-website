import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PortfolioGallery } from "@/components/site/PortfolioGallery";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";
import { getClient } from "@/sanity/client";
import { buildPortfolioItemsQuery } from "@/sanity/queries";

type PortfolioPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const title = validLocale === "es" ? "Portafolio" : "Portfolio";
  const description = validLocale === "es"
    ? "Explora el trabajo de Coast2Coast - sets de techno modular en vivo y DJ."
    : "Explore Coast2Coast's work - live modular techno sets and DJ performances.";
  return buildMetadata({
    title,
    description,
    pathname: "/portfolio",
    locale: validLocale
  });
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const t = await getTranslation(validLocale);

  const def = buildPortfolioItemsQuery(validLocale);
  const portfolioItems = await getClient().fetch(def.query, def.params);

  const translations = {
    filters: {
      all: t("portfolio.filters.all"),
      live: t("portfolio.filters.live"),
      dj: t("portfolio.filters.dj"),
      studio: t("portfolio.filters.studio")
    }
  };

  return (
    <main data-testid="portfolio-page">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
              {t("portfolio.title")}
            </h1>
            <p className="max-w-2xl text-base text-gray-400">{t("portfolio.subtitle")}</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <PortfolioGallery locale={validLocale} translations={translations} items={portfolioItems} />
        </Container>
      </Section>
    </main>
  );
}
