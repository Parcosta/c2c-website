import { expect, test } from "@playwright/test";

test("404 page shows for invalid routes", async ({ page }) => {
  await page.goto("/en/this-route-should-not-exist");
  await expect(page.getByTestId("not-found")).toBeVisible();
  await page.getByTestId("not-found-home").click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByTestId("home-hero")).toBeVisible();
});

