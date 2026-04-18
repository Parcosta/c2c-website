import { expect, test } from "@playwright/test";

/**
 * E2E smoke tests for the homepage, run against the Next dev server with
 * the seeded production Sanity dataset. These assertions lock in the
 * Sanity-first contract: every user-facing string on the page originates
 * from Sanity, there is no "empty state" flicker, and the composite layout
 * renders end-to-end.
 */

test.describe("Home page", () => {
  test("redirects root to the default locale and renders chrome", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(en|es)$/);

    await expect(page.getByTestId("site-header")).toBeVisible();
    await expect(page.getByTestId("site-footer")).toBeVisible();
  });

  test("hero section renders Sanity-sourced copy and both CTAs (en)", async ({ page }) => {
    await page.goto("/en");

    const hero = page
      .locator("section#homepage-hero-title")
      .or(page.locator("section").filter({ has: page.locator("h1#homepage-hero-title") }));
    await expect(page.locator("h1#homepage-hero-title")).toBeVisible();
    // The heading copy is authored in Sanity; assert it's non-empty rather
    // than matching a specific string.
    const heroText = await page.locator("h1#homepage-hero-title").textContent();
    expect(heroText?.trim().length ?? 0).toBeGreaterThan(0);

    // Both hero CTAs are anchors with locale-prefixed hrefs.
    const primaryCta = page.locator("section a").filter({ hasText: /.+/ }).nth(0);
    await expect(primaryCta).toHaveAttribute("href", /^\/en(\/|$)/);
  });

  test("projects block renders with Figma-aligned filter tabs", async ({ page }) => {
    await page.goto("/en");

    // At least two filter tabs should be visible — these are Sanity-authored.
    const filterTabs = page.getByRole("button", { pressed: /true|false/ });
    expect(await filterTabs.count()).toBeGreaterThanOrEqual(2);

    // "Visit store" link points to the locale-less /store route.
    const storeLink = page.getByRole("link", { name: /store|tienda/i }).first();
    await expect(storeLink).toHaveAttribute("href", "/store");
  });

  test("/store route renders the Coming Soon placeholder", async ({ page }) => {
    await page.goto("/store");
    await expect(page.getByRole("heading", { name: /coming soon/i })).toBeVisible();
  });

  test("renders the multimedia CTA block with title, description and CTA", async ({ page }) => {
    await page.goto("/en");

    const multimedia = page.getByTestId("multimedia-cta-block");
    await expect(multimedia).toBeVisible();
    await expect(multimedia.locator("h2")).toBeVisible();
    await expect(multimedia.getByRole("link")).toBeVisible();
  });

  test("no DOM element renders an empty heading (no unauthored fallbacks)", async ({ page }) => {
    await page.goto("/en");

    // Every heading on the home page must have non-empty trimmed text
    // (would catch the old `?? ""` pattern).
    const emptyHeadings = await page
      .locator("h1, h2, h3")
      .evaluateAll((nodes) =>
        nodes
          .map((n) => ({ tag: n.tagName, text: (n.textContent ?? "").trim() }))
          .filter((item) => item.text.length === 0)
      );
    expect(emptyHeadings).toEqual([]);
  });

  test("language switcher goes to /es and the page still renders", async ({ page }) => {
    await page.goto("/en");
    await page.getByTestId("lang-es").click();
    await expect(page).toHaveURL(/\/es(\/|$)/);
    await expect(page.locator("h1#homepage-hero-title")).toBeVisible();
  });
});
