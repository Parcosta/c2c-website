import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { PhotoGalleryBlock, type PhotoGalleryImage } from "@/components/blocks/PhotoGalleryBlock";
import { ServicesBlock } from "@/components/blocks/ServicesBlock";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, createMusicGroupJsonLd, createOrganizationJsonLd, createEventJsonLd, getSiteName } from "@/lib/seo";
import { client } from "@/sanity/client";
import {
  buildHomepageQuery,
  type PageValue,
  type PhotoGalleryBlockValue,
  type PhotoGalleryImageValue,
  type ServicesBlockValue
} from "@/sanity/queries";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

function getHomeSeo(locale: Locale): { title: string; description: string } {
  switch (locale) {
    case "es":
      return {
        title: getSiteName(),
        description:
          "Live modular techno y DJ. Música, shows y lanzamientos de Coast2Coast (C2C)."
      };
    case "en":
    default:
      return {
        title: getSiteName(),
        description:
          "Live modular techno & DJ. Music, shows, and releases by Coast2Coast (C2C)."
      };
  }
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const seo = getHomeSeo(params.locale);
  return buildMetadata({
    ...seo,
    pathname: `/${params.locale}`
  });
}

function mapPhotoGalleryImages(images: PhotoGalleryImageValue[] | undefined): PhotoGalleryImage[] {
  return (images ?? [])
    .map((image) => {
      const url = image.url?.trim();
      const width = typeof image.width === "number" ? image.width : null;
      const height = typeof image.height === "number" ? image.height : null;
      if (!url || !width || !height) return null;

      const alt = image.alt?.trim() || "Gallery photo";

      return {
        _key: image._key || `${url}-${width}-${height}`,
        url,
        width,
        height,
        alt,
        blurDataUrl: image.blurDataUrl ?? null,
        caption: image.caption?.trim() || null
      };
    })
    .filter((value): value is PhotoGalleryImage => value != null);
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-base leading-relaxed text-slate-200">{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-slate-700 pl-4 text-base italic text-slate-200">{children}</blockquote>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-5 text-slate-200">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-5 text-slate-200">{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-base leading-relaxed">{children}</li>
  },
  types: {
    servicesBlock: ({ value }) => {
      const v = value as ServicesBlockValue;
      return <ServicesBlock title={v.title} subtitle={v.subtitle} services={v.services} />;
    },
    photoGalleryBlock: ({ value }) => {
      const v = value as PhotoGalleryBlockValue;
      const images = mapPhotoGalleryImages(v.images);
      return <PhotoGalleryBlock title={v.title} subtitle={v.subtitle} images={images} />;
    }
  }
};

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const def = buildHomepageQuery(params.locale);
  const page = await client.fetch<PageValue | null>(def.query, def.params).catch(() => null);

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
      {page?.hero ? (
        <HeroBlock
          title={page.hero.heading}
          subtitle={page.hero.subheading}
          ctaLabel={page.hero.cta?.label}
          ctaHref={page.hero.cta?.href}
        />
      ) : (
        <HeroBlock />
      )}

      <Section>
        <Container>
          {Array.isArray(page?.body) && page.body.length > 0 ? (
            <div className="space-y-14">
              <PortableText value={page.body as never} components={portableTextComponents} />
            </div>
          ) : (
            <p className="text-base text-muted-foreground">No homepage content yet.</p>
          )}
        </Container>
      </Section>
    </main>
  );
}

