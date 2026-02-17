import { defineArrayMember, defineField, defineType } from "sanity";

export const photoGalleryBlock = defineType({
  name: "photoGalleryBlock",
  title: "Photo Gallery",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          name: "photoGalleryImage",
          title: "Photo",
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "localeString",
              validation: (Rule) => Rule.required()
            }),
            defineField({ name: "caption", title: "Caption", type: "localeString" })
          ],
          preview: {
            select: {
              title: "alt.en",
              media: "image"
            },
            prepare({ title, media }) {
              return { title: title ?? "Photo", media };
            }
          }
        })
      ],
      validation: (Rule) => Rule.min(1).max(48)
    })
  ],
  preview: {
    select: {
      title: "title.en",
      count: "images.length"
    },
    prepare({ title, count }) {
      const total = typeof count === "number" ? count : 0;
      return {
        title: title ?? "Photo Gallery",
        subtitle: `${total} photo${total === 1 ? "" : "s"}`
      };
    }
  }
});

