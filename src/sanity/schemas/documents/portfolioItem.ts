import { defineField, defineType } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "slug", title: "Slug", type: "localeSlug" }),
    defineField({
      name: "category",
      title: "Category (display label)",
      description: "Free-form localized category shown on portfolio detail/grid pages.",
      type: "localeString"
    }),
    defineField({
      name: "filterCategory",
      title: "Homepage filter category",
      description:
        "Constrained key used by the homepage projects filter tabs. Human-readable labels for each key live in siteLabels.projectsPage.filters. Leave blank to exclude from the homepage filters.",
      type: "string",
      options: {
        list: [
          { title: "Music (musica)", value: "musica" },
          { title: "Sound (sonoro)", value: "sonoro" },
          { title: "Video remixes (video)", value: "video" },
          { title: "Mixes (mixes)", value: "mixes" },
          { title: "Dev (dev)", value: "dev" }
        ],
        layout: "radio"
      }
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    }),
    defineField({
      name: "featuredMedia",
      title: "Featured media",
      description:
        "Optional hero media shown on homepage (image or video). Defaults to first image.",
      type: "array",
      of: [
        { type: "image", options: { hotspot: true } },
        { type: "file", options: { accept: "video/*" } }
      ],
      validation: (rule) => rule.max(1)
    }),
    defineField({ name: "description", title: "Description", type: "localeBlockContent" }),
    defineField({ name: "date", title: "Date", type: "datetime" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] })
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "category.en",
      featured: "featuredMedia.0",
      image: "images.0"
    },
    prepare({ title, subtitle, featured, image }) {
      return {
        title,
        subtitle,
        media: featured ?? image
      };
    }
  }
});
