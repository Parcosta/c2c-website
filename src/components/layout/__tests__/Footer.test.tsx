import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Footer } from "@/components/layout/Footer";

let mockedPathname = "/en";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return { ...actual, usePathname: () => mockedPathname };
});

describe("Footer", () => {
  it("renders nav links with locale-prefixed hrefs", () => {
    mockedPathname = "/en/press";
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/en/portfolio"
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/en/services");
    expect(screen.getByRole("link", { name: "Press" })).toHaveAttribute("href", "/en/press");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/en/about");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/en/contact");
  });

  it("renders a language switcher that preserves the current path", () => {
    mockedPathname = "/en/portfolio";
    render(<Footer />);

    const en = screen.getByRole("link", { name: "EN" });
    const es = screen.getByRole("link", { name: "ES" });

    expect(en).toHaveAttribute("href", "/en/portfolio");
    expect(en).toHaveAttribute("aria-current", "true");
    expect(es).toHaveAttribute("href", "/es/portfolio");
  });

  it("renders social links and contact email", () => {
    mockedPathname = "/es";
    render(<Footer contactEmail="hello@c2c.com" />);

    expect(screen.getByRole("link", { name: "hello@c2c.com" })).toHaveAttribute(
      "href",
      "mailto:hello@c2c.com"
    );

    expect(screen.getByLabelText("Instagram")).toHaveAttribute(
      "href",
      "https://example.com/instagram"
    );
    expect(screen.getByLabelText("SoundCloud")).toHaveAttribute(
      "href",
      "https://example.com/soundcloud"
    );
    expect(screen.getByLabelText("Spotify")).toHaveAttribute("href", "https://example.com/spotify");
    expect(screen.getByLabelText("YouTube")).toHaveAttribute("href", "https://example.com/youtube");
  });
});
