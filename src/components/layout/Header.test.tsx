import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/layout/Header";
import { navItems } from "@/components/layout/navItems";

describe("Header", () => {
  it("renders logo, primary navigation, and locale toggle", () => {
    (globalThis as unknown as { __NEXT_PATHNAME__?: string }).__NEXT_PATHNAME__ = "/en/portfolio";

    render(<Header locale="en" />);

    expect(screen.getByRole("link", { name: /c2c home/i })).toHaveAttribute("href", "/en");

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      const link = within(nav).getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href("en"));
    }

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute("href", "/es/portfolio");
  });
});
