import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("works on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/en");

    await expect(page.getByTestId("desktop-nav")).toBeVisible();
    await page.getByTestId("nav-portfolio").click();
    await expect(page).toHaveURL(/\/en\/portfolio$/);
    await expect(page.getByTestId("portfolio-page")).toBeVisible();

    await page.getByTestId("nav-contact").click();
    await expect(page).toHaveURL(/\/en\/contact$/);
    await expect(page.getByTestId("contact-page")).toBeVisible();

    await page.getByTestId("nav-home").click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByTestId("site-header")).toBeVisible();
  });

  test("works on mobile (hamburger menu)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/en");

    await expect(page.getByTestId("mobile-menu-button")).toBeVisible();
    await page.getByTestId("mobile-menu-button").click();
    await expect(page.getByTestId("mobile-menu")).toBeVisible();

    await page.getByTestId("mobile-nav-portfolio").click();
    await expect(page).toHaveURL(/\/en\/portfolio$/);
    await expect(page.getByTestId("portfolio-page")).toBeVisible();
    await expect(page.getByTestId("mobile-menu")).toHaveCount(0);
  });
});
