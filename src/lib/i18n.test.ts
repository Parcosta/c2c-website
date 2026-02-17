import { describe, expect, it } from "vitest";

import {
  addLocaleToPathname,
  defaultLocale,
  getLocaleFromPathname,
  isLocale,
  stripLocaleFromPathname,
  switchLocaleInPathname
} from "@/lib/i18n";

describe("i18n path utilities", () => {
  it("detects supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("parses locale from pathname", () => {
    expect(getLocaleFromPathname("/en")).toBe("en");
    expect(getLocaleFromPathname("/es/portfolio")).toBe("es");
    expect(getLocaleFromPathname("/portfolio")).toBe(null);
  });

  it("strips locale prefix when present", () => {
    expect(stripLocaleFromPathname("/en")).toBe("/");
    expect(stripLocaleFromPathname("/en/portfolio")).toBe("/portfolio");
    expect(stripLocaleFromPathname("/portfolio")).toBe("/portfolio");
  });

  it("adds locale prefix when missing", () => {
    expect(addLocaleToPathname("/", defaultLocale)).toBe("/en");
    expect(addLocaleToPathname("/portfolio", "es")).toBe("/es/portfolio");
    expect(addLocaleToPathname("/en/portfolio", "es")).toBe("/en/portfolio");
  });

  it("switches locale prefix while preserving the rest", () => {
    expect(switchLocaleInPathname("/", "es")).toBe("/es");
    expect(switchLocaleInPathname("/en", "es")).toBe("/es");
    expect(switchLocaleInPathname("/en/portfolio/item", "es")).toBe("/es/portfolio/item");
    expect(switchLocaleInPathname("/portfolio/item", "es")).toBe("/es/portfolio/item");
  });
});
