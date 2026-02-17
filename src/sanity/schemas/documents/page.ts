import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({ name: "hero", title: "Hero", type: "hero" }),
    defineField({ name: "body", title: "Body", type: "localeBlockContent" }),
    defineField({ name: "seo", title: "SEO", type: "seo" })
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "slug.en.current"
    }
  }
});
