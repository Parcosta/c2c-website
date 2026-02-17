import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({
      name: "photo",
      title: "Artist photo",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({ name: "photoAlt", title: "Photo alt text", type: "localeString" }),
    defineField({ name: "bio", title: "Bio", type: "localeBlockContent" }),
    defineField({
      name: "releases",
      title: "Discography / releases",
      type: "array",
      of: [
        {
          type: "object",
          name: "aboutRelease",
          fields: [
            defineField({ name: "title", title: "Title", type: "localeString" }),
            defineField({ name: "year", title: "Year", type: "number" }),
            defineField({ name: "label", title: "Label", type: "localeString" }),
            defineField({ name: "url", title: "Link (optional)", type: "url" })
          ],
          preview: {
            select: {
              title: "title.en",
              subtitle: "year"
            }
          }
        }
      ]
    }),
    defineField({
      name: "equipmentGroups",
      title: "Equipment / setup",
      type: "array",
      of: [
        {
          type: "object",
          name: "aboutEquipmentGroup",
          fields: [
            defineField({ name: "title", title: "Group title", type: "localeString" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "localeString" }]
            })
          ],
          preview: {
            select: { title: "title.en" }
          }
        }
      ]
    }),
    defineField({
      name: "influences",
      title: "Influences",
      type: "array",
      of: [{ type: "localeString" }]
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" })
  ],
  preview: {
    select: {
      title: "title.en"
    }
  }
});

