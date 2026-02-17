import { expect, test } from "@playwright/test";

test("contact form submission flow", async ({ page }) => {
  await page.goto("/en/contact");
  await expect(page.getByTestId("contact-page")).toBeVisible();

  await page.getByTestId("contact-name").fill("Playwright Tester");
  await page.getByTestId("contact-email").fill("tester@example.com");
  await page.getByTestId("contact-message").fill("Hello from E2E.");

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.url().includes("/api/contact") && res.request().method() === "POST"),
    page.getByTestId("contact-submit").click()
  ]);

  expect(response.ok()).toBeTruthy();
  await expect(page.getByTestId("contact-success")).toBeVisible();
});

