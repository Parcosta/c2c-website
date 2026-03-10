export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Client-side locale detection (fallback only)
export function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;
  const browserLang = navigator.language.split("-")[0];
  return isLocale(browserLang) ? browserLang : defaultLocale;
}

// Get locale from URL pathname
export function getLocaleFromPathname(pathname: string): Locale | null {
  const match = pathname.match(/^\/(en|es)(?:\/|$)/);
  if (match && isLocale(match[1])) {
    return match[1];
  }
  return null;
}

// Strip locale prefix from pathname
export function stripLocaleFromPathname(pathname: string): string {
  const result = pathname.replace(/^\/(en|es)(?=\/|$)/, "");
  // Ensure we always return at least "/"
  return result || "/";
}

// Add locale prefix to pathname (only if not already present)
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  // Check if pathname already has a locale prefix
  if (getLocaleFromPathname(pathname)) {
    return pathname;
  }
  // Ensure pathname starts with /
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  // Handle root path
  if (normalizedPath === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalizedPath}`;
}

// Switch locale in pathname
export function switchLocaleInPathname(pathname: string, newLocale: Locale): string {
  const currentLocale = getLocaleFromPathname(pathname);
  if (currentLocale) {
    // Replace existing locale
    return pathname.replace(/^\/(en|es)/, `/${newLocale}`);
  }
  // Add locale prefix
  return addLocaleToPathname(pathname, newLocale);
}
