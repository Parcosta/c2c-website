import { expect, test } from "@playwright/test";

test("language switching EN/ES", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/en");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByTestId("home-hero")).toContainText("Live modular techno");

  await page.getByTestId("lang-es").click();
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByTestId("home-hero")).toContainText("Techno modular en vivo");

  await page.getByTestId("lang-en").click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByTestId("home-hero")).toContainText("Live modular techno");
});

