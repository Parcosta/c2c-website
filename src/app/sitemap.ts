import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const siteUrl = getSiteUrl();

  // Define all routes
  const routes = [
    "",
    "/portfolio",
    "/services",
    "/press",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms"
  ];

  // Generate sitemap entries for all locale variants
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified,
        alternates: {
          languages: Object.fromEntries(locales.map((loc) => [loc, `${siteUrl}/${loc}${route}`]))
        }
      });
    }
  }

  return entries;
}
