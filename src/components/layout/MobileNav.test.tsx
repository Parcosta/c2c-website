import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MobileNav } from "@/components/layout/MobileNav";
import { navItems } from "@/components/layout/navItems";

describe("MobileNav", () => {
  it("opens a sheet with navigation links", async () => {
    render(<MobileNav locale="en" />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    for (const item of navItems) {
      const link = screen.getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href("en"));
    }
  });
});

