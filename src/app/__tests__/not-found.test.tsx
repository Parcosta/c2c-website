import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound from "../not-found";
import { defaultLocale } from "@/lib/i18n";

describe("not-found", () => {
  it("renders a 404 message and a link home", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: "This page doesn’t exist" })).toBeInTheDocument();
    expect(screen.getByText("404")).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Go to homepage" });
    expect(homeLink).toHaveAttribute("href", `/${defaultLocale}`);
  });
});

