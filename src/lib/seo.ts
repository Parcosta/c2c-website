import type { Metadata } from "next";

import { defaultLocale, getLocaleFromPathname, locales, switchLocaleInPathname, type Locale } from "@/lib/i18n";

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

const fallbackSiteUrl = "http://localhost:3000";
const fallbackSiteName = "Coast2Coast (C2C)";

export function getSiteName(): string {
  return (process.env.NEXT_PUBLIC_SITE_NAME ?? "").trim() || fallbackSiteName;
}

export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "").trim();
  if (!raw) return fallbackSiteUrl;
  return raw.replace(/\/+$/, "");
}

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function resolveUrl(pathname: string): URL {
  return new URL(normalizePathname(pathname), getSiteUrl());
}

function getDefaultOgImage(): OgImage {
  return { url: "/preview-1.svg", alt: "Preview" };
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
  return Object.fromEntries(locales.map((locale) => [locale, switchLocaleInPathname(pathname, locale)]));
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const pathname = normalizePathname(input.pathname);
  const resolvedLocale = input.locale ?? getLocaleFromPathname(pathname) ?? defaultLocale;
  const canonical = resolveUrl(pathname);

  const siteName = input.siteName ?? getSiteName();
  const title = input.title === siteName ? siteName : `${input.title} | ${siteName}`;

  const metadataBase = new URL(getSiteUrl());
  const ogImage = input.image ?? getDefaultOgImage();
  const ogImageUrl = resolveUrl(ogImage.url);

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
      siteName,
      title,
      description: input.description,
      images: [
        {
          url: ogImageUrl.pathname,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [ogImageUrl.pathname],
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

export function createMusicGroupJsonLd(input: { name: string; url?: string; sameAs?: string[]; genre?: string[] }): JsonLd {
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
