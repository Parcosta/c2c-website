import { defineField, defineType } from "sanity";

export const pressPhoto = defineType({
  name: "pressPhoto",
  title: "Press photo",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true }
    })
  ],
  preview: {
    select: { title: "title.en", media: "image" }
  }
});

