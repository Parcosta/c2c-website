// TypeScript types for i18next translation keys
// This file provides autocomplete support for the useTranslation hook

import en from "../../public/locales/en/translation.json";

// Export the translation resources type
export type TranslationResources = typeof en;

// Simple type for translation keys - using string for flexibility
// Full autocomplete can be achieved with proper IDE plugins
export type TranslationKeys = string;

// Namespace for translations
export type TranslationNamespace = "translation";

// Default resources type for i18next
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof en;
    };
  }
}
