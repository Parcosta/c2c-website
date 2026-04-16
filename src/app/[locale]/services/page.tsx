import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServicesPageView } from "@/components/services/ServicesPageView";
import { isLocale, type Locale } from "@/lib/i18n";
import { getClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/config";
import { buildServicesQuery } from "@/sanity/queries";
import { getSiteLabels } from "@/sanity/cache";
import { buildMetadata, serializeJsonLd, createOrganizationJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? locale : "en";
  const labels = await getSiteLabels(validLocale);

  return buildMetadata({
    title: labels?.servicesPage?.seoTitle ?? "",
    description: labels?.servicesPage?.seoDescription ?? "",
    pathname: `/${validLocale}/services`
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const servicesDef = buildServicesQuery(locale);
  const [services, labels] = isSanityConfigured()
    ? await Promise.all([
        getClient().fetch(servicesDef.query, servicesDef.params),
        getSiteLabels(locale)
      ])
    : [[], null];

  const jsonLd = createOrganizationJsonLd({
    name: labels?.servicesPage?.jsonLdName ?? "",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    sameAs: [
      "https://instagram.com/coast2c",
      "https://soundcloud.com/coast2c",
      "https://open.spotify.com/artist/coast2c"
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
            <ServicesPageView locale={locale} services={services} content={labels?.servicesPage} />
          </Container>
        </Section>
      </main>
    </>
  );
}
