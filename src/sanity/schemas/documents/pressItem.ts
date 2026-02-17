import { defineField, defineType } from "sanity";

export const pressItem = defineType({
  name: "pressItem",
  title: "Press item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "publication", title: "Publication", type: "localeString" }),
    defineField({ name: "date", title: "Date", type: "datetime" }),
    defineField({ name: "url", title: "URL", type: "url" }),
    defineField({ name: "quote", title: "Quote", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } })
  ],
  preview: {
    select: { title: "title.en", subtitle: "publication.en", media: "image" }
  }
});
