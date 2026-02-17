import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PortfolioDetail } from "@/components/portfolio/PortfolioDetail";
import type { PortfolioDetailItem } from "@/components/portfolio/types";
import { isLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { assertSanityConfig } from "@/sanity/config";
import { getClient } from "@/sanity/client";
import { getSanityImageUrl } from "@/sanity/image";
import { buildPortfolioItemBySlugQuery, type PortfolioItemValue } from "@/sanity/queries";

async function getPortfolioItem(locale: Locale, slug: string) {
  assertSanityConfig();
  const def = buildPortfolioItemBySlugQuery(locale, slug);
  return getClient().fetch<PortfolioItemValue | null>(def.query, def.params, {
    next: { revalidate: 60 }
  });
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const result = await getPortfolioItem(locale, slug);
  if (!result) return {};

  const title = result.title?.trim() || "Untitled";

  return buildMetadata({
    title,
    description: `${title} — Coast2Coast portfolio`,
    pathname: `/${locale}/portfolio/${slug}`
  });
}

export default async function PortfolioItemPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale: Locale = locale;

  const result = await getPortfolioItem(resolvedLocale, slug);
  if (!result) notFound();

  const title = result.title?.trim() || "Untitled";

  const images = (result.images ?? [])
    .map((image, idx) => {
      const url = getSanityImageUrl(image, { width: 2400 });
      if (!url) return null;
      return { url, alt: `${title} image ${idx + 1}` };
    })
    .filter((value): value is { url: string; alt: string } => value != null);

  const item: PortfolioDetailItem = {
    id: result._id,
    title,
    slug: result.slug ?? slug,
    category: result.category?.trim() || undefined,
    images,
    description: result.description,
    date: result.date,
    tags: (result.tags ?? []).filter(
      (tag): tag is string => typeof tag === "string" && tag.trim().length > 0
    ),
    locale: resolvedLocale
  };

  return (
    <main>
      <Section>
        <Container>
          <PortfolioDetail item={item} />
        </Container>
      </Section>
    </main>
  );
}
