import { describe, expect, it } from "vitest";

import en from "../../public/locales/en/translation.json";
import es from "../../public/locales/es/translation.json";

describe("Translation files", () => {
  it("has matching keys in both en.json and es.json", () => {
    // Helper to get all paths in an object
    function getPaths(obj: unknown, prefix = ""): string[] {
      const paths: string[] = [];
      if (typeof obj === "object" && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
          const newPath = prefix ? `${prefix}.${key}` : key;
          if (typeof value === "object" && value !== null) {
            paths.push(...getPaths(value, newPath));
          } else {
            paths.push(newPath);
          }
        }
      }
      return paths;
    }

    const enPaths = getPaths(en).sort();
    const esPaths = getPaths(es).sort();

    expect(enPaths).toEqual(esPaths);
  });

  it("has non-empty string values for all translations", () => {
    function checkValues(obj: unknown, path = ""): void {
      if (typeof obj === "object" && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
          const newPath = path ? `${path}.${key}` : key;
          if (typeof value === "string") {
            expect(value.trim().length).toBeGreaterThan(0);
          } else if (typeof value === "object" && value !== null) {
            checkValues(value, newPath);
          }
        }
      }
    }

    checkValues(en);
    checkValues(es);
  });

  it("has required translation keys", () => {
    const requiredKeys = [
      "brand",
      "nav.home",
      "nav.portfolio",
      "nav.contact",
      "contact.title",
      "contact.form.submit",
      "notFound.title",
      "notFound.backHome"
    ];

    for (const key of requiredKeys) {
      const getValue = (obj: unknown, path: string): unknown => {
        const parts = path.split(".");
        let current: unknown = obj;
        for (const part of parts) {
          if (current && typeof current === "object") {
            current = (current as Record<string, unknown>)[part];
          } else {
            return undefined;
          }
        }
        return current;
      };

      expect(getValue(en, key)).toBeDefined();
      expect(getValue(es, key)).toBeDefined();
    }
  });
});
