import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import type { PortfolioCardItem } from "@/components/portfolio/types";
import { isLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { assertSanityConfig } from "@/sanity/config";
import { client } from "@/sanity/client";
import { getSanityImageUrl } from "@/sanity/image";
import { portableTextToPlainText } from "@/sanity/portableText";
import { buildPortfolioItemsQuery, type PortfolioItemValue } from "@/sanity/queries";

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export default async function PortfolioPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  assertSanityConfig();
  const def = buildPortfolioItemsQuery(locale);
  const results = await client.fetch<PortfolioItemValue[]>(def.query, def.params, {
    next: { revalidate: 60 }
  });

  const items: PortfolioCardItem[] = (results ?? [])
    .filter((item) => Boolean(item?._id) && typeof item?.slug === "string" && item.slug.length > 0)
    .map((item) => {
      const imageUrl = getSanityImageUrl(item.images?.[0], { width: 1600 }) ?? "/preview-1.svg";
      const plain = portableTextToPlainText(item.description);
      const description = plain ? truncate(plain, 110) : undefined;

      return {
        id: item._id,
        title: item.title?.trim() || "Untitled",
        slug: item.slug,
        category: item.category?.trim() || "Uncategorized",
        imageUrl,
        description,
        date: item.date
      };
    });

  return (
    <main>
      <Section>
        <Container>
          <PortfolioGrid items={items} locale={locale} />
        </Container>
      </Section>
    </main>
  );
}

