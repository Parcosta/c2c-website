import { defineField, defineType } from "sanity";

export const uiContent = defineType({
  name: "uiContent",
  title: "UI Content",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Unique identifier for this UI string (e.g., 'nav.home', 'hero.title')"
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Navigation", value: "nav" },
          { title: "Hero", value: "hero" },
          { title: "Common UI", value: "common" },
          { title: "Footer", value: "footer" },
          { title: "Portfolio", value: "portfolio" },
          { title: "Contact", value: "contact" },
          { title: "About", value: "about" },
          { title: "Press", value: "press" },
          { title: "Services", value: "services" },
          { title: "Error Pages", value: "error" },
          { title: "Cookie Consent", value: "cookie" },
          { title: "Language", value: "language" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "localeString",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "Internal note about where this text is used"
    })
  ],
  preview: {
    select: {
      title: "key",
      subtitle: "category",
      textEn: "text.en"
    },
    prepare({ title, subtitle, textEn }) {
      return {
        title: title ?? "Untitled",
        subtitle: `${subtitle ?? "No category"} — ${textEn ?? ""}`
      };
    }
  }
});
