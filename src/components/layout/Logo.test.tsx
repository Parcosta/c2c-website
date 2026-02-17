import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "@/components/layout/Logo";

describe("Logo", () => {
  it("links to the locale root", () => {
    render(<Logo locale="en" />);
    const link = screen.getByRole("link", { name: /c2c home/i });
    expect(link).toHaveAttribute("href", "/en");
  });
});
