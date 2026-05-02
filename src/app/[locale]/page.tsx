import type { Metadata } from "next";

import { HeroBlockWrapper } from "@/components/blocks/HeroBlockWrapper";
import { ProjectsBlock } from "@/components/blocks/ProjectsBlock";
import { ServicesBlock } from "@/components/blocks/ServicesBlock";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { MultimediaBlock } from "@/components/blocks/MultimediaBlock";
import { NewsBlock } from "@/components/blocks/NewsBlock";
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
import {
  buildHomepageQuery,
  buildSiteLabelsQuery,
  buildSiteSettingsQuery,
  buildServicesQuery,
  buildMultimediaQuery,
  buildNewsQuery
} from "@/sanity/queries";

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
  const servicesDef = buildServicesQuery(locale);
  const multimediaDef = buildMultimediaQuery(locale);
  const newsDef = buildNewsQuery(locale);

  const [settings, labels, services, multimedia, news] = isSanityConfigured()
    ? await Promise.all([
        getClient().fetch(settingsDef.query, settingsDef.params),
        getClient().fetch(labelsDef.query, labelsDef.params),
        getClient().fetch(servicesDef.query, servicesDef.params),
        getClient().fetch(multimediaDef.query, multimediaDef.params),
        getClient().fetch(newsDef.query, newsDef.params)
      ])
    : [null, null, null, null, null];

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
      <ProjectsBlock
        locale={locale}
        labels={{
          sectionLabel: labels?.projectsPage?.sectionLabel ?? "Projects",
          title: labels?.projectsPage?.title ?? "Selected Work",
          visitStore: labels?.projectsPage?.visitStore ?? "Visit Store",
          filters: {
            all: labels?.projectsPage?.filters?.all ?? "All",
            music: labels?.projectsPage?.filters?.music ?? "Music",
            sound: labels?.projectsPage?.filters?.sound ?? "Sound",
            video: labels?.projectsPage?.filters?.video ?? "Video",
            mixes: labels?.projectsPage?.filters?.mixes ?? "Mixes",
            dev: labels?.projectsPage?.filters?.dev ?? "Dev"
          }
        }}
      />
      <ServicesBlock
        title={labels?.servicesPage?.heading}
        subtitle={labels?.servicesPage?.subheading}
        services={services ?? []}
      />
      <GalleryBlock
        locale={locale}
        title={labels?.galleryPage?.title}
        subtitle={labels?.galleryPage?.subtitle}
      />
      <MultimediaBlock
        locale={locale}
        title={labels?.multimediaPage?.title}
        subtitle={labels?.multimediaPage?.subtitle}
        items={multimedia ?? []}
      />
      <NewsBlock
        locale={locale}
        title={labels?.newsPage?.title}
        subtitle={labels?.newsPage?.subtitle}
        items={news ?? []}
      />
      <EventsBlock locale={locale} />
    </main>
  );
}
