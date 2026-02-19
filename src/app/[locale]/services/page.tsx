import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServicesPageView } from "@/components/services/ServicesPageView";
import { isLocale, type Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n-server";
import { getClient } from "@/sanity/client";
import { buildServicesQuery } from "@/sanity/queries";
import { buildMetadata, serializeJsonLd, createOrganizationJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? locale : "en";
  const t = await getTranslation(validLocale);

  return buildMetadata({
    title: t("services.pageTitle"),
    description: t("services.pageDescription"),
    pathname: `/${validLocale}/services`
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const def = buildServicesQuery(locale);
  const services = await getClient().fetch(def.query, def.params);

  // Get translation for JSON-LD structured data
  const t = await getTranslation(locale);

  const jsonLd = createOrganizationJsonLd({
    name: t("services.jsonLdName"),
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
