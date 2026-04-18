import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroBlockClient } from "@/components/blocks/HeroBlockClient";

const translations = {
  tag1: "Multimedia Artist from Mexico",
  tag2: "Modular Synthesis",
  title: "Experimental Sound Design",
  description: "Multimedia artist and modular synthesist based in Mexico City.",
  ctaPrimary: "Contact Me",
  ctaPrimaryHref: "/contact",
  ctaSecondary: "Official Store",
  ctaSecondaryHref: "/store"
};

const heroImage = { src: "https://cdn.example.com/hero.jpg", alt: "Hero image" };

describe("HeroBlockClient", () => {
  it("renders hero section with title, subtitle, and CTAs (hrefs prefixed by locale)", () => {
    render(
      <HeroBlockClient locale="en" translations={translations} heroImage={heroImage} />
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Experimental Sound Design"
    );

    expect(
      screen.getByText("Multimedia artist and modular synthesist based in Mexico City.")
    ).toBeInTheDocument();

    const primaryCta = screen.getByRole("link", { name: "Contact Me" });
    expect(primaryCta).toHaveAttribute("href", "/en/contact");

    const secondaryCta = screen.getByRole("link", { name: "Official Store" });
    expect(secondaryCta).toHaveAttribute("href", "/en/store");
  });

  it("renders the hero image from the provided src and alt", () => {
    render(
      <HeroBlockClient locale="en" translations={translations} heroImage={heroImage} />
    );
    expect(screen.getByAltText("Hero image")).toBeInTheDocument();
  });

  it("omits the audio player UI when audio is not provided", () => {
    render(
      <HeroBlockClient locale="en" translations={translations} heroImage={heroImage} />
    );
    expect(document.querySelector("audio")).toBeNull();
  });

  it("renders audio player UI when audio prop is provided", () => {
    render(
      <HeroBlockClient
        locale="en"
        translations={translations}
        heroImage={heroImage}
        audio={{ src: "/audio/sample.mp3", label: "Track Name" }}
      />
    );

    const audioElement = document.querySelector('audio[src="/audio/sample.mp3"]');
    expect(audioElement).toBeInTheDocument();
    expect(screen.getByText("Track Name")).toBeInTheDocument();
  });
});
