import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServicesPageView } from "@/components/services/ServicesPageView";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getClient } from "@/sanity/client";
import { buildServicesQuery } from "@/sanity/queries";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const title = validLocale === "es" ? "Servicios" : "Services";
  const description = validLocale === "es"
    ? "Servicios de Coast2Coast - booking para eventos, producción y más."
    : "Coast2Coast services - event booking, production, and more.";
  return buildMetadata({
    title,
    description,
    pathname: "/services",
    locale: validLocale
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  const def = buildServicesQuery(validLocale);
  const services = await getClient().fetch(def.query, def.params);

  return (
    <main>
      <Section>
        <Container>
          <ServicesPageView locale={validLocale} services={services} />
        </Container>
      </Section>
    </main>
  );
}
