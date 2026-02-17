import type { Locale } from "@/lib/i18n";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PortfolioGallery } from "@/components/site/PortfolioGallery";
import { getTranslation } from "@/lib/i18n-server";

export default async function PortfolioPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslation(locale);

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
          <PortfolioGallery locale={locale} translations={translations} />
        </Container>
      </Section>
    </main>
  );
}
