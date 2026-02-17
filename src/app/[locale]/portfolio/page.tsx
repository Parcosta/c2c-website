import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PortfolioGallery } from "@/components/site/PortfolioGallery";

export default async function PortfolioPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);

  return (
    <main data-testid="portfolio-page">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              {copy.portfolio.title}
            </h1>
            <p className="max-w-2xl text-base text-slate-300">{copy.portfolio.subtitle}</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <PortfolioGallery locale={locale} />
        </Container>
      </Section>
    </main>
  );
}
