import fs from "fs/promises";
import path from "path";

import type { Locale } from "@/lib/i18n";

// Cache for translations to avoid reading files repeatedly
const translationCache = new Map<Locale, Record<string, unknown>>();

async function loadTranslationFile(locale: Locale): Promise<Record<string, unknown>> {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  try {
    const filePath = path.join(process.cwd(), "public", "locales", locale, "translation.json");
    const content = await fs.readFile(filePath, "utf-8");
    const translations = JSON.parse(content) as Record<string, unknown>;
    translationCache.set(locale, translations);
    return translations;
  } catch {
    // Fallback to English if file not found
    if (locale !== "en") {
      return loadTranslationFile("en");
    }
    return {};
  }
}

// Helper function to get a nested value from an object using dot notation
function getNestedValue(obj: Record<string, unknown>, key: string): string | undefined {
  const keys = key.split(".");
  let current: unknown = obj;

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

export async function getTranslation(locale: Locale) {
  const translations = await loadTranslationFile(locale);

  return function t(key: string): string {
    const value = getNestedValue(translations, key);
    return value ?? key;
  };
}
