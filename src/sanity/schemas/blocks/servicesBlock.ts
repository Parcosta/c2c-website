import { defineField, defineType } from "sanity";

export const servicesBlock = defineType({
  name: "servicesBlock",
  title: "Services Block",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (Rule) => Rule.min(1)
    })
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "services.length"
    },
    prepare({ title, subtitle }) {
      const count = typeof subtitle === "number" ? subtitle : 0;
      return {
        title: title ?? "Services",
        subtitle: `${count} service${count === 1 ? "" : "s"}`
      };
    }
  }
});
