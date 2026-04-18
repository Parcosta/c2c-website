import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { cms } from "@/lib/cms";

const originalEnv = { ...process.env };

describe("cms.text", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns the trimmed value when it is a non-empty string", () => {
    expect(cms.text("  Hello  ", "page.hero.heading", { locale: "en" })).toBe("Hello");
  });

  it("throws in non-production with a message that includes path and locale", () => {
    (process.env as Record<string, string>).NODE_ENV = "development";
    expect(() =>
      cms.text(undefined, "page.hero.heading", { locale: "es" })
    ).toThrowError(/page\.hero\.heading/);
    expect(() =>
      cms.text("", "page.hero.heading", { locale: "es" })
    ).toThrowError(/for locale "es"/);
  });

  it("throws on null and on non-string values in dev", () => {
    (process.env as Record<string, string>).NODE_ENV = "test";
    expect(() => cms.text(null, "a.b.c", { locale: "en" })).toThrowError();
  });

  it("in production, logs to console.error and returns an empty string", () => {
    (process.env as Record<string, string>).NODE_ENV = "production";
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = cms.text(undefined, "page.hero.heading", { locale: "es" });

    expect(result).toBe("");
    expect(spy).toHaveBeenCalledTimes(1);
    const logged = spy.mock.calls[0][0] as string;
    expect(logged).toContain("page.hero.heading");
    expect(logged).toContain('for locale "es"');
    spy.mockRestore();
  });

  it("treats whitespace-only strings as missing", () => {
    (process.env as Record<string, string>).NODE_ENV = "development";
    expect(() => cms.text("   ", "x.y", { locale: "en" })).toThrowError();
  });
});
