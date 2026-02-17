import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "localeString",
      description: "Optional pricing label (e.g. “Starting at $2,500”, “Custom quote”)."
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon identifier (e.g. a Lucide icon name)."
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "localeString" }]
    })
  ],
  preview: {
    select: { title: "title.en", subtitle: "icon" }
  }
});

