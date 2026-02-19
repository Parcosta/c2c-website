import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServicesPageView } from "@/components/services/ServicesPageView";
import { isLocale, type Locale } from "@/lib/i18n";
import { getClient } from "@/sanity/client";
import { buildServicesQuery } from "@/sanity/queries";
import { buildMetadata, serializeJsonLd, createOrganizationJsonLd } from "@/lib/seo";

function getServicesSeo(locale: Locale): { title: string; description: string } {
  switch (locale) {
    case "es":
      return {
        title: "Servicios | Techno en Vivo, DJ & Producción Musical | Coast2Coast",
        description:
          "Servicios profesionales de música electrónica: performances de techno modular en vivo, sets de DJ, diseño de sonido para cine y comerciales, clases de Ableton Live, talleres de síntesis modular, consultoría de estudio y colaboraciones artísticas."
      };
    case "en":
    default:
      return {
        title: "Services | Live Techno, DJ & Music Production | Coast2Coast",
        description:
          "Professional electronic music services: live hardware techno performances, DJ sets, sound design for film & commercials, Ableton Live lessons, modular synthesis workshops, studio consultation, and artistic collaborations."
      };
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? locale : "en";
  const seo = getServicesSeo(validLocale);
  return buildMetadata({
    ...seo,
    pathname: `/${validLocale}/services`
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const def = buildServicesQuery(locale);
  const services = await getClient().fetch(def.query, def.params);

  // JSON-LD structured data for services
  const jsonLd = createOrganizationJsonLd({
    name: "Coast2Coast",
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
