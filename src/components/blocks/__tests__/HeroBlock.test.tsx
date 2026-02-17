import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "brand": "Coast2Coast",
        "home.heroTitle": "Live modular techno & DJ sets",
        "home.heroSubtitle": "Coast2Coast (C2C) — bold sound, dark visuals, clean interface.",
        "home.heroCtaPrimary": "Get in touch",
        "home.heroCtaSecondary": "View portfolio"
      };
      return translations[key] || key;
    }
  })
}));

import { HeroBlock } from "@/components/blocks/HeroBlock";

describe("HeroBlock", () => {
  it("renders hero section with title, subtitle, and CTAs", () => {
    render(<HeroBlock />);

    // Check for region landmark with title
    expect(screen.getByRole("region", { name: "Live modular techno & DJ sets" })).toBeInTheDocument();
    
    // Check for title
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Live modular techno & DJ sets");
    
    // Check for subtitle
    expect(
      screen.getByText("Coast2Coast (C2C) — bold sound, dark visuals, clean interface.")
    ).toBeInTheDocument();

    // Check for CTA buttons
    const primaryCta = screen.getByRole("link", { name: "Get in touch" });
    expect(primaryCta).toHaveAttribute("href", "/contact");
    
    const secondaryCta = screen.getByRole("link", { name: "View portfolio" });
    expect(secondaryCta).toHaveAttribute("href", "/portfolio");
  });

  it("renders with audio player when audioSrc is provided", () => {
    render(<HeroBlock audioSrc="/audio/sample.mp3" audioTitle="Sample Track" />);

    // Check that the audio element is rendered
    expect(screen.getByRole("button", { name: /reproducir|pausar/i })).toBeInTheDocument();
  });

  it("renders without audio player when audioSrc is not provided", () => {
    render(<HeroBlock />);

    // Should still render CTAs
    expect(screen.getByRole("link", { name: "Get in touch" })).toBeInTheDocument();
  });
});
