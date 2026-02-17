import { describe, expect, it, beforeEach, afterEach } from "vitest";

import {
  buildMetadata,
  createEventJsonLd,
  createMusicGroupJsonLd,
  createOrganizationJsonLd,
  getSiteName,
  getSiteUrl,
  serializeJsonLd
} from "@/lib/seo";

const originalEnv = { ...process.env };

beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("seo", () => {
  it("getSiteUrl falls back to localhost", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.SITE_URL;
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("getSiteUrl trims trailing slashes", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com///";
    expect(getSiteUrl()).toBe("https://example.com");
  });

  it("getSiteName falls back when unset", () => {
    delete process.env.NEXT_PUBLIC_SITE_NAME;
    expect(getSiteName()).toBeTruthy();
  });

  it("buildMetadata generates canonical and language alternates", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    process.env.NEXT_PUBLIC_SITE_NAME = "Coast2Coast (C2C)";

    const meta = buildMetadata({
      title: "Components",
      description: "Preview",
      pathname: "/en/components"
    });

    expect(meta.metadataBase?.toString()).toBe("https://example.com/");
    expect(meta.alternates?.canonical).toBe("/en/components");
    expect(meta.alternates?.languages).toMatchObject({
      en: "/en/components",
      es: "/es/components"
    });
    expect(meta.openGraph?.siteName).toBe("Coast2Coast (C2C)");
    expect(meta.twitter?.card).toBe("summary_large_image");
  });

  it("serializeJsonLd escapes HTML-sensitive characters", () => {
    const json = serializeJsonLd({ name: "<script>alert(1)</script>&" });
    expect(json).not.toContain("<");
    expect(json).not.toContain(">");
    expect(json).not.toContain("&");
    expect(json).toContain("\\u003cscript\\u003e");
    expect(json).toContain("\\u0026");
  });

  it("creates Organization, MusicGroup, and Event JSON-LD", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    const org = createOrganizationJsonLd({ name: "Coast2Coast", logoUrl: "/logo.png" });
    const group = createMusicGroupJsonLd({ name: "Coast2Coast (C2C)" });
    const event = createEventJsonLd({ name: "Live set", startDate: "2026-01-01T20:00:00Z" });

    expect(org["@type"]).toBe("Organization");
    expect(group["@type"]).toBe("MusicGroup");
    expect(event["@type"]).toBe("Event");
  });
});
