import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { locales, defaultLocale } from "@/lib/i18n";

// Import translations directly to avoid HTTP backend issues during SSR
import enTranslations from "../../public/locales/en/translation.json";
import esTranslations from "../../public/locales/es/translation.json";

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations }
};

// Initialize i18next with bundled translations
// This avoids HTTP backend issues during SSR and E2E tests

const i18nInstance = i18n.use(initReactI18next).init({
  lng: defaultLocale,
  fallbackLng: "en",
  supportedLngs: [...locales],
  resources,

  interpolation: {
    escapeValue: false // React already escapes values
  },

  react: {
    useSuspense: false // Disable suspense to avoid SSR issues
  },

  // Debug mode in development
  debug: process.env.NODE_ENV === "development"
});

export default i18n;
export { i18nInstance };
