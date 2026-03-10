import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { locales, defaultLocale, type Locale } from "@/lib/i18n";

// Client-side i18n initialization
// Uses cookie-based locale detection, no HTTP backend needed

const fallbackResources: Record<Locale, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.press": "Press",
    "nav.store": "Store",
    "hero.title": "Live modular techno & DJ sets",
    "hero.subtitle": "Coast2Coast (C2C) — bold sound, dark visuals, clean interface.",
    "hero.ctaPrimary": "Get in touch",
    "hero.ctaSecondary": "View portfolio",
    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "Filter by category to explore selected work.",
    "portfolio.filters.all": "All",
    "portfolio.filters.live": "Live",
    "portfolio.filters.dj": "DJ",
    "portfolio.filters.studio": "Studio",
    "contact.title": "Contact",
    "contact.subtitle": "Send a quick message—no account required.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Submit",
    "contact.form.sending": "Sending…",
    "contact.form.success": "Message sent. Thanks!",
    "contact.form.error": "Something went wrong. Please try again.",
    "language.switchToEnglish": "Switch language to English",
    "language.switchToSpanish": "Switch language to Spanish",
    "footer.contact": "Contact",
    "footer.language": "Language",
    "footer.follow": "Follow",
    "footer.rights": "All rights reserved."
  },
  es: {
    "nav.home": "Inicio",
    "nav.portfolio": "Portafolio",
    "nav.contact": "Contacto",
    "nav.about": "Sobre mí",
    "nav.services": "Servicios",
    "nav.press": "Prensa",
    "nav.store": "Tienda",
    "hero.title": "Techno modular en vivo y sets de DJ",
    "hero.subtitle": "Coast2Coast (C2C) — sonido audaz, visuales oscuros, interfaz limpia.",
    "hero.ctaPrimary": "Contactar",
    "hero.ctaSecondary": "Ver portafolio",
    "portfolio.title": "Portafolio",
    "portfolio.subtitle": "Filtra por categoría para explorar trabajos seleccionados.",
    "portfolio.filters.all": "Todos",
    "portfolio.filters.live": "En vivo",
    "portfolio.filters.dj": "DJ",
    "portfolio.filters.studio": "Estudio",
    "contact.title": "Contacto",
    "contact.subtitle": "Envía un mensaje rápido—sin cuenta.",
    "contact.form.name": "Nombre",
    "contact.form.email": "Email",
    "contact.form.message": "Mensaje",
    "contact.form.submit": "Enviar",
    "contact.form.sending": "Enviando…",
    "contact.form.success": "Mensaje enviado. ¡Gracias!",
    "contact.form.error": "Algo salió mal. Intenta de nuevo.",
    "language.switchToEnglish": "Cambiar idioma a inglés",
    "language.switchToSpanish": "Cambiar idioma a español",
    "footer.contact": "Contacto",
    "footer.language": "Idioma",
    "footer.follow": "Seguir",
    "footer.rights": "Todos los derechos reservados."
  }
};

const i18nInstance = i18n.use(initReactI18next).init({
  lng: defaultLocale,
  fallbackLng: "en",
  supportedLngs: [...locales],
  resources: {
    en: { translation: fallbackResources.en },
    es: { translation: fallbackResources.es }
  },
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
