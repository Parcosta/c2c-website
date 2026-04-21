import type { Metadata } from "next";

import { EventsBlock } from "@/components/blocks/EventsBlock";
import { GalleryBlock, type GalleryImage } from "@/components/blocks/GalleryBlock";
import { HeroBlockWrapper } from "@/components/blocks/HeroBlockWrapper";
import { MultimediaCtaBlock } from "@/components/blocks/MultimediaCtaBlock";
import { NewsListBlock, type NewsListItem } from "@/components/blocks/NewsListBlock";
import {
  ProjectsBlock,
  type ProjectItem,
  type ProjectsFilter
} from "@/components/blocks/ProjectsBlock";
import { ServicesBlock } from "@/components/blocks/ServicesBlock";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { cms } from "@/lib/cms";
import { prefixLocaleHref, type Locale } from "@/lib/locale";
import {
  buildMetadata,
  createEventJsonLd,
  createMusicGroupJsonLd,
  createOrganizationJsonLd
} from "@/lib/seo";
import { getHomePage, getSiteLabels } from "@/sanity/cache";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import { getSanityImageUrl } from "@/sanity/image";
import { portableTextToPlainText } from "@/sanity/portableText";
import {
  buildPortfolioItemsQuery,
  buildPressQuery,
  buildServicesQuery,
  buildSiteSettingsQuery,
  type PortfolioItemValue,
  type PressItemValue,
  type ServiceValue
} from "@/sanity/queries";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getHomePage(locale);
  return buildMetadata({
    title: page?.seo?.title ?? "",
    description: page?.seo?.description ?? "",
    pathname: `/${locale}`
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const [page, settings, labels, pressItems, services, portfolioItems] = isSanityConfigured()
    ? await Promise.all([
        getHomePage(locale),
        sanityFetch(buildSiteSettingsQuery(locale)),
        getSiteLabels(locale),
        sanityFetch(buildPressQuery(locale)),
        sanityFetch(buildServicesQuery(locale)),
        sanityFetch(buildPortfolioItemsQuery(locale))
      ])
    : [null, null, null, [] as PressItemValue[], [] as ServiceValue[], [] as PortfolioItemValue[]];

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

  const sections = page?.homeSections;

  // Map Sanity portfolioItems → ProjectsBlock's ProjectItem shape.
  const projectItems: ProjectItem[] = (portfolioItems ?? [])
    .slice(0, 8)
    .map((item) => ({
      id: item._id,
      title: item.title ?? "",
      description: portableTextToPlainText(item.description as unknown[] | undefined),
      imageUrl: getSanityImageUrl(item.images?.[0], { width: 600 }) ?? "",
      category: item.filterCategory
    }))
    .filter((item) => Boolean(item.title && item.imageUrl));

  const newsItems: NewsListItem[] = (pressItems ?? [])
    .slice(0, 4)
    .filter((item) => item.publication || item.title)
    .map((item) => ({
      _key: item._id,
      date: item.date,
      label: item.publication || item.title || "",
      href: item.url ?? undefined
    }));

  const galleryImages: GalleryImage[] = (sections?.gallerySection?.images ?? [])
    .filter((item) => Boolean(item.image?.asset?._ref))
    .map((item, index) => ({
      _id: item._key ?? `home-gallery-${index}`,
      src: item.image!,
      alt: item.alt,
      caption: item.caption
    }));

  // Build filter tabs from Sanity-authored labels only. Filters with no
  // label are dropped; if no labels are authored the block shows no filter
  // tabs and just the grid.
  const filterSpec: ReadonlyArray<{ key: string; label: string | undefined }> = [
    { key: "all", label: labels?.projectsPage?.filters?.all },
    { key: "musica", label: labels?.projectsPage?.filters?.music },
    { key: "sonoro", label: labels?.projectsPage?.filters?.sound },
    { key: "video", label: labels?.projectsPage?.filters?.video },
    { key: "mixes", label: labels?.projectsPage?.filters?.mixes },
    { key: "dev", label: labels?.projectsPage?.filters?.dev }
  ];
  const projectFilters: ProjectsFilter[] = filterSpec
    .filter(
      (f): f is { key: string; label: string } =>
        typeof f.label === "string" && f.label.trim().length > 0
    )
    .map((f) => ({ key: f.key, label: f.label }));

  const servicesSection = sections?.servicesSection;
  const eventsSection = sections?.eventsSection;
  const newsSection = sections?.newsSection;
  const multimediaCta = sections?.multimediaCtaSection;
  const gallerySection = sections?.gallerySection;

  return (
    <main>
      <JsonLdScript data={event ? [org, group, event] : [org, group]} />

      <HeroBlockWrapper locale={locale} />

      {projectItems.length > 0 && (
        <ProjectsBlock
          projects={projectItems}
          sectionLabel={cms.text(
            labels?.projectsPage?.sectionLabel,
            "siteLabels.projectsPage.sectionLabel",
            { locale }
          )}
          title={cms.text(labels?.projectsPage?.title, "siteLabels.projectsPage.title", {
            locale
          })}
          visitStoreLabel={cms.text(
            labels?.projectsPage?.visitStore,
            "siteLabels.projectsPage.visitStore",
            { locale }
          )}
          filters={projectFilters}
        />
      )}

      <EventsBlock
        locale={locale}
        title={cms.text(eventsSection?.title, "homeSections.eventsSection.title", { locale })}
        subtitle={cms.text(eventsSection?.eyebrow, "homeSections.eventsSection.eyebrow", {
          locale
        })}
        ticketsLabel={cms.text(
          eventsSection?.ticketsLabel,
          "homeSections.eventsSection.ticketsLabel",
          { locale }
        )}
      />

      {services.length > 0 && (
        <ServicesBlock
          locale={locale}
          title={cms.text(servicesSection?.title, "homeSections.servicesSection.title", {
            locale
          })}
          description={cms.text(
            servicesSection?.description,
            "homeSections.servicesSection.description",
            { locale }
          )}
          services={services}
          ctaLabel={cms.text(servicesSection?.ctaLabel, "homeSections.servicesSection.ctaLabel", {
            locale
          })}
          ctaHref={cms.text(servicesSection?.ctaHref, "homeSections.servicesSection.ctaHref", {
            locale
          })}
          image={{
            src:
              getSanityImageUrl(servicesSection?.image, { width: 1072 }) ??
              "/images/services-image.jpg",
            alt: cms.text(
              servicesSection?.imageAlt,
              "homeSections.servicesSection.imageAlt",
              { locale }
            )
          }}
        />
      )}

      {newsItems.length > 0 && (
        <NewsListBlock
          title={cms.text(newsSection?.title, "homeSections.newsSection.title", { locale })}
          eyebrow={cms.text(newsSection?.eyebrow, "homeSections.newsSection.eyebrow", {
            locale
          })}
          ctaLabel={cms.text(newsSection?.ctaLabel, "homeSections.newsSection.ctaLabel", {
            locale
          })}
          items={newsItems}
          dateLocale={locale}
        />
      )}

      <MultimediaCtaBlock
        title={cms.text(multimediaCta?.title, "homeSections.multimediaCtaSection.title", {
          locale
        })}
        description={cms.text(
          multimediaCta?.description,
          "homeSections.multimediaCtaSection.description",
          { locale }
        )}
        ctaLabel={cms.text(multimediaCta?.ctaLabel, "homeSections.multimediaCtaSection.ctaLabel", {
          locale
        })}
        ctaHref={prefixLocaleHref(
          cms.text(multimediaCta?.ctaHref, "homeSections.multimediaCtaSection.ctaHref", { locale }),
          locale
        )}
      />

      {galleryImages.length > 0 && (
        <GalleryBlock
          title={cms.text(gallerySection?.title, "homeSections.gallerySection.title", {
            locale
          })}
          eyebrow={cms.text(gallerySection?.eyebrow, "homeSections.gallerySection.eyebrow", {
            locale
          })}
          rightLinkLabel={labels?.navigation?.about}
          rightLinkHref={prefixLocaleHref("/about", locale)}
          images={galleryImages}
        />
      )}
    </main>
  );
}
