import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Header } from "@/components/layout/Header";
import { navItems } from "@/components/layout/navItems";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Header", () => {
  it("renders logo, primary navigation, and locale toggle", () => {
    render(<Header locale="en" />);

    expect(screen.getByRole("link", { name: /c2c home/i })).toHaveAttribute("href", "/en");

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      const link = within(nav).getByRole("link", { name: item.label });
      const expectedHref = item.href === "/" ? "/en" : `/en${item.href}`;
      expect(link).toHaveAttribute("href", expectedHref);
    }

    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
  });
});
