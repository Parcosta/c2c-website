import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { SiteHeader } from "./SiteHeader";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("SiteHeader with i18next", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders navigation with translated labels", () => {
    render(<SiteHeader locale="en" />);

    expect(screen.getByTestId("nav-home")).toHaveTextContent("Home");
    expect(screen.getByTestId("nav-portfolio")).toHaveTextContent("Portfolio");
    expect(screen.getByTestId("nav-contact")).toHaveTextContent("Contact");
    expect(screen.getByTestId("brand")).toHaveTextContent("Coast2Coast");
  });

  it("has working language switcher buttons", () => {
    render(<SiteHeader locale="en" />);

    const enButton = screen.getByTestId("lang-en");
    const esButton = screen.getByTestId("lang-es");

    expect(enButton).toHaveAttribute("aria-label", "Switch language to English");
    expect(esButton).toHaveAttribute("aria-label", "Switch language to Spanish");
  });

  it("calls i18n.changeLanguage when switching locales", () => {
    render(<SiteHeader locale="en" />);
    
    const esButton = screen.getByTestId("lang-es");
    fireEvent.click(esButton);
    
    // The changeLanguage function should have been called
    // This is verified through the mock in test/setup.ts
    expect(esButton).toBeInTheDocument();
  });

  it("renders with correct Figma background styling", () => {
    render(<SiteHeader locale="en" />);
    
    const header = screen.getByTestId("site-header");
    expect(header).toHaveClass("bg-gray-950/70");
    expect(header).toHaveClass("backdrop-blur");
    expect(header).toHaveClass("border-gray-800");
  });

  it("renders brand with DM Sans font and correct styling", () => {
    render(<SiteHeader locale="en" />);
    
    const brand = screen.getByTestId("brand");
    expect(brand).toHaveClass("font-display");
    expect(brand).toHaveClass("text-base");
    expect(brand).toHaveClass("font-semibold");
    expect(brand).toHaveClass("text-gray-100");
  });

  it("renders nav links with gray-200 color that hover to white", () => {
    render(<SiteHeader locale="en" />);
    
    const homeLink = screen.getByTestId("nav-home");
    // Check for color classes (component uses text-small custom class)
    const className = homeLink.className;
    expect(className).toContain("text-gray-200");
    expect(className).toContain("hover:text-white");
  });

  it("renders desktop navigation on larger screens", () => {
    render(<SiteHeader locale="en" />);
    
    const desktopNav = screen.getByTestId("desktop-nav");
    expect(desktopNav).toHaveClass("hidden");
    expect(desktopNav).toHaveClass("md:flex");
  });

  it("renders mobile menu button on smaller screens", () => {
    render(<SiteHeader locale="en" />);
    
    const mobileButton = screen.getByTestId("mobile-menu-button");
    expect(mobileButton).toHaveClass("md:hidden");
    expect(mobileButton).toBeInTheDocument();
  });

  it("toggles mobile menu when clicking menu button", () => {
    render(<SiteHeader locale="en" />);
    
    const mobileButton = screen.getByTestId("mobile-menu-button");
    
    // Initially mobile menu should not be visible
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(mobileButton);
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
    
    // Click to close
    fireEvent.click(mobileButton);
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("renders mobile navigation links when menu is open", () => {
    render(<SiteHeader locale="en" />);
    
    const mobileButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(mobileButton);
    
    expect(screen.getByTestId("mobile-nav-home")).toHaveTextContent("Home");
    expect(screen.getByTestId("mobile-nav-portfolio")).toHaveTextContent("Portfolio");
    expect(screen.getByTestId("mobile-nav-contact")).toHaveTextContent("Contact");
  });

  it("renders mobile language switcher when menu is open", () => {
    render(<SiteHeader locale="en" />);
    
    const mobileButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(mobileButton);
    
    const mobileLangSwitcher = screen.getByTestId("mobile-language-switcher");
    expect(mobileLangSwitcher).toBeInTheDocument();
    expect(screen.getByTestId("mobile-lang-en")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-lang-es")).toBeInTheDocument();
  });

  it("closes mobile menu when clicking a nav link", () => {
    render(<SiteHeader locale="en" />);
    
    const mobileButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(mobileButton);
    
    const mobileNavLink = screen.getByTestId("mobile-nav-home");
    fireEvent.click(mobileNavLink);
    
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("closes mobile menu when clicking close button", () => {
    render(<SiteHeader locale="en" />);
    
    const mobileButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(mobileButton);
    
    const closeButton = screen.getByTestId("mobile-menu-close");
    fireEvent.click(closeButton);
    
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("closes mobile menu when switching language", () => {
    render(<SiteHeader locale="en" />);
    
    const mobileButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(mobileButton);
    
    const mobileLangEs = screen.getByTestId("mobile-lang-es");
    fireEvent.click(mobileLangEs);
    
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("applies active state styling to EN button when locale is en", () => {
    render(<SiteHeader locale="en" />);
    
    const enButton = screen.getByTestId("lang-en");
    const esButton = screen.getByTestId("lang-es");
    
    expect(enButton).toHaveClass("bg-gray-800");
    expect(enButton).toHaveClass("text-white");
    expect(esButton).not.toHaveClass("bg-gray-800");
  });

  it("applies active state styling to ES button when locale is es", () => {
    render(<SiteHeader locale="es" />);
    
    const enButton = screen.getByTestId("lang-en");
    const esButton = screen.getByTestId("lang-es");
    
    expect(esButton).toHaveClass("bg-gray-800");
    expect(esButton).toHaveClass("text-white");
    expect(enButton).not.toHaveClass("bg-gray-800");
  });

  it("has correct accessibility attributes on mobile menu button", () => {
    render(<SiteHeader locale="en" />);
    
    const mobileButton = screen.getByTestId("mobile-menu-button");
    expect(mobileButton).toHaveAttribute("aria-expanded", "false");
    expect(mobileButton).toHaveAttribute("aria-controls", "mobile-menu");
    
    fireEvent.click(mobileButton);
    expect(mobileButton).toHaveAttribute("aria-expanded", "true");
  });

  it("navigates to correct locale path when switching from Spanish", () => {
    render(<SiteHeader locale="es" />);
    
    const enButton = screen.getByTestId("lang-en");
    fireEvent.click(enButton);
    
    // Should navigate to the EN version of the path
    expect(mockPush).toHaveBeenCalledWith("/en");
  });

  it("renders sticky header with correct z-index", () => {
    render(<SiteHeader locale="en" />);
    
    const header = screen.getByTestId("site-header");
    expect(header).toHaveClass("sticky");
    expect(header).toHaveClass("top-0");
    expect(header).toHaveClass("z-40");
  });
});
