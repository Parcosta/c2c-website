import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DesktopNav } from "@/components/layout/DesktopNav";
import { navItems } from "@/components/layout/navItems";

describe("DesktopNav", () => {
  it("renders all primary navigation links with locale prefix", () => {
    render(<DesktopNav locale="en" />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      const link = within(nav).getByRole("link", { name: item.label });
      const expectedHref = item.href === "/" ? "/en" : `/en${item.href}`;
      expect(link).toHaveAttribute("href", expectedHref);
    }
  });

  it("renders links with Spanish locale prefix", () => {
    render(<DesktopNav locale="es" />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      const link = within(nav).getByRole("link", { name: item.label });
      const expectedHref = item.href === "/" ? "/es" : `/es${item.href}`;
      expect(link).toHaveAttribute("href", expectedHref);
    }
  });
});
