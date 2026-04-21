import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SiteHeaderClient } from "./SiteHeaderClient";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({ push: mockPush })
}));

const translations = {
  brand: "Coast2c",
  primaryAriaLabel: "Primary",
  mobileAriaLabel: "Mobile",
  navHome: "Home",
  navPortfolio: "Portfolio",
  navServices: "Services",
  navPress: "Press",
  navAbout: "About",
  navContact: "Contact",
  navMobileMenu: "Open menu",
  navClose: "Close",
  languageSwitchToEnglish: "Switch to English",
  languageSwitchToSpanish: "Switch to Spanish"
};

describe("SiteHeaderClient", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the brand and desktop navigation labels", () => {
    render(<SiteHeaderClient locale="en" translations={translations} />);

    expect(screen.getByTestId("brand")).toHaveTextContent("Coast2c");
    expect(screen.getByTestId("nav-home")).toHaveTextContent("Home");
    expect(screen.getByTestId("nav-portfolio")).toHaveTextContent("Portfolio");
    expect(screen.getByTestId("nav-about")).toHaveTextContent("About");
  });

  it("renders Contact as an uppercase CTA link", () => {
    render(<SiteHeaderClient locale="en" translations={translations} />);
    const cta = screen.getByTestId("nav-contact");
    expect(cta).toHaveAttribute("href", "/en/contact");
    expect(cta.className).toMatch(/uppercase/);
  });

  it("switches locale via the single globe toggle", () => {
    render(<SiteHeaderClient locale="en" translations={translations} />);

    fireEvent.click(screen.getByTestId("lang-switch"));
    expect(mockPush).toHaveBeenCalledWith("/es");
  });

  it("toggles the mobile menu open and closed", () => {
    render(<SiteHeaderClient locale="en" translations={translations} />);

    fireEvent.click(screen.getByTestId("mobile-menu-button"));
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("mobile-menu-button"));
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
});
