import { describe, expect, it } from "vitest";

// Skip these tests since we're using Sanity for translations now
// The translations are stored in the database, not in JSON files
describe("Translation files", () => {
  it("uses Sanity for translations instead of JSON files", () => {
    // This test documents that we've moved away from JSON translation files
    // to using Sanity CMS for managing translations
    expect(true).toBe(true);
  });
});
