import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PressPageView } from "@/features/press/PressPageView";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { isSanityConfigured } from "@/sanity/config";
import { getClient } from "@/sanity/client";
import { buildPressEpkQuery, type PressEpkValue } from "@/sanity/queries";

type PressPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PressPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const title = validLocale === "es" ? "Prensa" : "Press";
  const description = validLocale === "es"
    ? "Kit de prensa y EP de Coast2Coast - fotos, biografía y recursos para medios."
    : "Coast2Coast press kit and EPK - photos, biography, and media resources.";
  return buildMetadata({
    title,
    description,
    pathname: "/press",
    locale: validLocale
  });
}

export default async function PressPage({ params }: PressPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  let data: PressEpkValue | null = null;
  if (isSanityConfigured()) {
    const def = buildPressEpkQuery(validLocale);
    try {
      data = await getClient().fetch(def.query, def.params);
    } catch {
      data = null;
    }
  }

  const pressPage = data?.pressPage ?? null;
  const pressMentions = data?.pressMentions ?? [];
  const siteSettings = data?.siteSettings ?? null;

  const bookingsEmail = pressPage?.bookingsEmail ?? siteSettings?.contactEmail;
  const bookingsPhone = pressPage?.bookingsPhone;

  return (
    <PressPageView
      locale={validLocale}
      title={pressPage?.title}
      bio={pressPage?.bio}
      pressPhotos={pressPage?.pressPhotos}
      pressKitAssets={pressPage?.pressKitAssets}
      techRider={pressPage?.techRider}
      stagePlot={pressPage?.stagePlot}
      pressMentions={pressMentions}
      bookings={{ email: bookingsEmail, phone: bookingsPhone }}
    />
  );
}
