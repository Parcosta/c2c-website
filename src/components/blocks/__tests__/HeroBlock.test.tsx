import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroBlock } from "@/components/blocks/HeroBlock";

describe("HeroBlock", () => {
  it("renders title, subtitle, and CTA link", () => {
    render(
      <HeroBlock
        title="Ship UI with confidence."
        subtitle="Reusable blocks and primitives for a dark-first product."
        ctaLabel="Get started"
        ctaHref="/components"
      />
    );

    expect(screen.getByRole("region", { name: "Ship UI with confidence." })).toBeInTheDocument();
    expect(
      screen.getByText("Reusable blocks and primitives for a dark-first product.")
    ).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: "Get started" });
    expect(cta).toHaveAttribute("href", "/components");
  });
});
