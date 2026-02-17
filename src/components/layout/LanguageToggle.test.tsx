import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LanguageToggle } from "@/components/layout/LanguageToggle";

describe("LanguageToggle", () => {
  it("switches locales while preserving pathname", () => {
    (globalThis as unknown as { __NEXT_PATHNAME__?: string }).__NEXT_PATHNAME__ = "/en/portfolio/item";

    render(<LanguageToggle locale="en" />);

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en/portfolio/item");
    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute("href", "/es/portfolio/item");
  });
});

