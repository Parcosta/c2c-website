import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { SiteHeader } from "./SiteHeader";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({
    push: mockPush
  })
}));

const content = {
  brand: "Coast2c",
  primaryAriaLabel: "Primary",
  mobileAriaLabel: "Mobile",
  navHome: "Home",
  navPortfolio: "Portfolio",
  navServices: "Services",
  navPress: "Press",
  navAbout: "About",
  navContact: "Contact",
  navMobileMenu: "Menu",
  navClose: "Close",
  languageSwitchToEnglish: "Switch language to English",
  languageSwitchToSpanish: "Switch language to Spanish"
};

describe("SiteHeader", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders navigation labels", () => {
    render(<SiteHeader locale="en" content={content} />);

    expect(screen.getByTestId("nav-home")).toHaveTextContent("Home");
    expect(screen.getByTestId("nav-portfolio")).toHaveTextContent("Portfolio");
    expect(screen.getByTestId("nav-contact")).toHaveTextContent("Contact");
    expect(screen.getByTestId("brand")).toHaveTextContent("Coast2c");
  });

  it("navigates when switching locales", () => {
    render(<SiteHeader locale="en" content={content} />);

    fireEvent.click(screen.getByTestId("lang-es"));
    expect(mockPush).toHaveBeenCalledWith("/es");
  });

  it("toggles and closes the mobile menu", () => {
    render(<SiteHeader locale="en" content={content} />);

    fireEvent.click(screen.getByTestId("mobile-menu-button"));
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("mobile-menu-close"));
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
});
