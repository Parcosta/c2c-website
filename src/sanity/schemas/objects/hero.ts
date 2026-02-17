import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "localeString" }),
    defineField({ name: "subheading", title: "Subheading", type: "localeText" }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({ name: "cta", title: "CTA", type: "cta" })
  ]
});
