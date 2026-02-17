import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AboutPageView } from "@/features/about/AboutPageView";
import { isLocale, type Locale } from "@/lib/i18n";
import { isSanityConfigured } from "@/sanity/config";
import { client } from "@/sanity/client";
import { getSanityImageUrl } from "@/sanity/image";
import { buildAboutPageQuery, type AboutPageValue } from "@/sanity/queries";

export default async function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  let data: AboutPageValue | null = null;
  if (isSanityConfigured()) {
    const def = buildAboutPageQuery(locale);
    try {
      data = await client.fetch(def.query, def.params);
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

