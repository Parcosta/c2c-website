import type { Metadata } from "next";

import { HeroBlock } from "@/components/blocks/HeroBlock";
import { EventsBlock } from "@/components/blocks/EventsBlock";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { type Locale } from "@/lib/i18n";
import {
  buildMetadata,
  createMusicGroupJsonLd,
  createOrganizationJsonLd,
  createEventJsonLd,
  getSiteName
} from "@/lib/seo";

function getHomeSeo(locale: Locale): { title: string; description: string } {
  switch (locale) {
    case "es":
      return {
        title: getSiteName(),
        description: "Live modular techno y DJ. Música, shows y lanzamientos de Coast2Coast (C2C)."
      };
    case "en":
    default:
      return {
        title: getSiteName(),
        description: "Live modular techno & DJ. Music, shows, and releases by Coast2Coast (C2C)."
      };
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = getHomeSeo(locale);
  return buildMetadata({
    ...seo,
    pathname: `/${locale}`
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const org = createOrganizationJsonLd({ name: "Coast2Coast" });
  const group = createMusicGroupJsonLd({ name: "Coast2Coast (C2C)" });

  const nextEventName = (process.env.NEXT_PUBLIC_NEXT_EVENT_NAME ?? "").trim();
  const nextEventStartDate = (process.env.NEXT_PUBLIC_NEXT_EVENT_START_DATE ?? "").trim();
  const nextEventUrl = (process.env.NEXT_PUBLIC_NEXT_EVENT_URL ?? "").trim();
  const event =
    nextEventName && nextEventStartDate
      ? createEventJsonLd({
          name: nextEventName,
          startDate: nextEventStartDate,
          url: nextEventUrl || undefined,
          organizerName: "Coast2Coast"
        })
      : null;

  return (
    <main>
      <JsonLdScript data={event ? [org, group, event] : [org, group]} />
      <HeroBlock />
      <EventsBlock locale={locale} />
    </main>
  );
}
