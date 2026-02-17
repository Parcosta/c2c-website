import type { Page } from "@playwright/test";

export type TestLocale = "en" | "es";

export async function gotoLocale(page: Page, locale: TestLocale, pathname = "/") {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const fullPath = normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
  await page.goto(fullPath);
}

