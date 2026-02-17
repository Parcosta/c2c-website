import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";

import { pageView, trackEvent } from "@/lib/analytics";

describe("analytics", () => {
  const originalGaId = process.env.NEXT_PUBLIC_GA_ID;
  const originalPlausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_GA_ID;
    delete process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    delete window.gtag;
    delete window.plausible;
  });

  afterEach(() => {
    if (originalGaId === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
    else process.env.NEXT_PUBLIC_GA_ID = originalGaId;

    if (originalPlausibleDomain === undefined) delete process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    else process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = originalPlausibleDomain;

    delete window.gtag;
    delete window.plausible;
    vi.restoreAllMocks();
  });

  it("is a no-op when no provider is configured", () => {
    expect(() => pageView("/test")).not.toThrow();
    expect(() => trackEvent("Signup")).not.toThrow();
  });

  it("tracks page views and events via Google Analytics when NEXT_PUBLIC_GA_ID is set", () => {
    process.env.NEXT_PUBLIC_GA_ID = "G-TEST123";
    window.gtag = vi.fn();

    pageView("/pricing?ref=home");
    expect(window.gtag).toHaveBeenCalledWith("config", "G-TEST123", {
      page_path: "/pricing?ref=home"
    });

    trackEvent("CTA Clicked", { location: "hero", value: 2, premium: true, ignored: undefined });
    expect(window.gtag).toHaveBeenCalledWith("event", "CTA Clicked", {
      location: "hero",
      value: 2,
      premium: true
    });
  });

  it("tracks page views and events via Plausible when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set", () => {
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = "example.com";
    window.plausible = vi.fn();

    pageView("/blog/hello?x=1");
    expect(window.plausible).toHaveBeenCalledWith(
      "pageview",
      expect.objectContaining({
        u: expect.stringContaining("/blog/hello?x=1")
      })
    );

    trackEvent("Newsletter Signup", { plan: "free", count: 3, trial: false, skipped: null });
    expect(window.plausible).toHaveBeenCalledWith("Newsletter Signup", {
      props: { plan: "free", count: "3", trial: "false" }
    });
  });

  it("prefers Google Analytics when both providers are configured", () => {
    process.env.NEXT_PUBLIC_GA_ID = "G-TEST123";
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = "example.com";
    window.gtag = vi.fn();
    window.plausible = vi.fn();

    trackEvent("Test");

    expect(window.gtag).toHaveBeenCalled();
    expect(window.plausible).not.toHaveBeenCalled();
  });
});
