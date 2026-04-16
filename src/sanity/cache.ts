import { cache } from "react";

import type { Locale } from "@/lib/i18n";
import { getClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/config";
import { buildSiteLabelsQuery, type SiteLabelsValue } from "@/sanity/queries";

/**
 * Cached fetch for siteLabels to avoid duplicate network requests
 * between generateMetadata and page components.
 * React's cache() ensures the same promise is returned for the same locale
 * within a single render pass.
 */
export const getSiteLabels = cache(async (locale: Locale): Promise<SiteLabelsValue | null> => {
  if (!isSanityConfigured()) return null;
  const def = buildSiteLabelsQuery(locale);
  return getClient().fetch<SiteLabelsValue | null>(def.query, def.params);
});
