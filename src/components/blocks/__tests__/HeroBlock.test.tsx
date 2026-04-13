import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "home.hero.tag1": "Multimedia Artist from Mexico",
        "home.hero.tag2": "Modular Synthesis",
        "home.hero.title": "Experimental Sound Design",
        "home.hero.description": "Multimedia artist and modular synthesist based in Mexico City.",
        "home.hero.ctaPrimary": "Contact Me",
        "home.hero.ctaSecondary": "Official Store",
        "home.hero.audioPlaceholder": "Track Name"
      };
      return translations[key] || key;
    }
  })
}));

import { HeroBlock } from "@/components/blocks/HeroBlock";

describe("HeroBlock", () => {
  it("renders hero section with title, subtitle, and CTAs", () => {
    render(<HeroBlock locale="en" />);

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
    expect(secondaryCta).toHaveAttribute("href", "/en/store");
  });

  it("renders with hero image", () => {
    render(<HeroBlock locale="en" />);

    // Check that the hero image is rendered
    const heroImage = screen.getByAltText("Experimental Sound Design");
    expect(heroImage).toBeInTheDocument();
  });

  it("renders audio player UI", () => {
    render(<HeroBlock locale="en" />);

    // Check for audio player elements
    expect(screen.getByLabelText("Track Name")).toBeInTheDocument();
    expect(screen.getByText("Track Name")).toBeInTheDocument();
  });
});
