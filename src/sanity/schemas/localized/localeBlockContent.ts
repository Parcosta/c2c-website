import { defineField, defineType } from "sanity";

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "blockContent" }),
    defineField({ name: "es", title: "Español", type: "blockContent" })
  ]
});

