import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const copy = getCopy(params.locale);

  return (
    <main>
      <Section className="pt-10 md:pt-14" data-testid="home-hero">
        <Container>
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-wide text-slate-300">{copy.brand}</p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                {copy.home.heroTitle}
              </h1>
              <p className="max-w-2xl text-base text-slate-300">{copy.home.heroSubtitle}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${params.locale}/portfolio`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                data-testid="hero-cta-portfolio"
              >
                {copy.home.sections.portfolio.cta}
              </Link>
              <Link
                href={`/${params.locale}/contact`}
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-800 px-4 text-sm font-medium text-slate-100 hover:bg-slate-900"
                data-testid="hero-cta-contact"
              >
                {copy.home.sections.contact.cta}
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="about" data-testid="home-about">
        <Container>
          <div className="max-w-3xl space-y-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{copy.home.sections.about.title}</h2>
            <p className="text-slate-300">{copy.home.sections.about.body}</p>
          </div>
        </Container>
      </Section>

      <Section id="music" data-testid="home-music">
        <Container>
          <div className="max-w-3xl space-y-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{copy.home.sections.music.title}</h2>
            <p className="text-slate-300">{copy.home.sections.music.body}</p>
          </div>
        </Container>
      </Section>

      <Section id="shows" data-testid="home-shows">
        <Container>
          <div className="max-w-3xl space-y-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{copy.home.sections.shows.title}</h2>
            <p className="text-slate-300">{copy.home.sections.shows.body}</p>
          </div>
        </Container>
      </Section>

      <Section id="portfolio" data-testid="home-portfolio">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold tracking-tight">{copy.home.sections.portfolio.title}</h2>
              <p className="text-slate-300">{copy.home.sections.portfolio.body}</p>
            </div>
            <div className="md:justify-self-end">
              <Link
                href={`/${params.locale}/portfolio`}
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-800 px-4 text-sm font-medium text-slate-100 hover:bg-slate-900"
                data-testid="home-portfolio-cta"
              >
                {copy.home.sections.portfolio.cta}
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="contact" data-testid="home-contact">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold tracking-tight">{copy.home.sections.contact.title}</h2>
              <p className="text-slate-300">{copy.home.sections.contact.body}</p>
            </div>
            <div className="md:justify-self-end">
              <Link
                href={`/${params.locale}/contact`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                data-testid="home-contact-cta"
              >
                {copy.home.sections.contact.cta}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

