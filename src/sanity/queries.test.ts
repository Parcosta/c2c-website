import { describe, expect, it, vi } from "vitest";

import type { Locale } from "@/lib/i18n";
import {
  buildEventsQuery,
  buildCurrentWorkQuery,
  buildHomepageQuery,
  buildPortfolioItemsQuery,
  buildPressQuery,
  buildPressEpkQuery,
  buildServicesQuery,
  buildSiteSettingsQuery
} from "@/sanity/queries";
import { createMockSanityClient } from "@/sanity/test/mockSanityClient";

describe("Sanity GROQ query builders", () => {
  it("builds homepage query with correct params and localized projections", () => {
    const def = buildHomepageQuery("en");
    expect(def.params).toEqual({ locale: "en", slug: "home" });
    expect(def.query).toContain('*[_type == "page"');
    expect(def.query).toContain('"title": title[$locale]');
    expect(def.query).toContain('"body": body[$locale]');
  });

  it("builds portfolio items query", () => {
    const def = buildPortfolioItemsQuery("es");
    expect(def.params).toEqual({ locale: "es" });
    expect(def.query).toContain('*[_type == "portfolioItem"]');
    expect(def.query).toContain('"category": category[$locale]');
  });

  it("builds current work query selecting latest portfolio item", () => {
    const def = buildCurrentWorkQuery("en");
    expect(def.params).toEqual({ locale: "en" });
    expect(def.query).toContain('*[_type == "portfolioItem"]');
    expect(def.query).toContain("|order(date desc)[0]");
    expect(def.query).toContain('"media": coalesce(featuredMedia[0], images[0])');
    expect(def.query).toContain("asset->{");
  });

  it("builds events query", () => {
    const def = buildEventsQuery("en");
    expect(def.params).toEqual({ locale: "en" });
    expect(def.query).toContain('*[_type == "event"]');
    expect(def.query).toContain('"venue": venue[$locale]');
  });

  it("builds services query and projects localized features", () => {
    const def = buildServicesQuery("es");
    expect(def.params).toEqual({ locale: "es" });
    expect(def.query).toContain('*[_type == "service"]');
    expect(def.query).toContain('"features": features[][$locale]');
  });

  it("builds press query", () => {
    const def = buildPressQuery("en");
    expect(def.params).toEqual({ locale: "en" });
    expect(def.query).toContain('*[_type == "pressItem"]');
    expect(def.query).toContain('"quote": quote[$locale]');
  });

  it("builds site settings query", () => {
    const def = buildSiteSettingsQuery("es");
    expect(def.params).toEqual({ locale: "es" });
    expect(def.query).toContain('*[_type == "siteSettings"]');
    expect(def.query).toContain('"siteName": siteName[$locale]');
  });

  it("builds press EPK query and includes pressPage + mentions + settings", () => {
    const def = buildPressEpkQuery("en");
    expect(def.params).toEqual({ locale: "en" });
    expect(def.query).toContain('"pressPage": *[_type == "pressPage"]');
    expect(def.query).toContain('"pressMentions": *[_type == "pressItem"]');
    expect(def.query).toContain('"pressKitAssets": pressKitAssets[]');
    expect(def.query).toContain('"imageUrl": image.asset->url');
  });

  it("supports mocking a Sanity client for consuming query defs", async () => {
    const fetchImpl = vi.fn(async <T,>(query: string, params?: Record<string, unknown>) => {
      return { query, params } as unknown as T;
    });
    const mockClient = createMockSanityClient(fetchImpl);

    const locale: Locale = "en";
    const def = buildEventsQuery(locale);
    const result = await mockClient.fetch<{ query: string; params: Record<string, unknown> }>(def.query, def.params);

    expect(fetchImpl).toHaveBeenCalledWith(def.query, def.params);
    expect(result.params).toEqual(def.params);
  });
});

