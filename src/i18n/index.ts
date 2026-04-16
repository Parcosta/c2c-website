import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

import { locales, defaultLocale } from "@/lib/i18n";

// Import base translations for SSR/E2E compatibility
// These are used as fallback when HTTP backend can't fetch (during SSR)
import enTranslations from "../../public/locales/en/translation.json";
import esTranslations from "../../public/locales/es/translation.json";

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations }
};

// Determine if we're in a browser environment
const isBrowser = typeof window !== "undefined";

// Initialize i18next
// - In browser: Uses HTTP backend to fetch latest translations (allows CMS updates)
// - During SSR/E2E: Uses bundled translations (avoids URL resolution issues)
const i18nInstance = i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: defaultLocale,
    fallbackLng: "en",
    supportedLngs: [...locales],

    // Preload bundled resources for SSR/E2E compatibility
    resources,

    // HTTP backend config - only used in browser
    backend: isBrowser
      ? {
          loadPath: "/locales/{{lng}}/translation.json"
        }
      : undefined,

    interpolation: {
      escapeValue: false // React already escapes values
    },

    react: {
      useSuspense: false // Disable suspense to avoid SSR issues
    },

    // Debug mode in development
    debug: process.env.NODE_ENV === "development",

    // Add a default namespace
    defaultNS: "translation",

    // Ensure we wait for translations to load in browser
    initImmediate: false
  });

export default i18n;
export { i18nInstance };
