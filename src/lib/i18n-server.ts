import { getClient } from "@/sanity/client";
import { groq } from "next-sanity";
import type { Locale } from "@/lib/i18n";

// Cache for UI content to avoid fetching repeatedly
const uiContentCache = new Map<Locale, Map<string, string>>();

export type UiContentMap = Map<string, string>;

async function fetchUiContentFromSanity(locale: Locale): Promise<UiContentMap> {
  if (uiContentCache.has(locale)) {
    return uiContentCache.get(locale)!;
  }

  try {
    const query = groq`*[_type == "uiContent"]{
      key,
      "text": text[$locale]
    }`;
    const results = await getClient().fetch<Array<{ key: string; text: string }>>(query, { locale });
    
    const contentMap = new Map<string, string>();
    for (const item of results) {
      if (item.key && item.text) {
        contentMap.set(item.key, item.text);
      }
    }
    
    uiContentCache.set(locale, contentMap);
    return contentMap;
  } catch {
    // Return empty map if fetch fails
    return new Map<string, string>();
  }
}

// Helper function to get a nested value using dot notation from the map
function getNestedValue(map: UiContentMap, key: string): string | undefined {
  // Try exact match first
  if (map.has(key)) {
    return map.get(key);
  }
  
  // Try building from nested keys (e.g., "nav.home" -> look for "nav.home" or "nav" object with "home" property)
  const parts = key.split(".");
  let currentKey = "";
  
  for (let i = 0; i < parts.length; i++) {
    currentKey = currentKey ? `${currentKey}.${parts[i]}` : parts[i];
    if (map.has(currentKey) && i === parts.length - 1) {
      return map.get(currentKey);
    }
  }
  
  return undefined;
}

export async function getTranslation(locale: Locale) {
  const contentMap = await fetchUiContentFromSanity(locale);

  return function t(key: string): string {
    const value = getNestedValue(contentMap, key);
    return value ?? key;
  };
}

export async function getUiContentMap(locale: Locale): Promise<UiContentMap> {
  return fetchUiContentFromSanity(locale);
}

// Fallback translations for when Sanity content is not available
const fallbackTranslations: Record<Locale, Record<string, string>> = {
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

export function getFallbackTranslation(locale: Locale, key: string): string {
  return fallbackTranslations[locale]?.[key] ?? key;
}
