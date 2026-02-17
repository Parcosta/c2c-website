import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 720 }
] as const;

test("responsive layout at mobile/tablet/desktop", async ({ page }) => {
  for (const vp of viewports) {
    await test.step(vp.name, async () => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/en");

      await expect(page.getByTestId("site-header")).toBeVisible();
      await expect(page.getByTestId("home-hero")).toBeVisible();

      if (vp.width < 768) {
        await expect(page.getByTestId("mobile-menu-button")).toBeVisible();
      } else {
        await expect(page.getByTestId("desktop-nav")).toBeVisible();
      }

      const noHorizontalScroll = await page.evaluate(() => {
        const { scrollWidth, clientWidth } = document.documentElement;
        return scrollWidth <= clientWidth + 1;
      });
      expect(noHorizontalScroll).toBe(true);
    });
  }
});

