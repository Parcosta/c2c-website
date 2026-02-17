import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServicesPageView } from "@/components/services/ServicesPageView";
import { isLocale } from "@/lib/i18n";
import { client } from "@/sanity/client";
import { buildServicesQuery } from "@/sanity/queries";

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const def = buildServicesQuery(params.locale);
  const services = await client.fetch(def.query, def.params);

  return (
    <main>
      <Section>
        <Container>
          <ServicesPageView locale={params.locale} services={services} />
        </Container>
      </Section>
    </main>
  );
}

