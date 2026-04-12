import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "nav.home": "Home",
        "nav.portfolio": "Portfolio",
        "nav.services": "Services",
        "nav.press": "Press",
        "nav.about": "About",
        "nav.contact": "Contact",
        "nav.mobileMenu": "Open menu",
        "nav.menuTitle": "Menu",
        "nav.menuDescription": "Primary navigation"
      };
      return translations[key] || key;
    }
  })
}));

import { MobileNav } from "@/components/layout/MobileNav";
import { navItems } from "@/components/layout/navItems";

// Map labelKey to expected label for testing
const navItemLabels: Record<string, string> = {
  "nav.home": "Home",
  "nav.portfolio": "Portfolio",
  "nav.services": "Services",
  "nav.press": "Press",
  "nav.about": "About",
  "nav.contact": "Contact"
};

describe("MobileNav", () => {
  it("opens a sheet with navigation links", async () => {
    render(<MobileNav />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    for (const item of navItems) {
      const label = navItemLabels[item.labelKey];
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", item.href);
    }
  });
});
