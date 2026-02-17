import { expect, test } from "@playwright/test";

test("portfolio page loads and filters work", async ({ page }) => {
  await page.goto("/en/portfolio");
  await expect(page.getByTestId("portfolio-page")).toBeVisible();

  const items = page.getByTestId("portfolio-item");
  await expect(items).toHaveCount(5);

  await page.getByTestId("portfolio-filter-dj").click();
  await expect(items).toHaveCount(2);

  const categories = await items.evaluateAll((els) => els.map((el) => el.getAttribute("data-category")));
  expect(categories.every((c) => c === "dj")).toBe(true);

  await page.getByTestId("portfolio-filter-all").click();
  await expect(items).toHaveCount(5);
});

