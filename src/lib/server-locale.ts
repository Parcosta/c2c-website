import type { Locale } from "@/lib/i18n";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Get locale from URL params (for server components)
 * This is the primary way to get locale in the new URL-based routing system
 */
export function getLocaleFromParams(params: { locale?: string }): Locale {
  if (params.locale && isLocale(params.locale)) {
    return params.locale;
  }
  return defaultLocale;
}

/**
 * @deprecated Use getLocaleFromParams instead.
 * This function is kept for backward compatibility during migration.
 * In the new URL-based routing system, locale comes from URL params, not cookies.
 */
export async function getServerLocale(): Promise<Locale> {
  // In the new system, this should not be used
  // Components should receive locale via props from [locale] layout
  console.warn("getServerLocale() is deprecated. Use locale from URL params instead.");
  return defaultLocale;
}
