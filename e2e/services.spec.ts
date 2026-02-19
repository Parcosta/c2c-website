import { expect, test } from "@playwright/test";

test.describe("Services Page", () => {
  test("services page loads with correct title", async ({ page }) => {
    await page.goto("/en/services");
    await expect(page).toHaveTitle(/Services.*Coast2Coast/);
    await expect(page.getByTestId("services-page")).toBeVisible();
  });

  test("all 7 services are displayed", async ({ page }) => {
    await page.goto("/en/services");
    await expect(page.getByTestId("services-page")).toBeVisible();

    // Check for service icons (each service card has an icon)
    const serviceIcons = page.getByTestId("service-icon");
    await expect(serviceIcons).toHaveCount(7);
  });

  test("language switching works on services page", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/en/services");

    // Check English heading
    await expect(page.getByRole("heading", { name: /Services/ })).toBeVisible();

    // Switch to Spanish
    await page.getByTestId("lang-es").click();
    await expect(page).toHaveURL(/\/es\/services$/);

    // Check Spanish heading
    await expect(page.getByRole("heading", { name: /Servicios/ })).toBeVisible();

    // Switch back to English
    await page.getByTestId("lang-en").click();
    await expect(page).toHaveURL(/\/en\/services$/);
  });

  test("services page accessibility", async ({ page }) => {
    await page.goto("/en/services");

    // Check that main heading exists and is an h1
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();

    // Check that service cards have proper structure
    const serviceIcons = page.getByTestId("service-icon");
    const count = await serviceIcons.count();

    for (let i = 0; i < count; i++) {
      const icon = serviceIcons.nth(i);
      await expect(icon).toBeVisible();
    }
  });

  test("services page has structured data", async ({ page }) => {
    await page.goto("/en/services");

    // Check for JSON-LD structured data
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toHaveCount(1);

    const jsonLdContent = await jsonLdScript.textContent();
    expect(jsonLdContent).toContain("@context");
    expect(jsonLdContent).toContain("Organization");
  });

  test("Spanish services page loads correctly", async ({ page }) => {
    await page.goto("/es/services");
    await expect(page).toHaveTitle(/Servicios.*Coast2Coast/);
    await expect(page.getByTestId("services-page")).toBeVisible();

    // Check for service icons in Spanish page
    const serviceIcons = page.getByTestId("service-icon");
    await expect(serviceIcons).toHaveCount(7);
  });
});
