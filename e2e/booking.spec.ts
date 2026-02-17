import { expect, test } from "@playwright/test";

test.describe("Booking Page", () => {
  test("booking page is accessible", async ({ page }) => {
    await page.goto("/en/booking");
    
    expect(await page.title()).toContain("Book");
    await expect(page.locator('[data-testid="booking-page"]')).toBeVisible();
  });

  test("booking form is visible", async ({ page }) => {
    await page.goto("/en/booking");
    
    await expect(page.locator('[data-testid="booking-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="booking-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="booking-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="booking-event-type"]')).toBeVisible();
    await expect(page.locator('[data-testid="booking-submit"]')).toBeVisible();
  });

  test("can fill and submit booking form", async ({ page }) => {
    await page.goto("/en/booking");
    
    // Intercept the API call
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true })
      });
    });
    
    // Fill the form
    await page.fill('[data-testid="booking-name"]', "Test User");
    await page.fill('[data-testid="booking-email"]', "test@example.com");
    
    // Select event type
    await page.click('[data-testid="booking-event-type"]');
    await page.click('text=DJ Set');
    
    // Fill optional fields
    await page.fill('[data-testid="booking-location"]', "New York");
    await page.fill('[data-testid="booking-message"]', "Looking forward to the show!");
    
    // Submit
    await page.click('[data-testid="booking-submit"]');
    
    // Check for success message
    await expect(page.locator('[data-testid="booking-success"]')).toBeVisible();
  });

  test("shows error on failed submission", async ({ page }) => {
    await page.goto("/en/booking");
    
    // Intercept the API call to simulate error
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "Server error" })
      });
    });
    
    // Fill required fields
    await page.fill('[data-testid="booking-name"]', "Test User");
    await page.fill('[data-testid="booking-email"]', "test@example.com");
    
    // Submit
    await page.click('[data-testid="booking-submit"]');
    
    // Check for error message
    await expect(page.locator('[data-testid="booking-error"]')).toBeVisible();
  });

  test("booking page works in Spanish", async ({ page }) => {
    await page.goto("/es/booking");
    
    await expect(page.locator('[data-testid="booking-page"]')).toBeVisible();
    await expect(page.locator('[data-testid="booking-form"]')).toBeVisible();
  });
});
