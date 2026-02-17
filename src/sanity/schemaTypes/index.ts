import { type SchemaTypeDefinition } from 'sanity'

import { blockContent } from "../schemas/blocks/blockContent";
import { servicesBlock } from "../schemas/blocks/servicesBlock";
import { aboutPage } from "../schemas/documents/aboutPage";
import { event } from "../schemas/documents/event";
import { page } from "../schemas/documents/page";
import { portfolioItem } from "../schemas/documents/portfolioItem";
import { pressItem } from "../schemas/documents/pressItem";
import { pressPage } from "../schemas/documents/pressPage";
import { service } from "../schemas/documents/service";
import { siteSettings } from "../schemas/documents/siteSettings";
import { localeBlockContent } from "../schemas/localized/localeBlockContent";
import { localeSlug } from "../schemas/localized/localeSlug";
import { localeString } from "../schemas/localized/localeString";
import { localeText } from "../schemas/localized/localeText";
import { cta } from "../schemas/objects/cta";
import { hero } from "../schemas/objects/hero";
import { pressDownload } from "../schemas/objects/pressDownload";
import { pressPhoto } from "../schemas/objects/pressPhoto";
import { seo } from "../schemas/objects/seo";
import { socialLink } from "../schemas/objects/socialLink";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
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
  ],
}
