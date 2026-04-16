import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AboutPageView } from "@/features/about/AboutPageView";
import { isLocale, type Locale } from "@/lib/i18n";
import { isSanityConfigured } from "@/sanity/config";
import { client } from "@/sanity/client";
import { getSanityImageUrl } from "@/sanity/image";
import { buildAboutPageQuery, buildSiteLabelsQuery, type AboutPageValue } from "@/sanity/queries";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  let data: AboutPageValue | null = null;
  let labels = null;
  if (isSanityConfigured()) {
    const def = buildAboutPageQuery(locale);
    const labelsDef = buildSiteLabelsQuery(locale);
    try {
      [data, labels] = await Promise.all([
        client.fetch(def.query, def.params),
        client.fetch(labelsDef.query, labelsDef.params)
      ]);
    } catch {
      data = null;
    }
  }

  const photoUrl = getSanityImageUrl(data?.photo, { width: 1200 });

  return (
    <main>
      <Section>
        <Container>
          <AboutPageView
            locale={locale}
            content={labels?.aboutPage}
            title={data?.title}
            intro={data?.intro}
            photoUrl={photoUrl}
            photoAlt={data?.photoAlt}
            bio={data?.bio}
            releases={data?.releases}
            equipmentGroups={data?.equipmentGroups}
            influences={data?.influences}
          />
        </Container>
      </Section>
    </main>
  );
}
