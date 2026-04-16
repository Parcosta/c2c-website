import type { Metadata } from "next";

import { HeroBlockWrapper } from "@/components/blocks/HeroBlockWrapper";
import { ProjectsBlock } from "@/components/blocks/ProjectsBlock";
import { EventsBlock } from "@/components/blocks/EventsBlock";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { type Locale } from "@/lib/i18n";
import {
  buildMetadata,
  createMusicGroupJsonLd,
  createOrganizationJsonLd,
  createEventJsonLd
} from "@/lib/seo";
import { getClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/config";
import { buildHomepageQuery, buildSiteLabelsQuery, buildSiteSettingsQuery } from "@/sanity/queries";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const def = buildHomepageQuery(locale);
  const page = isSanityConfigured() ? await getClient().fetch(def.query, def.params) : null;
  return buildMetadata({
    title: page?.seo?.title ?? "",
    description: page?.seo?.description ?? "",
    pathname: `/${locale}`
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const settingsDef = buildSiteSettingsQuery(locale);
  const labelsDef = buildSiteLabelsQuery(locale);
  const [settings, labels] = isSanityConfigured()
    ? await Promise.all([
        getClient().fetch(settingsDef.query, settingsDef.params),
        getClient().fetch(labelsDef.query, labelsDef.params)
      ])
    : [null, null];
  const siteName = settings?.siteName ?? labels?.brand ?? "";
  const org = createOrganizationJsonLd({ name: siteName });
  const group = createMusicGroupJsonLd({ name: siteName });

  const nextEventName = (process.env.NEXT_PUBLIC_NEXT_EVENT_NAME ?? "").trim();
  const nextEventStartDate = (process.env.NEXT_PUBLIC_NEXT_EVENT_START_DATE ?? "").trim();
  const nextEventUrl = (process.env.NEXT_PUBLIC_NEXT_EVENT_URL ?? "").trim();
  const event =
    nextEventName && nextEventStartDate
      ? createEventJsonLd({
          name: nextEventName,
          startDate: nextEventStartDate,
          url: nextEventUrl || undefined,
          organizerName: siteName
        })
      : null;

  return (
    <main>
      <JsonLdScript data={event ? [org, group, event] : [org, group]} />
      <HeroBlockWrapper locale={locale} />
      <ProjectsBlock locale={locale} />
      <EventsBlock locale={locale} />
    </main>
  );
}
