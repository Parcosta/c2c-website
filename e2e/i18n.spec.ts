import { expect, test } from "@playwright/test";

test("language switching EN/ES", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/en");

  await expect(page.getByRole("heading", { name: /Coast2Coast|Live modular techno/ })).toBeVisible();

  await page.getByTestId("lang-es").click();
  await expect(page).toHaveURL(/\/es$/);

  await page.getByTestId("lang-en").click();
  await expect(page).toHaveURL(/\/en$/);
});
