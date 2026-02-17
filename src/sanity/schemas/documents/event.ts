import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "date", title: "Date", type: "datetime" }),
    defineField({ name: "venue", title: "Venue", type: "localeString" }),
    defineField({ name: "city", title: "City", type: "localeString" }),
    defineField({ name: "country", title: "Country", type: "localeString" }),
    defineField({ name: "ticketUrl", title: "Ticket URL", type: "url" }),
    defineField({ name: "flyer", title: "Flyer", type: "image", options: { hotspot: true } })
  ],
  preview: {
    select: { title: "title.en", subtitle: "venue.en", media: "flyer" }
  }
});
