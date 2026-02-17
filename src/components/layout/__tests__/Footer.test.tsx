import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Footer } from "@/components/layout/Footer";

let mockedPathname = "/en";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return { ...actual, usePathname: () => mockedPathname };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "nav.home": "Home",
        "nav.portfolio": "Portfolio",
        "nav.services": "Services",
        "nav.press": "Press",
        "nav.about": "About",
        "nav.contact": "Contact",
        "footer.contact": "Contact",
        "footer.language": "Language",
        "footer.follow": "Follow",
        "footer.rights": "All rights reserved."
      };
      return translations[key] || key;
    },
    i18n: { changeLanguage: vi.fn() }
  })
}));

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

    expect(screen.getByLabelText("Instagram")).toHaveAttribute("href", "https://instagram.com/c2c");
    expect(screen.getByLabelText("SoundCloud")).toHaveAttribute(
      "href",
      "https://soundcloud.com/c2c"
    );
    expect(screen.getByLabelText("Spotify")).toHaveAttribute(
      "href",
      "https://open.spotify.com/artist/c2c"
    );
    expect(screen.getByLabelText("YouTube")).toHaveAttribute("href", "https://youtube.com/c2c");
  });

  it("renders the brand name Coast2Coast", () => {
    mockedPathname = "/en";
    render(<Footer />);

    expect(screen.getByText("Coast2Coast")).toBeInTheDocument();
  });

  it("renders copyright text with current year", () => {
    mockedPathname = "/en";
    render(<Footer />);

    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year} Coast2Coast`))).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it("renders footer section labels", () => {
    mockedPathname = "/en";
    render(<Footer />);

    // Check for Contact section heading (not the nav link)
    const contactHeadings = screen.getAllByText("Contact");
    expect(contactHeadings.length).toBeGreaterThanOrEqual(1);

    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("Follow")).toBeInTheDocument();
  });
});
