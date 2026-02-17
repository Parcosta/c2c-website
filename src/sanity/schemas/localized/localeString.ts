import { defineField, defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "es", title: "Español", type: "string" })
  ],
  preview: {
    select: { title: "en" },
    prepare({ title }) {
      return { title: title ?? "(no English value)" };
    }
  }
});
