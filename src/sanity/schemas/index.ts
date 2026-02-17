import { blockContent } from "@/sanity/schemas/blocks/blockContent";
import { event } from "@/sanity/schemas/documents/event";
import { page } from "@/sanity/schemas/documents/page";
import { portfolioItem } from "@/sanity/schemas/documents/portfolioItem";
import { pressItem } from "@/sanity/schemas/documents/pressItem";
import { service } from "@/sanity/schemas/documents/service";
import { siteSettings } from "@/sanity/schemas/documents/siteSettings";
import { localeBlockContent } from "@/sanity/schemas/localized/localeBlockContent";
import { localeSlug } from "@/sanity/schemas/localized/localeSlug";
import { localeString } from "@/sanity/schemas/localized/localeString";
import { localeText } from "@/sanity/schemas/localized/localeText";
import { cta } from "@/sanity/schemas/objects/cta";
import { hero } from "@/sanity/schemas/objects/hero";
import { seo } from "@/sanity/schemas/objects/seo";
import { socialLink } from "@/sanity/schemas/objects/socialLink";

export const schemaTypes = [
  blockContent,
  localeString,
  localeText,
  localeSlug,
  localeBlockContent,
  cta,
  hero,
  seo,
  socialLink,
  page,
  portfolioItem,
  event,
  service,
  pressItem,
  siteSettings
];

