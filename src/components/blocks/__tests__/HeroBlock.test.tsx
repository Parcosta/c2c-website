import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroBlock } from "@/components/blocks/HeroBlock";

const content = {
  brand: "Coast2Coast",
  heroTitle: "Experimental Sound Design",
  heroSubtitle: "Multimedia artist and modular synthesist based in Mexico City.",
  heroCtaPrimary: "Contact Me",
  heroCtaSecondary: "Official Store",
  tag1: "Multimedia Artist from Mexico",
  tag2: "Modular Synthesis",
  audioPlaceholder: "Track Name"
};

describe("HeroBlock", () => {
  it("renders hero section with title, subtitle, and CTAs", () => {
    render(<HeroBlock locale="en" content={content} />);

    // Check for title
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Experimental Sound Design"
    );

    // Check for description
    expect(
      screen.getByText("Multimedia artist and modular synthesist based in Mexico City.")
    ).toBeInTheDocument();

    // Check for CTA buttons
    const primaryCta = screen.getByRole("link", { name: "Contact Me" });
    expect(primaryCta).toHaveAttribute("href", "/en/contact");

    const secondaryCta = screen.getByRole("link", { name: "Official Store" });
    expect(secondaryCta).toHaveAttribute("href", "/en/portfolio");
  });

  it("renders with hero image", () => {
    render(<HeroBlock locale="en" content={content} />);

    // Check that the hero image is rendered
    const heroImage = screen.getByAltText("Experimental Sound Design");
    expect(heroImage).toBeInTheDocument();
  });

  it("renders audio player UI", () => {
    render(<HeroBlock locale="en" content={content} audioTitle="Sample Track" />);

    // Check for audio player elements
    expect(screen.getByLabelText("Sample Track")).toBeInTheDocument();
    expect(screen.getByText("Sample Track")).toBeInTheDocument();
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

    expect(screen.getByLabelText("Sample Track")).toBeInTheDocument();
  });
});
