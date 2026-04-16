import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroBlock } from "@/components/blocks/HeroBlock";

const content = {
  brand: "Coast2Coast",
  heroTitle: "Live modular techno & DJ sets",
  heroSubtitle: "Coast2Coast (C2C) — bold sound, dark visuals, clean interface.",
  heroCtaPrimary: "Get in touch",
  heroCtaSecondary: "View portfolio"
};

describe("HeroBlock", () => {
  it("renders hero section with title, subtitle, and CTAs", () => {
    render(<HeroBlock locale="en" content={content} />);

    expect(
      screen.getByRole("region", { name: "Live modular techno & DJ sets" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Live modular techno & DJ sets"
    );
    expect(screen.getByText(content.heroSubtitle)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: content.heroCtaPrimary })).toHaveAttribute(
      "href",
      "/en/contact"
    );
    expect(screen.getByRole("link", { name: content.heroCtaSecondary })).toHaveAttribute(
      "href",
      "/en/portfolio"
    );
  });

  it("renders with audio player when audioSrc is provided", () => {
    render(
      <HeroBlock
        locale="en"
        content={content}
        audioSrc="/audio/sample.mp3"
        audioTitle="Sample Track"
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
