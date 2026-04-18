import { defineArrayMember, defineField, defineType } from "sanity";

export const homeSections = defineType({
  name: "homeSections",
  title: "Home page sections",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "heroEyebrows",
      title: "Hero eyebrow tags",
      description:
        "Small uppercase labels shown above the hero heading (e.g. 'Artista multimedia', 'Síntesis modular').",
      type: "array",
      of: [{ type: "localeString" }]
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero secondary CTA",
      type: "cta"
    }),
    defineField({
      name: "heroAudioTrackLabel",
      title: "Hero audio track placeholder label",
      description:
        "Placeholder shown in the hero's inline audio player when no track is selected (e.g. 'NOMBRE DEL TEMA').",
      type: "localeString"
    }),
    defineField({
      name: "servicesSection",
      title: "Services section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "description", title: "Description", type: "localeText" }),
        defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
        defineField({
          name: "ctaHref",
          title: "CTA link (path)",
          type: "string",
          description: "Relative path the CTA links to, e.g. /booking"
        })
      ]
    }),
    defineField({
      name: "eventsSection",
      title: "Events section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({
          name: "moreInfoLabel",
          title: "“More info” link label",
          description: "Per-row link label (e.g. 'MÁS INFO').",
          type: "localeString"
        }),
        defineField({
          name: "ticketsLabel",
          title: "Tickets button label",
          description: "Label on the per-event tickets button (e.g. 'Tickets' / 'Entradas').",
          type: "localeString"
        })
      ]
    }),
    defineField({
      name: "newsSection",
      title: "News section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "ctaLabel", title: "Per-row CTA label", type: "localeString" })
      ]
    }),
    defineField({
      name: "multimediaCtaSection",
      title: "Multimedia CTA section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "description", title: "Description", type: "localeText" }),
        defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
        defineField({
          name: "ctaHref",
          title: "CTA link (path)",
          type: "string",
          description: "Relative path the CTA links to, e.g. /booking"
        })
      ]
    }),
    defineField({
      name: "gallerySection",
      title: "Gallery section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "description", title: "Description", type: "localeText" }),
        defineField({
          name: "images",
          title: "Gallery images",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "homeGalleryImage",
              title: "Gallery image",
              fields: [
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true }
                }),
                defineField({
                  name: "alt",
                  title: "Alt text",
                  type: "localeString"
                }),
                defineField({
                  name: "caption",
                  title: "Caption",
                  type: "localeString"
                })
              ],
              preview: {
                select: { title: "caption.en", media: "image" },
                prepare({ title, media }) {
                  return { title: title || "Gallery image", media };
                }
              }
            })
          ]
        })
      ]
    })
  ]
});
