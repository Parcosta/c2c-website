import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

import { locales, defaultLocale } from "@/lib/i18n";

// Initialize i18next with HttpBackend for loading translation files
// This is configured for client-side usage with Next.js App Router

const i18nInstance = i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: defaultLocale,
    fallbackLng: "en",
    supportedLngs: [...locales],
    
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: false, // Disable suspense to avoid SSR issues
    },
    
    // Debug mode in development
    debug: process.env.NODE_ENV === "development",
  });

export default i18n;
export { i18nInstance };
