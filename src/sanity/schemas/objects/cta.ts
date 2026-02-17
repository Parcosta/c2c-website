import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({ name: "href", title: "URL", type: "url" })
  ]
});

