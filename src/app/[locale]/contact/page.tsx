import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const title = validLocale === "es" ? "Contacto" : "Contact";
  const description =
    validLocale === "es"
      ? "Contacta a Coast2Coast para bookings y consultas."
      : "Contact Coast2Coast for bookings and inquiries.";
  return buildMetadata({
    title,
    description,
    pathname: "/contact",
    locale: validLocale
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const t = await getTranslation(validLocale);

  return (
    <main data-testid="contact-page">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
              {t("contact.title")}
            </h1>
            <p className="max-w-2xl text-base text-gray-400">{t("contact.subtitle")}</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="max-w-xl">
            <ContactForm locale={validLocale} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
