export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return null;
  return isLocale(segment) ? segment : null;
}

export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (!isLocale(parts[0])) return pathname.startsWith("/") ? pathname : `/${pathname}`;
  const rest = parts.slice(1).join("/");
  return `/${rest}`;
}

export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const existing = getLocaleFromPathname(normalized);
  if (existing) return normalized;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function switchLocaleInPathname(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const parts = normalized.split("/").filter(Boolean);
  const rest = parts.length > 0 && isLocale(parts[0]) ? parts.slice(1) : parts;
  return `/${[locale, ...rest].join("/")}`.replace(/\/+$/, "") || "/";
}
