import { expect, test } from "@playwright/test";

test("portfolio page loads", async ({ page }) => {
  await page.goto("/en/portfolio");
  await expect(page.getByTestId("portfolio-page")).toBeVisible();
  await expect(page.getByTestId("site-header")).toBeVisible();
});
