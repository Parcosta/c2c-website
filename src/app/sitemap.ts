import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { resolveUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push(
      { url: resolveUrl(`/${locale}`).toString(), lastModified },
      { url: resolveUrl(`/${locale}/components`).toString(), lastModified }
    );
  }

  return entries;
}

