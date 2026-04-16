import type { Locale } from "@/lib/i18n";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { getClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/config";
import { buildSiteLabelsQuery } from "@/sanity/queries";

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const def = buildSiteLabelsQuery(locale);
  const labels = isSanityConfigured() ? await getClient().fetch(def.query, def.params) : null;

  return (
    <main data-testid="contact-page">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
              {labels?.contactPage?.title}
            </h1>
            <p className="max-w-2xl text-base text-gray-400">{labels?.contactPage?.subtitle}</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="max-w-xl">
            <ContactForm locale={locale} content={labels?.contactPage?.form} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
