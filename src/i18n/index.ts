import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { locales, defaultLocale, type Locale } from "@/lib/i18n";

// Client-side i18n initialization
// Uses cookie-based locale detection, no HTTP backend needed

const fallbackResources: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
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

    // Language
    "language.switchToEnglish": "Switch language to English",
    "language.switchToSpanish": "Switch language to Spanish",

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

    // Press
    "press.readLink": "Read",
    "press.fallbackMention": "Press mention",

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

    // Cookie Consent
    "cookieConsent.title": "Cookie Settings",
    "cookieConsent.description":
      "We use cookies to enhance your browsing experience and analyze our traffic.",
    "cookieConsent.privacyPolicy": "Privacy Policy",
    "cookieConsent.terms": "Terms",
    "cookieConsent.rejectNonEssential": "Reject non-essential",
    "cookieConsent.acceptAll": "Accept all",
    "cookieConsent.customize": "Customize",
    "cookieConsent.dialogTitle": "Cookie Preferences",
    "cookieConsent.dialogDescription": "Choose which cookies you want to accept.",
    "cookieConsent.necessaryLabel": "Necessary",
    "cookieConsent.necessaryDescription": "Essential for the website to function properly.",
    "cookieConsent.analyticsLabel": "Analytics",
    "cookieConsent.analyticsDescription":
      "Helps us understand how visitors interact with our website.",
    "cookieConsent.savePreferences": "Save preferences"
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.portfolio": "Portafolio",
    "nav.contact": "Contacto",
    "nav.about": "Sobre mí",
    "nav.services": "Servicios",
    "nav.press": "Prensa",
    "nav.store": "Tienda",
    "nav.mobileMenu": "Abrir menú",
    "nav.menuTitle": "Menú",
    "nav.menuDescription": "Navegación principal",

    // Brand
    brand: "Coast2Coast",
    "brand.full": "Coast2Coast",
    "brand.abbr": "C2C",

    // Hero
    "home.heroTitle": "Techno modular en vivo y sets de DJ",
    "home.heroSubtitle": "Coast2Coast (C2C) — sonido audaz, visuales oscuros, interfaz limpia.",
    "home.heroCtaPrimary": "Contactar",
    "home.heroCtaSecondary": "Ver portafolio",
    "home.metaDescription":
      "Techno modular en vivo y DJ. Música, shows y lanzamientos de Coast2Coast (C2C).",

    // Portfolio
    "portfolio.title": "Portafolio",
    "portfolio.subtitle": "Filtra por categoría para explorar trabajos seleccionados.",
    "portfolio.blockTitle": "Portafolio",
    "portfolio.blockSubtitle": "Una selección de trabajos recientes, filtrables por categoría.",
    "portfolio.emptyCategory": "No hay elementos en esta categoría todavía.",
    "portfolio.filters.all": "Todos",
    "portfolio.filters.live": "En vivo",
    "portfolio.filters.dj": "DJ",
    "portfolio.filters.studio": "Estudio",

    // Contact
    "contact.title": "Contacto",
    "contact.subtitle": "Envía un mensaje rápido—sin cuenta.",
    "contact.form.name": "Nombre",
    "contact.form.email": "Email",
    "contact.form.message": "Mensaje",
    "contact.form.submit": "Enviar",
    "contact.form.sending": "Enviando…",
    "contact.form.success": "Mensaje enviado. ¡Gracias!",
    "contact.form.error": "Algo salió mal. Intenta de nuevo.",

    // Language
    "language.switchToEnglish": "Cambiar idioma a inglés",
    "language.switchToSpanish": "Cambiar idioma a español",

    // Footer
    "footer.contact": "Contacto",
    "footer.language": "Idioma",
    "footer.follow": "Seguir",
    "footer.rights": "Todos los derechos reservados.",
    "footer.tagline": "Techno modular y sets de DJ",

    // Social
    "social.instagram": "Instagram",
    "social.soundcloud": "SoundCloud",
    "social.spotify": "Spotify",
    "social.youtube": "YouTube",

    // Services
    "services.title": "Servicios",
    "services.subtitle": "Todo lo que ofrecemos—en detalle.",
    "services.empty": "No hay servicios publicados todavía.",
    "services.fallbackTitle": "Servicio",
    "services.pricingLabel": "Precio",

    // Events
    "events.title": "Eventos",
    "events.subtitle": "Próximos shows y presentaciones.",
    "events.ticketsLabel": "Entradas",

    // Press
    "press.readLink": "Leer",
    "press.fallbackMention": "Mención en prensa",

    // Gallery
    "gallery.noImage": "Sin imagen",
    "gallery.noImageAvailable": "No hay imagen disponible",
    "gallery.closeLightbox": "Cerrar vista ampliada",
    "gallery.previousImage": "Imagen anterior",
    "gallery.nextImage": "Imagen siguiente",
    "gallery.imageCounter": "Imagen {{current}} de {{total}}",
    "gallery.lightboxInstructions":
      "Usa las flechas para navegar entre imágenes. Presiona Escape para cerrar.",

    // Current Work
    "currentWork.title": "Trabajo actual",
    "currentWork.subtitle": "En qué estoy trabajando ahora.",
    "currentWork.label": "Proyecto más reciente",
    "currentWork.comingSoon": "Próximamente",
    "currentWork.noMedia": "Sin contenido multimedia todavía",
    "currentWork.fallbackDescription":
      "Actualmente estoy trabajando en la siguiente pieza de mi portafolio. Vuelve pronto para ver actualizaciones.",

    // Audio
    "audio.play": "Reproducir",
    "audio.pause": "Pausar",

    // Error
    "error.notFoundTitle": "Página no encontrada",
    "error.notFoundDescription": "Esa ruta no existe.",
    "error.backToHome": "Volver al inicio",
    "error.title": "Encontramos un problema",
    "error.subtitle":
      "Inténtalo de nuevo en un momento. Si el problema persiste, regresa al inicio e intenta desde allí.",
    "error.tryAgain": "Intentar de nuevo",
    "error.goHome": "Ir al inicio",
    "error.badgeError": "Error",
    "error.badgeMessage": "Algo salió mal",
    "error.reference": "Referencia",

    // Cookie Consent
    "cookieConsent.title": "Configuración de cookies",
    "cookieConsent.description":
      "Usamos cookies para mejorar tu experiencia de navegación y analizar nuestro tráfico.",
    "cookieConsent.privacyPolicy": "Política de privacidad",
    "cookieConsent.terms": "Términos",
    "cookieConsent.rejectNonEssential": "Rechazar no esenciales",
    "cookieConsent.acceptAll": "Aceptar todas",
    "cookieConsent.customize": "Personalizar",
    "cookieConsent.dialogTitle": "Preferencias de cookies",
    "cookieConsent.dialogDescription": "Elige qué cookies quieres aceptar.",
    "cookieConsent.necessaryLabel": "Necesarias",
    "cookieConsent.necessaryDescription":
      "Esenciales para que el sitio web funcione correctamente.",
    "cookieConsent.analyticsLabel": "Analíticas",
    "cookieConsent.analyticsDescription":
      "Nos ayuda a entender cómo los visitantes interactúan con nuestro sitio.",
    "cookieConsent.savePreferences": "Guardar preferencias"
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
