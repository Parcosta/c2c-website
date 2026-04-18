/**
 * Sanity-content access helpers.
 *
 * Every user-facing string rendered by the app must flow through these
 * helpers. They encode the "content is Sanity-only" contract:
 *
 *  - Required content that is missing in Sanity is a content error.
 *    In development, we throw loudly with the document path and locale so
 *    it's impossible to miss.
 *  - In production, we fall back to a silent empty string and log the error
 *    via `console.error` (pick up in Sentry / CloudWatch / etc.) so one
 *    editorial typo doesn't take down the whole page for visitors.
 *
 * Prefer `cms.text(...)` over ad-hoc `?? ""` or `?? "English fallback"`
 * patterns. If a new content surface appears in a component, it goes here.
 */

import type { Locale } from "@/lib/locale";

export interface CmsFieldOptions {
  /** Locale the value is being rendered in — surfaced in error messages. */
  locale: Locale;
}

function format(path: string, locale: string): string {
  return `Missing Sanity content at "${path}" for locale "${locale}"`;
}

function reportMissing(path: string, locale: string): void {
  const message = format(path, locale);
  if (process.env.NODE_ENV !== "production") {
    throw new Error(message);
  }
  // eslint-disable-next-line no-console
  console.error(`[cms] ${message}`);
}

export const cms = {
  /**
   * Read a required Sanity-sourced string. Dev-strict / prod-graceful.
   *
   * @example
   *   cms.text(page?.hero?.heading, "page.hero.heading", { locale })
   */
  text(value: string | null | undefined, path: string, opts: CmsFieldOptions): string {
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (!trimmed) {
      reportMissing(path, opts.locale);
      return "";
    }
    return trimmed;
  }
};

/**
 * For code that cannot accept `cms` itself (e.g. non-string validation).
 * Exposed so other helpers can share the report/throw contract.
 */
export function reportMissingContent(path: string, locale: Locale): void {
  reportMissing(path, locale);
}
