import type { Locale } from "./i18n";

// Server-side translation loader for Next.js App Router
// This loads translations synchronously on the server

const translationCache: Record<Locale, Record<string, unknown> | null> = {
  en: null,
  es: null
};

export async function loadTranslations(locale: Locale): Promise<Record<string, unknown>> {
  if (translationCache[locale]) {
    return translationCache[locale]!;
  }

  try {
    // In production, translations are in the public folder
    // We need to read them from the file system
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");

    const filePath = join(process.cwd(), "public", "locales", locale, "translation.json");
    const content = await readFile(filePath, "utf-8");
    const translations = JSON.parse(content);

    translationCache[locale] = translations;
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error);
    return {};
  }
}

export function getTranslation(
  translations: Record<string, unknown>,
  key: string
): string {
  const keys = key.split(".");
  let value: unknown = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return the key if translation not found
    }
  }

  return typeof value === "string" ? value : key;
}
