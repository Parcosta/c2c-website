import { defineArrayMember, defineField, defineType } from "sanity";

export const siteLabels = defineType({
  name: "siteLabels",
  title: "Site labels",
  type: "document",
  fields: [
    defineField({ name: "brand", title: "Brand", type: "localeString" }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "object",
      fields: [
        defineField({
          name: "primaryAriaLabel",
          title: "Primary nav aria label",
          type: "localeString"
        }),
        defineField({
          name: "mobileAriaLabel",
          title: "Mobile nav aria label",
          type: "localeString"
        }),
        defineField({
          name: "footerAriaLabel",
          title: "Footer nav aria label",
          type: "localeString"
        }),
        defineField({ name: "home", title: "Home", type: "localeString" }),
        defineField({ name: "portfolio", title: "Portfolio", type: "localeString" }),
        defineField({ name: "services", title: "Services", type: "localeString" }),
        defineField({ name: "press", title: "Press", type: "localeString" }),
        defineField({ name: "about", title: "About", type: "localeString" }),
        defineField({ name: "contact", title: "Contact", type: "localeString" }),
        defineField({ name: "booking", title: "Booking", type: "localeString" }),
        defineField({ name: "privacyPolicy", title: "Privacy policy", type: "localeString" }),
        defineField({ name: "terms", title: "Terms", type: "localeString" }),
        defineField({ name: "mobileMenu", title: "Mobile menu button", type: "localeString" }),
        defineField({ name: "close", title: "Close", type: "localeString" })
      ]
    }),
    defineField({
      name: "language",
      title: "Language switcher",
      type: "object",
      fields: [
        defineField({ name: "switchToEnglish", title: "Switch to English", type: "localeString" }),
        defineField({ name: "switchToSpanish", title: "Switch to Spanish", type: "localeString" })
      ]
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "contact", title: "Contact label", type: "localeString" }),
        defineField({ name: "language", title: "Language label", type: "localeString" }),
        defineField({ name: "follow", title: "Follow label", type: "localeString" }),
        defineField({ name: "rights", title: "Rights text", type: "localeString" }),
        defineField({ name: "tagline", title: "Tagline", type: "localeString" })
      ]
    }),
    defineField({
      name: "portfolioPage",
      title: "Portfolio page",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
        defineField({ name: "filtersLabel", title: "Filters aria label", type: "localeString" }),
        defineField({ name: "allFilter", title: "All filter", type: "localeString" }),
        defineField({ name: "liveFilter", title: "Live filter", type: "localeString" }),
        defineField({ name: "djFilter", title: "DJ filter", type: "localeString" }),
        defineField({ name: "studioFilter", title: "Studio filter", type: "localeString" }),
        defineField({ name: "itemsCountLabel", title: "Items count label", type: "localeString" })
      ]
    }),
    defineField({
      name: "contactPage",
      title: "Contact page",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
        defineField({
          name: "form",
          title: "Form labels",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "localeString" }),
            defineField({ name: "email", title: "Email", type: "localeString" }),
            defineField({ name: "message", title: "Message", type: "localeString" }),
            defineField({ name: "submit", title: "Submit", type: "localeString" }),
            defineField({ name: "sending", title: "Sending", type: "localeString" }),
            defineField({ name: "success", title: "Success", type: "localeString" }),
            defineField({ name: "error", title: "Error", type: "localeString" })
          ]
        })
      ]
    }),
    defineField({
      name: "bookingPage",
      title: "Booking page",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
        defineField({ name: "seoTitle", title: "SEO title", type: "localeString" }),
        defineField({ name: "seoDescription", title: "SEO description", type: "localeText" }),
        defineField({
          name: "form",
          title: "Form labels",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "localeString" }),
            defineField({ name: "email", title: "Email", type: "localeString" }),
            defineField({ name: "eventType", title: "Event type", type: "localeString" }),
            defineField({ name: "eventDate", title: "Event date", type: "localeString" }),
            defineField({ name: "location", title: "Location", type: "localeString" }),
            defineField({
              name: "locationPlaceholder",
              title: "Location placeholder",
              type: "localeString"
            }),
            defineField({ name: "message", title: "Message", type: "localeString" }),
            defineField({ name: "submit", title: "Submit", type: "localeString" }),
            defineField({ name: "sending", title: "Sending", type: "localeString" }),
            defineField({ name: "success", title: "Success", type: "localeString" }),
            defineField({ name: "error", title: "Error", type: "localeString" })
          ]
        }),
        defineField({
          name: "eventTypes",
          title: "Event types",
          type: "object",
          fields: [
            defineField({ name: "live", title: "Live", type: "localeString" }),
            defineField({ name: "dj", title: "DJ", type: "localeString" }),
            defineField({ name: "corporate", title: "Corporate", type: "localeString" }),
            defineField({ name: "private", title: "Private", type: "localeString" }),
            defineField({ name: "other", title: "Other", type: "localeString" })
          ]
        })
      ]
    }),
    defineField({
      name: "aboutPage",
      title: "About page labels",
      type: "object",
      fields: [
        defineField({
          name: "pageTitleFallback",
          title: "Page title fallback",
          type: "localeString"
        }),
        defineField({ name: "introFallback", title: "Intro fallback", type: "localeText" }),
        defineField({ name: "bioTitle", title: "Bio title", type: "localeString" }),
        defineField({ name: "bioEmpty", title: "Bio empty", type: "localeText" }),
        defineField({ name: "releasesTitle", title: "Releases title", type: "localeString" }),
        defineField({ name: "releasesEmpty", title: "Releases empty", type: "localeText" }),
        defineField({ name: "equipmentTitle", title: "Equipment title", type: "localeString" }),
        defineField({ name: "equipmentEmpty", title: "Equipment empty", type: "localeText" }),
        defineField({ name: "influencesTitle", title: "Influences title", type: "localeString" }),
        defineField({ name: "influencesEmpty", title: "Influences empty", type: "localeText" }),
        defineField({ name: "photoAltFallback", title: "Photo alt fallback", type: "localeString" })
      ]
    }),
    defineField({
      name: "servicesPage",
      title: "Services page labels",
      type: "object",
      fields: [
        defineField({ name: "seoTitle", title: "SEO title", type: "localeString" }),
        defineField({ name: "seoDescription", title: "SEO description", type: "localeText" }),
        defineField({ name: "heading", title: "Heading", type: "localeString" }),
        defineField({ name: "subheading", title: "Subheading", type: "localeText" }),
        defineField({ name: "jsonLdName", title: "JSON-LD name", type: "localeString" }),
        defineField({ name: "emptyMessage", title: "Empty message", type: "localeText" }),
        defineField({ name: "pricingLabel", title: "Pricing label", type: "localeString" }),
        defineField({
          name: "serviceFallbackTitle",
          title: "Service fallback title",
          type: "localeString"
        })
      ]
    }),
    defineField({
      name: "pressPage",
      title: "Press page labels",
      type: "object",
      fields: [
        defineField({
          name: "pageTitleFallback",
          title: "Page title fallback",
          type: "localeString"
        }),
        defineField({ name: "intro", title: "Intro", type: "localeText" }),
        defineField({ name: "bioTitle", title: "Bio title", type: "localeString" }),
        defineField({ name: "bioEmpty", title: "Bio empty", type: "localeText" }),
        defineField({
          name: "pressPhotosTitle",
          title: "Press photos title",
          type: "localeString"
        }),
        defineField({ name: "pressPhotosEmpty", title: "Press photos empty", type: "localeText" }),
        defineField({
          name: "pressMentionsTitle",
          title: "Press mentions title",
          type: "localeString"
        }),
        defineField({
          name: "pressMentionsEmpty",
          title: "Press mentions empty",
          type: "localeText"
        }),
        defineField({ name: "pressKitTitle", title: "Press kit title", type: "localeString" }),
        defineField({ name: "pressKitEmpty", title: "Press kit empty", type: "localeText" }),
        defineField({ name: "techRiderTitle", title: "Tech rider title", type: "localeString" }),
        defineField({ name: "techRiderEmpty", title: "Tech rider empty", type: "localeText" }),
        defineField({ name: "stagePlotTitle", title: "Stage plot title", type: "localeString" }),
        defineField({
          name: "stagePlotPlaceholder",
          title: "Stage plot placeholder",
          type: "localeText"
        }),
        defineField({ name: "bookingsTitle", title: "Bookings title", type: "localeString" }),
        defineField({ name: "bookingsEmpty", title: "Bookings empty", type: "localeText" }),
        defineField({ name: "downloadLabel", title: "Download label", type: "localeString" })
      ]
    }),
    defineField({
      name: "notFoundPage",
      title: "Not found page",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "body", title: "Body", type: "localeText" }),
        defineField({ name: "backHome", title: "Back home", type: "localeString" })
      ]
    }),
    defineField({
      name: "cookieConsent",
      title: "Cookie consent",
      type: "object",
      fields: [
        defineField({ name: "dialogAriaLabel", title: "Dialog aria label", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "description", title: "Description", type: "localeText" }),
        defineField({ name: "acceptAll", title: "Accept all", type: "localeString" }),
        defineField({
          name: "rejectNonEssential",
          title: "Reject non-essential",
          type: "localeString"
        }),
        defineField({ name: "customize", title: "Customize", type: "localeString" }),
        defineField({ name: "dialogTitle", title: "Dialog title", type: "localeString" }),
        defineField({ name: "dialogDescription", title: "Dialog description", type: "localeText" }),
        defineField({ name: "necessaryLabel", title: "Necessary label", type: "localeString" }),
        defineField({
          name: "necessaryDescription",
          title: "Necessary description",
          type: "localeText"
        }),
        defineField({ name: "analyticsLabel", title: "Analytics label", type: "localeString" }),
        defineField({
          name: "analyticsDescription",
          title: "Analytics description",
          type: "localeText"
        }),
        defineField({ name: "savePreferences", title: "Save preferences", type: "localeString" }),
        defineField({ name: "privacyPolicy", title: "Privacy policy label", type: "localeString" }),
        defineField({ name: "terms", title: "Terms label", type: "localeString" })
      ]
    })
  ],
  preview: {
    prepare() {
      return { title: "Site labels" };
    }
  }
});
