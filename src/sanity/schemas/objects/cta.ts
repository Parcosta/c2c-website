import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({
      name: "href",
      title: "Link",
      description:
        "Relative path (e.g. /booking) or a full URL (e.g. https://example.com). Relative paths are automatically locale-prefixed at render time.",
      type: "string"
    })
  ]
});
