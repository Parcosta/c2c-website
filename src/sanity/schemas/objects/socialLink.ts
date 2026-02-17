import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "YouTube", value: "youtube" },
          { title: "SoundCloud", value: "soundcloud" },
          { title: "Bandcamp", value: "bandcamp" },
          { title: "Spotify", value: "spotify" },
          { title: "Apple Music", value: "appleMusic" },
          { title: "TikTok", value: "tiktok" },
          { title: "X (Twitter)", value: "x" },
          { title: "Facebook", value: "facebook" },
          { title: "Website", value: "website" }
        ]
      }
    }),
    defineField({ name: "url", title: "URL", type: "url" })
  ],
  preview: {
    select: { title: "platform", subtitle: "url" }
  }
});
