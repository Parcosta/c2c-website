import { expect, test } from "@playwright/test";

test("homepage renders foundation heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Foundation" })).toBeVisible();
});

