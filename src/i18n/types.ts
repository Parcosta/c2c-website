// TypeScript types for i18next translation keys
// This file provides autocomplete support for the useTranslation hook

// With Sanity as the source of truth for translations, we use a flexible approach
// Translation keys are validated at runtime against Sanity content

// Use a simple record type for translations
export type TranslationResources = Record<string, unknown>;

// Simple type for translation keys - using string for flexibility
export type TranslationKeys = string;

// Namespace for translations
export type TranslationNamespace = "translation";

// Default resources type for i18next - using flexible type
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: TranslationResources;
    };
  }
}
