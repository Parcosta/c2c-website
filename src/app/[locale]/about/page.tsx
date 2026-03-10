import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AboutPageView } from "@/features/about/AboutPageView";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { isSanityConfigured } from "@/sanity/config";
import { client } from "@/sanity/client";
import { getSanityImageUrl } from "@/sanity/image";
import { buildAboutPageQuery, type AboutPageValue } from "@/sanity/queries";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const title = validLocale === "es" ? "Sobre mí" : "About";
  const description = validLocale === "es" 
    ? "Conoce más sobre Coast2Coast - artista de techno modular en vivo."
    : "Learn more about Coast2Coast - live modular techno artist.";
  return buildMetadata({
    title,
    description,
    pathname: "/about",
    locale: validLocale
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  let data: AboutPageValue | null = null;
  if (isSanityConfigured()) {
    const def = buildAboutPageQuery(validLocale);
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
            locale={validLocale}
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
