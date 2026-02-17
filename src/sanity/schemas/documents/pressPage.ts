import { defineField, defineType } from "sanity";

export const pressPage = defineType({
  name: "pressPage",
  title: "Press / EPK page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "bio", title: "Bio", type: "localeBlockContent" }),
    defineField({
      name: "pressPhotos",
      title: "Press photos",
      type: "array",
      of: [{ type: "pressPhoto" }]
    }),
    defineField({
      name: "pressKitAssets",
      title: "Press kit assets",
      type: "array",
      of: [{ type: "pressDownload" }]
    }),
    defineField({
      name: "techRider",
      title: "Tech rider (PDF)",
      type: "file"
    }),
    defineField({
      name: "stagePlot",
      title: "Stage plot (PDF)",
      type: "file"
    }),
    defineField({
      name: "bookingsEmail",
      title: "Bookings email (optional override)",
      type: "string"
    }),
    defineField({
      name: "bookingsPhone",
      title: "Bookings phone (optional)",
      type: "string"
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" })
  ],
  preview: {
    select: {
      title: "title.en"
    }
  }
});

