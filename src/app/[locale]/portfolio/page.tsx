import type { Locale } from "@/lib/locale";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PortfolioGallery } from "@/components/site/PortfolioGallery";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import { buildSiteLabelsQuery } from "@/sanity/queries";

export default async function PortfolioPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const labels = isSanityConfigured() ? await sanityFetch(buildSiteLabelsQuery(locale)) : null;

  const translations = {
    filters: {
      all: labels?.portfolioPage?.allFilter ?? "",
      live: labels?.portfolioPage?.liveFilter ?? "",
      dj: labels?.portfolioPage?.djFilter ?? "",
      studio: labels?.portfolioPage?.studioFilter ?? ""
    },
    filtersLabel: labels?.portfolioPage?.filtersLabel ?? "",
    itemsCountLabel: labels?.portfolioPage?.itemsCountLabel ?? ""
  };

  return (
    <main data-testid="portfolio-page">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
              {labels?.portfolioPage?.title}
            </h1>
            <p className="max-w-2xl text-base text-gray-400">{labels?.portfolioPage?.subtitle}</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <PortfolioGallery locale={locale} translations={translations} />
        </Container>
      </Section>
    </main>
  );
}
