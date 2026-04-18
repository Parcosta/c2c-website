import type { Metadata } from "next";

import {
  defaultLocale,
  getLocaleFromPathname,
  locales,
  switchLocaleInPathname,
  type Locale
} from "@/lib/locale";

type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type BuildMetadataInput = {
  title: string;
  description: string;
  pathname: string;
  locale?: Locale;
  image?: OgImage;
  noIndex?: boolean;
  siteName?: string;
};

export type JsonLd = Record<string, unknown>;

// The dev-server URL fallback is infrastructure (not content); required
// for `metadataBase` to parse at build time when no SITE_URL is set locally.
const DEV_SITE_URL = "http://localhost:3000";

/**
 * Site name is sourced from the NEXT_PUBLIC_SITE_NAME env var (set in
 * .env.local / Amplify). Authoritative content lives in Sanity
 * (`siteSettings.siteName`) and is preferred whenever an async context
 * allows fetching it. This helper returns an empty string when the env
 * var isn't set — callers should handle the empty case explicitly rather
 * than relying on a hardcoded brand fallback.
 */
export function getSiteName(): string {
  return (process.env.NEXT_PUBLIC_SITE_NAME ?? "").trim();
}

export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "").trim();
  if (!raw) return DEV_SITE_URL;
  return raw.replace(/\/+$/, "");
}

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function resolveUrl(pathname: string): URL {
  return new URL(normalizePathname(pathname), getSiteUrl());
}

function toOpenGraphLocale(locale: Locale): string {
  switch (locale) {
    case "en":
      return "en_US";
    case "es":
      return "es_ES";
    default:
      return "en_US";
  }
}

function buildLanguageAlternates(pathname: string): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, switchLocaleInPathname(pathname, locale)])
  );
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const pathname = normalizePathname(input.pathname);
  const resolvedLocale = input.locale ?? getLocaleFromPathname(pathname) ?? defaultLocale;
  const canonical = resolveUrl(pathname);

  const siteName = (input.siteName ?? getSiteName()).trim();

  // Build a clean title. If the caller's title already matches siteName (rare,
  // e.g. on a dedicated brand page), don't duplicate; otherwise append the
  // " | siteName" suffix only when siteName is non-empty.
  const title = !input.title
    ? siteName || ""
    : siteName && input.title !== siteName
      ? `${input.title} | ${siteName}`
      : input.title;

  const metadataBase = new URL(getSiteUrl());
  const ogImage = input.image;
  const ogImageUrl = ogImage ? resolveUrl(ogImage.url) : null;

  const twitterSite = (process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? "").trim() || undefined;

  return {
    metadataBase,
    title,
    description: input.description,
    alternates: {
      canonical: canonical.pathname,
      languages: buildLanguageAlternates(pathname)
    },
    openGraph: {
      type: "website",
      url: canonical.pathname,
      locale: toOpenGraphLocale(resolvedLocale),
      siteName: siteName || undefined,
      title,
      description: input.description,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl.pathname,
              width: ogImage!.width,
              height: ogImage!.height,
              alt: ogImage!.alt
            }
          ]
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: ogImageUrl ? [ogImageUrl.pathname] : undefined,
      site: twitterSite
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true
          }
        }
      : undefined
  };
}

function escapeJsonForHtml(json: string): string {
  return json
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return escapeJsonForHtml(JSON.stringify(data));
}

export function createOrganizationJsonLd(input: {
  name: string;
  url?: string;
  logoUrl?: string;
  sameAs?: string[];
}): JsonLd {
  const url = input.url ?? getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    url,
    logo: input.logoUrl ? new URL(input.logoUrl, url).toString() : undefined,
    sameAs: input.sameAs
  };
}

export function createMusicGroupJsonLd(input: {
  name: string;
  url?: string;
  sameAs?: string[];
  genre?: string[];
}): JsonLd {
  const url = input.url ?? getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: input.name,
    url,
    sameAs: input.sameAs,
    genre: input.genre
  };
}

export function createEventJsonLd(input: {
  name: string;
  startDate: string;
  endDate?: string;
  url?: string;
  location?: { name: string; address?: string };
  organizerName?: string;
}): JsonLd {
  const url = input.url ?? getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    startDate: input.startDate,
    endDate: input.endDate,
    url,
    location: input.location
      ? {
          "@type": "Place",
          name: input.location.name,
          address: input.location.address
        }
      : undefined,
    organizer: input.organizerName
      ? {
          "@type": "Organization",
          name: input.organizerName
        }
      : undefined
  };
}
