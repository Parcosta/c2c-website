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
  description?: unknown[];
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
  pricing?: string;
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

export type SiteLabelsValue = {
  _id: string;
  brand?: string;
  navigation?: {
    primaryAriaLabel?: string;
    mobileAriaLabel?: string;
    footerAriaLabel?: string;
    home?: string;
    portfolio?: string;
    services?: string;
    press?: string;
    about?: string;
    contact?: string;
    booking?: string;
    privacyPolicy?: string;
    terms?: string;
    mobileMenu?: string;
    close?: string;
  };
  language?: {
    switchToEnglish?: string;
    switchToSpanish?: string;
  };
  footer?: {
    contact?: string;
    language?: string;
    follow?: string;
    rights?: string;
    tagline?: string;
  };
  portfolioPage?: {
    title?: string;
    subtitle?: string;
    filtersLabel?: string;
    allFilter?: string;
    liveFilter?: string;
    djFilter?: string;
    studioFilter?: string;
    itemsCountLabel?: string;
  };
  projectsPage?: {
    sectionLabel?: string;
    title?: string;
    visitStore?: string;
    filters?: {
      all?: string;
      music?: string;
      sound?: string;
      video?: string;
      mixes?: string;
      dev?: string;
    };
  };
  contactPage?: {
    title?: string;
    subtitle?: string;
    form?: ContactFormContentValue;
  };
  bookingPage?: {
    title?: string;
    subtitle?: string;
    seoTitle?: string;
    seoDescription?: string;
    form?: BookingFormContentValue;
    eventTypes?: BookingEventTypesValue;
  };
  aboutPage?: {
    pageTitleFallback?: string;
    introFallback?: string;
    bioTitle?: string;
    bioEmpty?: string;
    releasesTitle?: string;
    releasesEmpty?: string;
    equipmentTitle?: string;
    equipmentEmpty?: string;
    influencesTitle?: string;
    influencesEmpty?: string;
    photoAltFallback?: string;
  };
  servicesPage?: {
    seoTitle?: string;
    seoDescription?: string;
    heading?: string;
    subheading?: string;
    jsonLdName?: string;
    emptyMessage?: string;
    pricingLabel?: string;
    serviceFallbackTitle?: string;
  };
  pressPage?: {
    pageTitleFallback?: string;
    intro?: string;
    bioTitle?: string;
    bioEmpty?: string;
    pressPhotosTitle?: string;
    pressPhotosEmpty?: string;
    pressMentionsTitle?: string;
    pressMentionsEmpty?: string;
    pressKitTitle?: string;
    pressKitEmpty?: string;
    techRiderTitle?: string;
    techRiderEmpty?: string;
    stagePlotTitle?: string;
    stagePlotPlaceholder?: string;
    bookingsTitle?: string;
    bookingsEmpty?: string;
    downloadLabel?: string;
  };
  notFoundPage?: {
    title?: string;
    body?: string;
    backHome?: string;
  };
  cookieConsent?: {
    dialogAriaLabel?: string;
    title?: string;
    description?: string;
    acceptAll?: string;
    rejectNonEssential?: string;
    customize?: string;
    dialogTitle?: string;
    dialogDescription?: string;
    necessaryLabel?: string;
    necessaryDescription?: string;
    analyticsLabel?: string;
    analyticsDescription?: string;
    savePreferences?: string;
    privacyPolicy?: string;
    terms?: string;
  };
};

export type ContactFormContentValue = {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
  sending?: string;
  success?: string;
  error?: string;
};

export type BookingFormContentValue = ContactFormContentValue & {
  eventType?: string;
  eventDate?: string;
  location?: string;
  locationPlaceholder?: string;
};

