// TypeScript types for i18next translation keys
// This file provides autocomplete support for the useTranslation hook

// Define the translation structure inline since we removed JSON files
export type TranslationResources = {
  brand: string;
  nav: {
    home: string;
    portfolio: string;
    contact: string;
    about: string;
    services: string;
    press: string;
    store: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      live: string;
      dj: string;
      studio: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  language: {
    switchToEnglish: string;
    switchToSpanish: string;
  };
  footer: {
    contact: string;
    language: string;
    follow: string;
    rights: string;
  };
  cookieConsent: {
    title: string;
    description: string;
    acceptAll: string;
    rejectNonEssential: string;
    customize: string;
    privacyPolicy: string;
    terms: string;
    dialogTitle: string;
    dialogDescription: string;
    necessaryLabel: string;
    necessaryDescription: string;
    analyticsLabel: string;
    analyticsDescription: string;
    savePreferences: string;
  };
  press: {
    pageTitleFallback: string;
    intro: string;
    bioTitle: string;
    bioEmpty: string;
    pressPhotosTitle: string;
    pressPhotosEmpty: string;
    pressMentionsTitle: string;
    pressMentionsEmpty: string;
    pressKitTitle: string;
    pressKitEmpty: string;
    techRiderTitle: string;
    techRiderEmpty: string;
    stagePlotTitle: string;
    stagePlotPlaceholder: string;
    bookingsTitle: string;
    bookingsEmpty: string;
    downloadLabel: string;
    viewLabel: string;
  };
  about: {
    pageTitleFallback: string;
    introFallback: string;
    bioTitle: string;
    bioEmpty: string;
    releasesTitle: string;
    releasesEmpty: string;
    equipmentTitle: string;
    equipmentEmpty: string;
    influencesTitle: string;
    influencesEmpty: string;
    photoAltFallback: string;
  };
  notFound: {
    title: string;
    body: string;
    backHome: string;
  };
};

// Simple type for translation keys - using string for flexibility
export type TranslationKeys = string;

// Namespace for translations
export type TranslationNamespace = "translation";

// Default resources type for i18next
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: TranslationResources;
    };
  }
}
