import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroBlockClient } from "@/components/blocks/HeroBlockClient";

const translations = {
  tag1: "Multimedia Artist from Mexico",
  tag2: "Modular Synthesis",
  title: "Experimental Sound Design",
  description: "Multimedia artist and modular synthesist based in Mexico City.",
  ctaPrimary: "Contact Me",
  ctaSecondary: "Official Store",
  audioPlaceholder: "Track Name"
};

describe("HeroBlockClient", () => {
  it("renders hero section with title, subtitle, and CTAs", () => {
    render(<HeroBlockClient locale="en" translations={translations} />);

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
    render(<HeroBlockClient locale="en" translations={translations} />);

    // Check that the hero image is rendered
    const heroImage = screen.getByAltText("Experimental Sound Design");
    expect(heroImage).toBeInTheDocument();
  });

  it("renders audio player UI with disabled buttons when no audio source", () => {
    render(<HeroBlockClient locale="en" translations={translations} />);

    // Check for audio player elements - buttons should be disabled
    const playButton = screen.getByLabelText("Track Name");
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    const downloadButton = screen.getByLabelText("Download");
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toBeDisabled();

    expect(screen.getByText("Track Name")).toBeInTheDocument();
  });

  it("renders audio player with enabled buttons when audio source is provided", () => {
    render(
      <HeroBlockClient locale="en" translations={translations} audioSrc="/audio/sample.mp3" />
    );

    // Check for audio player elements - buttons should be enabled
    const playButton = screen.getByLabelText("Track Name");
    expect(playButton).toBeInTheDocument();
    expect(playButton).not.toBeDisabled();

    const downloadButton = screen.getByLabelText("Download");
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).not.toBeDisabled();

    // Audio element should be present
    const audioElement = document.querySelector('audio[src="/audio/sample.mp3"]');
    expect(audioElement).toBeInTheDocument();
  });
});
