import { expect, test } from "@playwright/test";

test("homepage loads and key content is visible", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);

  await expect(page.getByTestId("site-header")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Coast2Coast|Live modular techno/ })).toBeVisible();
  await expect(page.getByTestId("site-footer")).toBeVisible();
});
