import { blockContent } from "@/sanity/schemas/blocks/blockContent";
import { servicesBlock } from "@/sanity/schemas/blocks/servicesBlock";
import { aboutPage } from "@/sanity/schemas/documents/aboutPage";
import { event } from "@/sanity/schemas/documents/event";
import { page } from "@/sanity/schemas/documents/page";
import { portfolioItem } from "@/sanity/schemas/documents/portfolioItem";
import { pressItem } from "@/sanity/schemas/documents/pressItem";
import { pressPage } from "@/sanity/schemas/documents/pressPage";
import { service } from "@/sanity/schemas/documents/service";
import { siteSettings } from "@/sanity/schemas/documents/siteSettings";
import { localeBlockContent } from "@/sanity/schemas/localized/localeBlockContent";
import { localeSlug } from "@/sanity/schemas/localized/localeSlug";
import { localeString } from "@/sanity/schemas/localized/localeString";
import { localeText } from "@/sanity/schemas/localized/localeText";
import { cta } from "@/sanity/schemas/objects/cta";
import { hero } from "@/sanity/schemas/objects/hero";
import { pressDownload } from "@/sanity/schemas/objects/pressDownload";
import { pressPhoto } from "@/sanity/schemas/objects/pressPhoto";
import { seo } from "@/sanity/schemas/objects/seo";
import { socialLink } from "@/sanity/schemas/objects/socialLink";

export const schemaTypes = [
  blockContent,
  servicesBlock,
  localeString,
  localeText,
  localeSlug,
  localeBlockContent,
  cta,
  hero,
  seo,
  socialLink,
  pressPhoto,
  pressDownload,
  aboutPage,
  page,
  portfolioItem,
  event,
  service,
  pressItem,
  pressPage,
  siteSettings
];
