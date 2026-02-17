import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DesktopNav } from "@/components/layout/DesktopNav";
import { navItems } from "@/components/layout/navItems";

describe("DesktopNav", () => {
  it("renders all primary navigation links", () => {
    render(<DesktopNav locale="en" />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of navItems) {
      const link = within(nav).getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href("en"));
    }
  });
});
