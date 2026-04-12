import type { Metadata } from "next";

import { HeroBlock } from "@/components/blocks/HeroBlock";
import { EventsBlockView } from "@/components/blocks/EventsBlock";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n-server";
import {
  buildMetadata,
  createMusicGroupJsonLd,
  createOrganizationJsonLd,
  createEventJsonLd,
  getSiteName
} from "@/lib/seo";
import { isSanityConfigured } from "@/sanity/config";
import { getClient } from "@/sanity/client";
import { buildUpcomingEventsQuery, type EventValue } from "@/sanity/queries";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

async function getHomeSeo(locale: Locale): Promise<{ title: string; description: string }> {
  const t = await getTranslation(locale);
  return {
    title: getSiteName(),
    description: t("home.metaDescription")
  };
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const seo = await getHomeSeo(validLocale);
  return buildMetadata({
    ...seo,
    pathname: "/",
    locale: validLocale
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const t = await getTranslation(validLocale);

  const org = createOrganizationJsonLd({ name: t("brand.full") });
  const group = createMusicGroupJsonLd({ name: `${t("brand.full")} (${t("brand.abbr")})` });

  // Fetch events from Sanity
  let events: EventValue[] = [];
  if (isSanityConfigured()) {
    const def = buildUpcomingEventsQuery(validLocale);
    events = await getClient()
      .fetch<EventValue[]>(def.query, def.params, {
        next: { revalidate: 60 }
      })
      .catch(() => []);
  }

  const nextEventName = (process.env.NEXT_PUBLIC_NEXT_EVENT_NAME ?? "").trim();
  const nextEventStartDate = (process.env.NEXT_PUBLIC_NEXT_EVENT_START_DATE ?? "").trim();
  const nextEventUrl = (process.env.NEXT_PUBLIC_NEXT_EVENT_URL ?? "").trim();
  const event =
    nextEventName && nextEventStartDate
      ? createEventJsonLd({
          name: nextEventName,
          startDate: nextEventStartDate,
          url: nextEventUrl || undefined,
          organizerName: t("brand.full")
        })
      : null;

  return (
    <main>
      <JsonLdScript data={event ? [org, group, event] : [org, group]} />
      <HeroBlock />
      <EventsBlockView events={events} locale={validLocale} />
    </main>
  );
}
