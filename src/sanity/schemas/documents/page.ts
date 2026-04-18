import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({ name: "hero", title: "Hero", type: "hero" }),
    defineField({
      name: "homeSections",
      title: "Home page sections",
      description:
        "Only populate on the home page document (slug 'home'). Holds labels + media for all homepage sections below the hero.",
      type: "homeSections"
    }),
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
