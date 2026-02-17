import { defineField, defineType } from "sanity";

export const localeSlug = defineType({
  name: "localeSlug",
  title: "Localized slug",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "slug" }),
    defineField({ name: "es", title: "Español", type: "slug" })
  ]
});

