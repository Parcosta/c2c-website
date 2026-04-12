import { render, screen, within } from "@testing-library/react";
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
        "nav.contact": "Contact"
      };
      return translations[key] || key;
    }
  })
}));

import { DesktopNav } from "@/components/layout/DesktopNav";
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

describe("DesktopNav", () => {
  it("renders all primary navigation links with locale prefix", () => {
    render(<DesktopNav locale="en" />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      const label = navItemLabels[item.labelKey];
      const link = within(nav).getByRole("link", { name: label });
      const expectedHref = item.href === "/" ? "/en" : `/en${item.href}`;
      expect(link).toHaveAttribute("href", expectedHref);
    }
  });

  it("renders links with Spanish locale prefix", () => {
    render(<DesktopNav locale="es" />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      const label = navItemLabels[item.labelKey];
      const link = within(nav).getByRole("link", { name: label });
      const expectedHref = item.href === "/" ? "/es" : `/es${item.href}`;
      expect(link).toHaveAttribute("href", expectedHref);
    }
  });
});
