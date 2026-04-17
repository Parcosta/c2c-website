import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Footer } from "@/components/layout/Footer";

let mockedPathname = "/en";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return { ...actual, usePathname: () => mockedPathname };
});

const navLabels = {
  "nav.home": "Home",
  "nav.portfolio": "Portfolio",
  "nav.services": "Services",
  "nav.press": "Press",
  "nav.about": "About",
  "nav.contact": "Contact"
};

describe("Footer", () => {
  it("renders nav links with locale-prefixed hrefs", () => {
    mockedPathname = "/en/press";
    render(
      <Footer
        brand="Coast2Coast"
        footerAriaLabel="Footer"
        contactLabel="Contact"
        languageLabel="Language"
        followLabel="Follow"
        rightsLabel="All rights reserved."
        tagline="Modular techno & DJ sets"
        navLabels={navLabels}
      />
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/en/portfolio"
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/en/services");
  });

  it("renders a language switcher that preserves the current path", () => {
    mockedPathname = "/en/portfolio";
    render(
      <Footer
        brand="Coast2Coast"
        footerAriaLabel="Footer"
        contactLabel="Contact"
        languageLabel="Language"
        followLabel="Follow"
        rightsLabel="All rights reserved."
        tagline="Modular techno & DJ sets"
        navLabels={navLabels}
      />
    );

    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en/portfolio");
    expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute("href", "/es/portfolio");
  });
});
