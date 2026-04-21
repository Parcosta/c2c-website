import { cache } from "react";

import type { Locale } from "@/lib/locale";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import {
  buildHomepageQuery,
  buildSiteLabelsQuery,
  type PageValue,
  type SiteLabelsValue
} from "@/sanity/queries";

/**
 * React's `cache()` memoizes promises within a single request. Using it on
 * Sanity fetches that multiple components need (labels, home page) avoids
 * duplicate network calls on the server when `generateMetadata`, layout
 * components, and the page render all request the same resource.
 */

export const getSiteLabels = cache(async (locale: Locale): Promise<SiteLabelsValue | null> => {
  if (!isSanityConfigured()) return null;
  return sanityFetch(buildSiteLabelsQuery(locale));
});

export const getHomePage = cache(async (locale: Locale): Promise<PageValue | null> => {
  if (!isSanityConfigured()) return null;
  return sanityFetch(buildHomepageQuery(locale));
});
