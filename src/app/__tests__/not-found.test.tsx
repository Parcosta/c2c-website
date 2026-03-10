import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("not-found", () => {
  it("renders a 404 message and a link home", async () => {
    // Dynamic import to ensure mocks are set up first
    const { default: NotFound } = await import("../not-found");
    
    render(await NotFound());

    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(screen.getByText(/that route doesn.*t exist/i)).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Back to home" });
    // Link now goes to /en as default locale
    expect(homeLink).toHaveAttribute("href", "/en");
  });
});
