import * as React from "react";

import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Setup localStorage mock for CookieConsent tests
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
  },
  writable: true
});

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string | { src: string };
    alt: string;
    fill?: boolean;
    [key: string]: unknown;
  }) => {
    const resolvedSrc = typeof src === "string" ? src : src.src;
    const { fill: _fill, ...imgProps } = props;
    void _fill;
    return React.createElement("img", { src: resolvedSrc, alt, ...imgProps });
  }
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ref,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    ref?: React.Ref<HTMLAnchorElement>;
    [key: string]: unknown;
  }) => React.createElement("a", { ref, href, ...props }, children)
}));

vi.mock("next/navigation", () => ({
  usePathname: () =>
    (globalThis as unknown as { __NEXT_PATHNAME__?: string }).__NEXT_PATHNAME__ ?? "/en",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn()
  })
}));

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | number>) => {
      // Simple mock translations for tests
      const translations: Record<string, string> = {
        // Nav
        "nav.home": "Home",
        "nav.portfolio": "Portfolio",
        "nav.contact": "Contact",
        "nav.about": "About",
        "nav.services": "Services",
        "nav.press": "Press",
        "nav.store": "Store",
        "nav.mobileMenu": "Open menu",
        "nav.menuTitle": "Menu",
        "nav.menuDescription": "Primary navigation",
        // Brand
        brand: "Coast2Coast",
        "brand.full": "Coast2Coast",
        "brand.abbr": "C2C",
        // Hero
        "home.heroTitle": "Live modular techno & DJ sets",
        "home.heroSubtitle": "Coast2Coast (C2C) — bold sound, dark visuals, clean interface.",
        "home.heroCtaPrimary": "Get in touch",
        "home.heroCtaSecondary": "View portfolio",
        "home.metaDescription":
          "Live modular techno & DJ. Music, shows, and releases by Coast2Coast (C2C).",
        // Language
        "language.switchToEnglish": "Switch language to English",
        "language.switchToSpanish": "Switch language to Spanish",
        // Portfolio
        "portfolio.title": "Portfolio",
        "portfolio.subtitle": "Filter by category to explore selected work.",
        "portfolio.blockTitle": "Portfolio",
        "portfolio.blockSubtitle": "A selection of recent work, filterable by category.",
        "portfolio.emptyCategory": "No items in this category yet.",
        "portfolio.filters.all": "All",
        "portfolio.filters.live": "Live",
        "portfolio.filters.dj": "DJ",
        "portfolio.filters.studio": "Studio",
        // Contact
        "contact.title": "Contact",
        "contact.subtitle": "Send a quick message—no account required.",
        "contact.form.name": "Name",
        "contact.form.email": "Email",
        "contact.form.message": "Message",
        "contact.form.submit": "Submit",
        "contact.form.sending": "Sending…",
        "contact.form.success": "Message sent. Thanks!",
        "contact.form.error": "Something went wrong. Please try again.",
        // About
        "about.pageTitleFallback": "About",
        "about.introFallback": "Artist bio, releases, setup, and influences.",
        "about.bioTitle": "Artist bio",
        "about.bioEmpty": "Bio content will appear here once added in Sanity.",
        "about.releasesTitle": "Discography / releases",
        "about.releasesEmpty": "Releases will appear here once added in Sanity.",
        "about.equipmentTitle": "Equipment / setup",
        "about.equipmentEmpty": "Setup details will appear here once added in Sanity.",
        "about.influencesTitle": "Influences",
        "about.influencesEmpty": "Influences will appear here once added in Sanity.",
        "about.photoAltFallback": "Artist photo",
        // Press
        "press.pageTitleFallback": "Press / EPK",
        "press.intro": "Everything you need for press and bookings.",
        "press.bioTitle": "Bio",
        "press.bioEmpty": "Bio content will appear here once added in Sanity.",
        "press.pressPhotosTitle": "Press photos",
        "press.pressPhotosEmpty": "Press photos will appear here once added in Sanity.",
        "press.pressMentionsTitle": "Press mentions",
        "press.pressMentionsEmpty": "No press mentions yet.",
        "press.pressKitTitle": "Press kit downloads",
        "press.pressKitEmpty": "Downloadable assets will appear here once added in Sanity.",
        "press.techRiderTitle": "Tech rider",
        "press.techRiderEmpty": "Available upon request.",
        "press.stagePlotTitle": "Stage plot",
        "press.stagePlotPlaceholder": "Placeholder — available upon request.",
        "press.bookingsTitle": "Bookings",
        "press.bookingsEmpty": "Contact details will appear here once configured.",
        "press.downloadLabel": "Download",
        "press.viewLabel": "View",
        "press.readLink": "Read",
        "press.fallbackMention": "Press mention",
        // Footer
        "footer.contact": "Contact",
        "footer.language": "Language",
        "footer.follow": "Follow",
        "footer.rights": "All rights reserved.",
        "footer.tagline": "Modular techno & DJ sets",
        // Social
        "social.instagram": "Instagram",
        "social.soundcloud": "SoundCloud",
        "social.spotify": "Spotify",
        "social.youtube": "YouTube",
        // Services
        "services.title": "Services",
        "services.subtitle": "Everything we offer—explained in detail.",
        "services.empty": "No services are published yet.",
        "services.fallbackTitle": "Service",
        "services.pricingLabel": "Pricing",
        // Events
        "events.title": "Events",
        "events.subtitle": "Upcoming shows and appearances.",
        "events.ticketsLabel": "Tickets",
        // Gallery
        "gallery.noImage": "No image",
        "gallery.noImageAvailable": "No image available",
        "gallery.closeLightbox": "Close lightbox",
        "gallery.previousImage": "Previous image",
        "gallery.nextImage": "Next image",
        "gallery.imageCounter": "Image {{current}} of {{total}}",
        "gallery.lightboxInstructions":
          "Use arrow keys to navigate between images. Press Escape to close.",
        // Current Work
        "currentWork.title": "Current work",
        "currentWork.subtitle": "What I'm building right now.",
        "currentWork.label": "Latest project",
        "currentWork.comingSoon": "Coming soon",
        "currentWork.noMedia": "No media yet",
        "currentWork.fallbackDescription":
          "I'm currently working on the next piece in my portfolio. Check back soon for updates.",
        // Audio
        "audio.play": "Play",
        "audio.pause": "Pause",
        // Error
        "error.notFoundTitle": "Page not found",
        "error.notFoundDescription": "That route doesn't exist.",
        "error.backToHome": "Back to home",
        "error.title": "We hit a snag",
        "error.subtitle":
          "Try again in a moment. If the problem persists, return home and retry from there.",
        "error.tryAgain": "Try again",
        "error.goHome": "Go to homepage",
        "error.badgeError": "Error",
        "error.badgeMessage": "Something went wrong",
        "error.reference": "Reference",
        // Not Found (legacy keys)
        "notFound.title": "Page not found",
        "notFound.body": "That route doesn't exist.",
        "notFound.backHome": "Back to home",
        // Cookie Consent
        "cookieConsent.title": "Cookies & privacy",
        "cookieConsent.description":
          "We use essential cookies to make the site work and, with your permission, analytics cookies to understand usage and improve the experience.",
        "cookieConsent.acceptAll": "Accept all",
        "cookieConsent.rejectNonEssential": "Reject non-essential",
        "cookieConsent.customize": "Preferences",
        "cookieConsent.dialogTitle": "Cookie preferences",
        "cookieConsent.dialogDescription":
          "You can change your preferences at any time by clearing your browser cookies.",
        "cookieConsent.necessaryLabel": "Essential (always on)",
        "cookieConsent.necessaryDescription":
          "Required for security, navigation, and basic site functionality.",
        "cookieConsent.analyticsLabel": "Analytics",
        "cookieConsent.analyticsDescription":
          "Helps us measure site usage to improve performance and content.",
        "cookieConsent.savePreferences": "Save preferences",
        "cookieConsent.privacyPolicy": "Privacy Policy",
        "cookieConsent.terms": "Terms"
      };
      let result = translations[key] ?? key;
      // Handle interpolation for keys like {{current}}
      if (options) {
        Object.entries(options).forEach(([optKey, value]) => {
          result = result.replace(new RegExp(`{{${optKey}}}`, "g"), String(value));
        });
      }
      return result;
    },
    i18n: {
      changeLanguage: vi.fn(),
      language: "en"
    }
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children)
}));

// Mock i18next-http-backend
vi.mock("i18next-http-backend", () => ({
  default: class HttpBackend {}
}));

// Mock the i18n config
vi.mock("@/i18n", () => ({
  default: {
    use: () => ({
      init: vi.fn()
    }),
    changeLanguage: vi.fn(),
    language: "en"
  }
}));

vi.mock("@/i18n/types", () => ({}));
