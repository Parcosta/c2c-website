import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { LanguageToggle } from "@/components/layout/LanguageToggle";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => "/en/portfolio",
  useRouter: () => ({
    push: mockPush
  })
}));

describe("LanguageToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders language buttons without locale in pathname", () => {
    render(<LanguageToggle locale="en" />);

    const enButton = screen.getByRole("button", { name: "EN" });
    const esButton = screen.getByRole("button", { name: "ES" });

    expect(enButton).toHaveAttribute("aria-current", "page");
    expect(esButton).toBeInTheDocument();
  });

  it("switches locales using URL navigation", () => {
    render(<LanguageToggle locale="en" />);

    const esButton = screen.getByRole("button", { name: "ES" });
    fireEvent.click(esButton);

    // Should navigate to Spanish version of current page
    expect(mockPush).toHaveBeenCalledWith("/es/portfolio");
  });

  it("switches from Spanish to English", () => {
    render(<LanguageToggle locale="es" />);

    const enButton = screen.getByRole("button", { name: "EN" });
    fireEvent.click(enButton);

    expect(mockPush).toHaveBeenCalledWith("/en/portfolio");
  });
});
