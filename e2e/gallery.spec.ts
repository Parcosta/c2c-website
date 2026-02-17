import { expect, test } from "@playwright/test";

test.describe.skip("Gallery Block", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the components page where gallery examples might be shown
    await page.goto("/en/components");
  });

  test("gallery block is visible on page", async ({ page }) => {
    // Check if gallery section exists
    const gallery = page.locator('[data-testid="gallery-block"]').first();
    await expect(gallery).toBeVisible();
  });

  test("gallery images are clickable and open lightbox", async ({ page }) => {
    const firstImage = page.locator('[data-testid^="gallery-image-"]').first();
    await expect(firstImage).toBeVisible();

    await firstImage.click();

    const lightbox = page.locator('[data-testid="gallery-lightbox"]');
    await expect(lightbox).toBeVisible();
  });

  test("lightbox can be closed", async ({ page }) => {
    const firstImage = page.locator('[data-testid^="gallery-image-"]').first();
    await firstImage.click();

    const lightbox = page.locator('[data-testid="gallery-lightbox"]');
    await expect(lightbox).toBeVisible();

    const closeButton = page.locator('[data-testid="lightbox-close"]');
    await closeButton.click();

    await expect(lightbox).not.toBeVisible();
  });

  test("lightbox navigation works", async ({ page }) => {
    // Click first image
    const firstImage = page.locator('[data-testid^="gallery-image-"]').first();
    await firstImage.click();

    const lightbox = page.locator('[data-testid="gallery-lightbox"]');
    await expect(lightbox).toBeVisible();

    // Check if navigation buttons exist (when multiple images)
    const nextButton = page.locator('[data-testid="lightbox-next"]');
    const prevButton = page.locator('[data-testid="lightbox-previous"]');

    // If there are multiple images, buttons should be visible
    const hasMultipleImages = await nextButton.isVisible().catch(() => false);

    if (hasMultipleImages) {
      // Click next
      await nextButton.click();

      // Counter should show 2
      await expect(page.locator("text=/\\d+ \\/ \\/d+/")).toContainText("2");

      // Click previous
      await prevButton.click();

      // Counter should show 1
      await expect(page.locator("text=/\\d+ \\/ \\/d+/")).toContainText("1");
    }
  });

  test("lightbox closes with escape key", async ({ page }) => {
    const firstImage = page.locator('[data-testid^="gallery-image-"]').first();
    await firstImage.click();

    const lightbox = page.locator('[data-testid="gallery-lightbox"]');
    await expect(lightbox).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(lightbox).not.toBeVisible();
  });

  test("lightbox navigates with arrow keys", async ({ page }) => {
    const firstImage = page.locator('[data-testid^="gallery-image-"]').first();
    await firstImage.click();

    const nextButton = page.locator('[data-testid="lightbox-next"]');
    const hasMultipleImages = await nextButton.isVisible().catch(() => false);

    if (hasMultipleImages) {
      // Navigate with right arrow
      await page.keyboard.press("ArrowRight");
      await expect(page.locator("text=/\\d+ \\/ \\/d+/")).toContainText("2");

      // Navigate with left arrow
      await page.keyboard.press("ArrowLeft");
      await expect(page.locator("text=/\\d+ \\/ \\/d+/")).toContainText("1");
    }
  });
});
