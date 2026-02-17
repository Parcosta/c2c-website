import { headers } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { getSanityImageUrl } from "@/sanity/image";
import { client } from "@/sanity/client";
import { buildPortfolioItemsQuery, type PortfolioItemValue } from "@/sanity/queries";

import { PortfolioBlockClient, type PortfolioBlockItem } from "./PortfolioBlockClient";

async function getLocaleFromHeaders(): Promise<Locale> {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-locale") ?? defaultLocale;
  return isLocale(headerLocale) ? headerLocale : defaultLocale;
}

export async function PortfolioBlock() {
  const locale = await getLocaleFromHeaders();
  const def = buildPortfolioItemsQuery(locale);

  const items = await client.fetch<PortfolioItemValue[]>(def.query, def.params).catch(() => []);

  const mapped = items.reduce<PortfolioBlockItem[]>((acc, item, index) => {
    const title = item.title?.trim() || "Untitled";
    const slug = item.slug?.trim();
    if (!slug) return acc;

    const imageUrl =
      getSanityImageUrl(item.images?.[0]) ??
      (index % 2 === 0 ? "/preview-1.svg" : "/preview-2.svg");

    acc.push({ id: item._id, title, slug, category: item.category ?? null, imageUrl });
    return acc;
  }, []);

  return <PortfolioBlockClient items={mapped} />;
}
