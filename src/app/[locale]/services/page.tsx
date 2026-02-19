import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServicesPageView } from "@/components/services/ServicesPageView";
import { isLocale, type Locale } from "@/lib/i18n";
import { getClient } from "@/sanity/client";
import { buildServicesQuery } from "@/sanity/queries";
import { buildMetadata, serializeJsonLd, createOrganizationJsonLd } from "@/lib/seo";

// Import translation files directly for server-side metadata generation
import enTranslations from "../../../../public/locales/en/translation.json";
import esTranslations from "../../../../public/locales/es/translation.json";

const translations = {
  en: enTranslations,
  es: esTranslations
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? locale : "en";
  const t = translations[validLocale].services;

  return buildMetadata({
    title: t.pageTitle,
    description: t.pageDescription,
    pathname: `/${validLocale}/services`
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const def = buildServicesQuery(locale);
  const services = await getClient().fetch(def.query, def.params);

  // Get translation for JSON-LD name
  const t = translations[locale].services;

  // JSON-LD structured data for services
  const jsonLd = createOrganizationJsonLd({
    name: t.jsonLdName,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    sameAs: [
      "https://instagram.com/coast2coast",
      "https://soundcloud.com/coast2coast",
      "https://open.spotify.com/artist/coast2coast"
    ]
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <main>
        <Section>
          <Container>
            <ServicesPageView locale={locale} services={services} />
          </Container>
        </Section>
      </main>
    </>
  );
}
