import { groq } from "next-sanity";

import type { Locale } from "@/lib/i18n";

export type QueryDefinition<TParams extends Record<string, unknown>, TResult> = {
  query: string;
  params: TParams;
} & {
  __resultType?: TResult;
};

export type ImageValue = {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
};

export type CtaValue = {
  label?: string;
  href?: string;
};

export type HeroValue = {
  heading?: string;
  subheading?: string;
  backgroundImage?: ImageValue;
  cta?: CtaValue;
};

export type SeoValue = {
  title?: string;
  description?: string;
  image?: ImageValue;
};

export type PageValue = {
  _id: string;
  title?: string;
  slug?: string;
  hero?: HeroValue;
  body?: unknown;
  seo?: SeoValue;
};

export type PortfolioItemValue = {
  _id: string;
  title?: string;
  slug?: string;
  category?: string;
  images?: ImageValue[];
  description?: unknown;
  date?: string;
  tags?: string[];
};

export type MediaAssetValue = {
  url?: string;
  mimeType?: string;
};

export type FeaturedMediaValue = {
  _type: "image" | "file";
  asset?: MediaAssetValue;
};

export type CurrentWorkValue = {
  _id: string;
  title?: string;
  description?: unknown;
  date?: string;
  media?: FeaturedMediaValue | null;
};

export type EventValue = {
  _id: string;
  title?: string;
  date?: string;
  venue?: string;
  city?: string;
  country?: string;
  ticketUrl?: string;
  flyer?: ImageValue;
};

export type ServiceValue = {
  _id: string;
  title?: string;
  description?: string;
  icon?: string;
  features?: string[];
};

export type PressItemValue = {
  _id: string;
  title?: string;
  publication?: string;
  date?: string;
  url?: string;
  quote?: string;
  image?: ImageValue;
};

export type SiteSettingsValue = {
  _id: string;
  siteName?: string;
  logo?: ImageValue;
  socialLinks?: Array<{ platform?: string; url?: string }>;
  contactEmail?: string;
};

export type FileAssetValue = {
  url?: string;
  filename?: string;
};

export type PressPhotoValue = {
  _key: string;
  title?: string;
  imageUrl?: string;
  filename?: string;
};

export type PressDownloadValue = {
  _key: string;
  title?: string;
  url?: string;
  filename?: string;
};

export type PressPageValue = {
  _id: string;
  title?: string;
  bio?: unknown;
  pressPhotos?: PressPhotoValue[];
  pressKitAssets?: PressDownloadValue[];
  techRider?: FileAssetValue | null;
  stagePlot?: FileAssetValue | null;
  bookingsEmail?: string;
  bookingsPhone?: string;
  seo?: SeoValue;
};

export type PressEpkValue = {
  pressPage: PressPageValue | null;
  pressMentions: PressItemValue[];
  siteSettings: SiteSettingsValue | null;
};

export function buildHomepageQuery(locale: Locale): QueryDefinition<{ locale: Locale; slug: string }, PageValue> {
  return {
    query: groq`*[_type == "page" && slug[$locale].current == $slug][0]{
      _id,
      "title": title[$locale],
      "slug": slug[$locale].current,
      hero{
        "heading": heading[$locale],
        "subheading": subheading[$locale],
        backgroundImage,
        cta{
          "label": label[$locale],
          href
        }
      },
      "body": body[$locale],
      seo{
        "title": title[$locale],
        "description": description[$locale],
        image
      }
    }`,
    params: { locale, slug: "home" }
  };
}

export function buildPortfolioItemsQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, PortfolioItemValue[]> {
  return {
    query: groq`*[_type == "portfolioItem"]|order(date desc){
      _id,
      "title": title[$locale],
      "slug": slug[$locale].current,
      "category": category[$locale],
      images,
      "description": description[$locale],
      date,
      tags
    }`,
    params: { locale }
  };
}

export function buildCurrentWorkQuery(locale: Locale): QueryDefinition<{ locale: Locale }, CurrentWorkValue | null> {
  return {
    query: groq`*[_type == "portfolioItem"]|order(date desc)[0]{
      _id,
      "title": title[$locale],
      "description": description[$locale],
      date,
      "media": coalesce(featuredMedia[0], images[0]){
        _type,
        asset->{
          url,
          mimeType
        }
      }
    }`,
    params: { locale }
  };
}

export function buildEventsQuery(locale: Locale): QueryDefinition<{ locale: Locale }, EventValue[]> {
  return {
    query: groq`*[_type == "event"]|order(date desc){
      _id,
      "title": title[$locale],
      date,
      "venue": venue[$locale],
      "city": city[$locale],
      "country": country[$locale],
      ticketUrl,
      flyer
    }`,
    params: { locale }
  };
}

export function buildServicesQuery(locale: Locale): QueryDefinition<{ locale: Locale }, ServiceValue[]> {
  return {
    query: groq`*[_type == "service"]|order(title.en asc){
      _id,
      "title": title[$locale],
      "description": description[$locale],
      icon,
      "features": features[][$locale]
    }`,
    params: { locale }
  };
}

export function buildPressQuery(locale: Locale): QueryDefinition<{ locale: Locale }, PressItemValue[]> {
  return {
    query: groq`*[_type == "pressItem"]|order(date desc){
      _id,
      "title": title[$locale],
      "publication": publication[$locale],
      date,
      url,
      "quote": quote[$locale],
      image
    }`,
    params: { locale }
  };
}

export function buildSiteSettingsQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, SiteSettingsValue | null> {
  return {
    query: groq`*[_type == "siteSettings"][0]{
      _id,
      "siteName": siteName[$locale],
      logo,
      socialLinks,
      contactEmail
    }`,
    params: { locale }
  };
}

export function buildPressEpkQuery(locale: Locale): QueryDefinition<{ locale: Locale }, PressEpkValue> {
  return {
    query: groq`{
      "pressPage": *[_type == "pressPage"][0]{
        _id,
        "title": title[$locale],
        "bio": bio[$locale],
        bookingsEmail,
        bookingsPhone,
        "pressPhotos": pressPhotos[]{
          _key,
          "title": title[$locale],
          "imageUrl": image.asset->url,
          "filename": image.asset->originalFilename
        },
        "pressKitAssets": pressKitAssets[]{
          _key,
          "title": title[$locale],
          "url": file.asset->url,
          "filename": file.asset->originalFilename
        },
        "techRider": techRider.asset->{
          "url": url,
          "filename": originalFilename
        },
        "stagePlot": stagePlot.asset->{
          "url": url,
          "filename": originalFilename
        },
        seo{
          "title": title[$locale],
          "description": description[$locale],
          image
        }
      },
      "pressMentions": *[_type == "pressItem"]|order(date desc){
        _id,
        "title": title[$locale],
        "publication": publication[$locale],
        date,
        url,
        "quote": quote[$locale],
        image
      },
      "siteSettings": *[_type == "siteSettings"][0]{
        _id,
        "siteName": siteName[$locale],
        logo,
        socialLinks,
        contactEmail
      }
    }`,
    params: { locale }
  };
}

