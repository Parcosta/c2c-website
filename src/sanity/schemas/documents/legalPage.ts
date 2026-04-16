import { defineArrayMember, defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
    defineField({ name: "lastUpdatedLabel", title: "Last updated label", type: "localeString" }),
    defineField({ name: "lastUpdated", title: "Last updated", type: "date" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "legalSection",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "localeString" }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "legalContentBlock",
                  fields: [
                    defineField({
                      name: "type",
                      title: "Block type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Paragraph", value: "p" },
                          { title: "Bullet list", value: "ul" },
                          { title: "Numbered list", value: "ol" },
                          { title: "Paragraph with links", value: "pWithLinks" }
                        ]
                      }
                    }),
                    defineField({ name: "text", title: "Text", type: "localeText" }),
                    defineField({
                      name: "items",
                      title: "Items",
                      type: "array",
                      of: [{ type: "localeString" }]
                    }),
                    defineField({
                      name: "parts",
                      title: "Linked text parts",
                      type: "array",
                      of: [
                        defineArrayMember({
                          type: "object",
                          name: "legalTextPart",
                          fields: [
                            defineField({ name: "text", title: "Text", type: "localeString" }),
                            defineField({ name: "href", title: "Href", type: "string" })
                          ],
                          preview: {
                            select: { title: "text.en", subtitle: "href" }
                          }
                        })
                      ]
                    })
                  ],
                  preview: {
                    select: { title: "text.en", subtitle: "type" }
                  }
                })
              ]
            })
          ],
          preview: {
            select: { title: "heading.en" }
          }
        })
      ]
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" })
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "slug.en.current"
    }
  }
});
