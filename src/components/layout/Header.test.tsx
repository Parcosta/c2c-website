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
        "nav.contact": "Contact",
        "nav.mobileMenu": "Open menu",
        "brand.abbr": "C2C"
      };
      return translations[key] || key;
    }
  })
}));

import { Header } from "@/components/layout/Header";
import { navItems } from "@/components/layout/navItems";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({
    push: vi.fn()
  })
}));

// Map labelKey to expected label for testing
const navItemLabels: Record<string, string> = {
  "nav.home": "Home",
  "nav.portfolio": "Portfolio",
  "nav.services": "Services",
  "nav.press": "Press",
  "nav.about": "About",
  "nav.contact": "Contact"
};

describe("Header", () => {
  it("renders logo, primary navigation, and locale toggle", () => {
    render(<Header locale="en" />);

    expect(screen.getByRole("link", { name: /c2c home/i })).toHaveAttribute("href", "/en");

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      const label = navItemLabels[item.labelKey];
      const link = within(nav).getByRole("link", { name: label });
      const expectedHref = item.href === "/" ? "/en" : `/en${item.href}`;
      expect(link).toHaveAttribute("href", expectedHref);
    }

    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
  });
});
