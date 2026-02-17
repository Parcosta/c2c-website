import { expect, test } from "@playwright/test";

test("homepage loads and all sections are visible", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);

  await expect(page.getByTestId("site-header")).toBeVisible();
  await expect(page.getByTestId("home-hero")).toBeVisible();
  await expect(page.getByTestId("home-about")).toBeVisible();
  await expect(page.getByTestId("home-music")).toBeVisible();
  await expect(page.getByTestId("home-shows")).toBeVisible();
  await expect(page.getByTestId("home-portfolio")).toBeVisible();
  await expect(page.getByTestId("home-contact")).toBeVisible();
});