export type BookingEventTypesValue = {
  live?: string;
  dj?: string;
  corporate?: string;
  private?: string;
  other?: string;
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

export type AboutReleaseValue = {
  _key: string;
  title?: string;
  year?: number;
  label?: string;
  url?: string;
};

export type AboutEquipmentGroupValue = {
  _key: string;
  title?: string;
  items?: string[];
};

export type AboutPageValue = {
  _id: string;
  title?: string;
  intro?: string;
  photo?: ImageValue;
  photoAlt?: string;
  bio?: unknown;
  releases?: AboutReleaseValue[];
  equipmentGroups?: AboutEquipmentGroupValue[];
  influences?: string[];
  seo?: SeoValue;
};

export type LegalTextPartValue = {
  _key?: string;
  text?: string;
  href?: string;
};

export type LegalContentBlockValue = {
  _key?: string;
  type?: "p" | "ul" | "ol" | "pWithLinks";
  text?: string;
  items?: string[];
  parts?: LegalTextPartValue[];
};

export type LegalSectionValue = {
  _key?: string;
  heading?: string;
  body?: LegalContentBlockValue[];
};

export type LegalPageValue = {
  _id: string;
  title?: string;
  slug?: string;
  subtitle?: string;
  lastUpdatedLabel?: string;
  lastUpdated?: string;
  intro?: string;
  sections?: LegalSectionValue[];
  seo?: SeoValue;
};

export function buildHomepageQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale; slug: string }, PageValue> {
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

export function buildCurrentWorkQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, CurrentWorkValue | null> {
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

export function buildEventsQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, EventValue[]> {
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

export function buildUpcomingEventsQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, EventValue[]> {
  return {
    query: groq`*[_type == "event" && date >= now()]|order(date asc){
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

export function buildServicesQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, ServiceValue[]> {
  return {
    query: groq`*[_type == "service"]|order(title.en asc){
      _id,
      "title": title[$locale],
      "description": description[$locale],
      "pricing": pricing[$locale],
      icon,
      "features": features[][$locale]
    }`,
    params: { locale }
  };
}

export function buildPortfolioItemBySlugQuery(
  locale: Locale,
  slug: string
): QueryDefinition<{ locale: Locale; slug: string }, PortfolioItemValue | null> {
  return {
    query: groq`*[_type == "portfolioItem" && slug[$locale].current == $slug][0]{
      _id,
      "title": title[$locale],
      "slug": slug[$locale].current,
      "category": category[$locale],
      images,
      "description": description[$locale],
      date,
      tags
    }`,
    params: { locale, slug }
  };
}

export function buildPressQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, PressItemValue[]> {
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

export function buildSiteLabelsQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, SiteLabelsValue | null> {
  return {
    query: groq`*[_type == "siteLabels"][0]{
      _id,
      "brand": brand[$locale],
      navigation{
        "primaryAriaLabel": primaryAriaLabel[$locale],
        "mobileAriaLabel": mobileAriaLabel[$locale],
        "footerAriaLabel": footerAriaLabel[$locale],
        "home": home[$locale],
        "portfolio": portfolio[$locale],
        "services": services[$locale],
        "press": press[$locale],
        "about": about[$locale],
        "contact": contact[$locale],
        "booking": booking[$locale],
        "privacyPolicy": privacyPolicy[$locale],
        "terms": terms[$locale],
        "mobileMenu": mobileMenu[$locale],
        "close": close[$locale]
      },
      language{
        "switchToEnglish": switchToEnglish[$locale],
        "switchToSpanish": switchToSpanish[$locale]
      },
      footer{
        "contact": contact[$locale],
        "language": language[$locale],
        "follow": follow[$locale],
        "rights": rights[$locale],
        "tagline": tagline[$locale]
      },
      portfolioPage{
        "title": title[$locale],
        "subtitle": subtitle[$locale],
        "filtersLabel": filtersLabel[$locale],
        "allFilter": allFilter[$locale],
        "liveFilter": liveFilter[$locale],
        "djFilter": djFilter[$locale],
        "studioFilter": studioFilter[$locale],
        "itemsCountLabel": itemsCountLabel[$locale]
      },
      "projectsPage": projectsPage{
        "sectionLabel": sectionLabel[$locale],
        "title": title[$locale],
        "visitStore": visitStore[$locale],
        "filters": filters{
          "all": all[$locale],
          "music": music[$locale],
          "sound": sound[$locale],
          "video": video[$locale],
          "mixes": mixes[$locale],
          "dev": dev[$locale]
        }
      },
      contactPage{
        "title": title[$locale],
        "subtitle": subtitle[$locale],
        form{
          "name": name[$locale],
          "email": email[$locale],
          "message": message[$locale],
          "submit": submit[$locale],
          "sending": sending[$locale],
          "success": success[$locale],
          "error": error[$locale]
        }
      },
      bookingPage{
        "title": title[$locale],
        "subtitle": subtitle[$locale],
        "seoTitle": seoTitle[$locale],
        "seoDescription": seoDescription[$locale],
        form{
          "name": name[$locale],
          "email": email[$locale],
          "eventType": eventType[$locale],
          "eventDate": eventDate[$locale],
          "location": location[$locale],
          "locationPlaceholder": locationPlaceholder[$locale],
          "message": message[$locale],
          "submit": submit[$locale],
          "sending": sending[$locale],
          "success": success[$locale],
          "error": error[$locale]
        },
        eventTypes{
          "live": live[$locale],
          "dj": dj[$locale],
          "corporate": corporate[$locale],
          "private": private[$locale],
          "other": other[$locale]
        }
      },
      aboutPage{
        "pageTitleFallback": pageTitleFallback[$locale],
        "introFallback": introFallback[$locale],
        "bioTitle": bioTitle[$locale],
        "bioEmpty": bioEmpty[$locale],
        "releasesTitle": releasesTitle[$locale],
        "releasesEmpty": releasesEmpty[$locale],
        "equipmentTitle": equipmentTitle[$locale],
        "equipmentEmpty": equipmentEmpty[$locale],
        "influencesTitle": influencesTitle[$locale],
        "influencesEmpty": influencesEmpty[$locale],
        "photoAltFallback": photoAltFallback[$locale]
      },
      servicesPage{
        "seoTitle": seoTitle[$locale],
        "seoDescription": seoDescription[$locale],
        "heading": heading[$locale],
        "subheading": subheading[$locale],
        "jsonLdName": jsonLdName[$locale],
        "emptyMessage": emptyMessage[$locale],
        "pricingLabel": pricingLabel[$locale],
        "serviceFallbackTitle": serviceFallbackTitle[$locale]
      },
      pressPage{
        "pageTitleFallback": pageTitleFallback[$locale],
        "intro": intro[$locale],
        "bioTitle": bioTitle[$locale],
        "bioEmpty": bioEmpty[$locale],
        "pressPhotosTitle": pressPhotosTitle[$locale],
        "pressPhotosEmpty": pressPhotosEmpty[$locale],
        "pressMentionsTitle": pressMentionsTitle[$locale],
        "pressMentionsEmpty": pressMentionsEmpty[$locale],
        "pressKitTitle": pressKitTitle[$locale],
        "pressKitEmpty": pressKitEmpty[$locale],
        "techRiderTitle": techRiderTitle[$locale],
        "techRiderEmpty": techRiderEmpty[$locale],
        "stagePlotTitle": stagePlotTitle[$locale],
        "stagePlotPlaceholder": stagePlotPlaceholder[$locale],
        "bookingsTitle": bookingsTitle[$locale],
        "bookingsEmpty": bookingsEmpty[$locale],
        "downloadLabel": downloadLabel[$locale]
      },
      notFoundPage{
        "title": title[$locale],
        "body": body[$locale],
        "backHome": backHome[$locale]
      },
      cookieConsent{
        "dialogAriaLabel": dialogAriaLabel[$locale],
        "title": title[$locale],
        "description": description[$locale],
        "acceptAll": acceptAll[$locale],
        "rejectNonEssential": rejectNonEssential[$locale],
        "customize": customize[$locale],
        "dialogTitle": dialogTitle[$locale],
        "dialogDescription": dialogDescription[$locale],
        "necessaryLabel": necessaryLabel[$locale],
        "necessaryDescription": necessaryDescription[$locale],
        "analyticsLabel": analyticsLabel[$locale],
        "analyticsDescription": analyticsDescription[$locale],
        "savePreferences": savePreferences[$locale],
        "privacyPolicy": privacyPolicy[$locale],
        "terms": terms[$locale]
      }
    }`,
    params: { locale }
  };
}

export function buildPressEpkQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, PressEpkValue> {
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

export function buildAboutPageQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, AboutPageValue | null> {
  return {
    query: groq`*[_type == "aboutPage"][0]{
      _id,
      "title": title[$locale],
      "intro": intro[$locale],
      photo,
      "photoAlt": photoAlt[$locale],
      "bio": bio[$locale],
      "releases": releases[]{
        _key,
        "title": title[$locale],
        year,
        "label": label[$locale],
        url
      },
      "equipmentGroups": equipmentGroups[]{
        _key,
        "title": title[$locale],
        "items": items[][$locale]
      },
      "influences": influences[][$locale],
      seo{
        "title": title[$locale],
        "description": description[$locale],
        image
      }
    }`,
    params: { locale }
  };
}

export function buildLegalPageQuery(
  locale: Locale,
  slug: string
): QueryDefinition<{ locale: Locale; slug: string }, LegalPageValue | null> {
  return {
    query: groq`*[_type == "legalPage" && slug[$locale].current == $slug][0]{
      _id,
      "title": title[$locale],
      "slug": slug[$locale].current,
      "subtitle": subtitle[$locale],
      "lastUpdatedLabel": lastUpdatedLabel[$locale],
      lastUpdated,
      "intro": intro[$locale],
      "sections": sections[]{
        _key,
        "heading": heading[$locale],
        "body": body[]{
          _key,
          type,
          "text": text[$locale],
          "items": items[][$locale],
          "parts": parts[]{
            _key,
            "text": text[$locale],
            href
          }
        }
      },
      seo{
        "title": title[$locale],
        "description": description[$locale],
        image
      }
    }`,
    params: { locale, slug }
  };
}

// Multimedia queries
export type MultimediaItemValue = {
  _id: string;
  title?: string;
  embedUrl?: string;
  thumbnail?: ImageValue;
};

export function buildMultimediaQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, MultimediaItemValue[]> {
  return {
    query: groq`*[_type == "multimedia"]|order(date desc){
      _id,
      "title": title[$locale],
      embedUrl,
      thumbnail
    }`,
    params: { locale }
  };
}

// News queries  
export type NewsItemValue = {
  _id: string;
  date?: string;
  title?: string;
  excerpt?: string;
  link?: string;
};

export function buildNewsQuery(
  locale: Locale
): QueryDefinition<{ locale: Locale }, NewsItemValue[]> {
  return {
    query: groq`*[_type == "news"]|order(date desc){
      _id,
      date,
      "title": title[$locale],
      "excerpt": excerpt[$locale],
      link
    }`,
    params: { locale }
  };
}
