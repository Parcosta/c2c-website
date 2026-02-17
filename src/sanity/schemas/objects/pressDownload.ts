import { defineField, defineType } from "sanity";

export const pressDownload = defineType({
  name: "pressDownload",
  title: "Press download",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "file", title: "File", type: "file" })
  ],
  preview: {
    select: { title: "title.en" }
  }
});

