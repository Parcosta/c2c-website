import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PortfolioGrid } from "./PortfolioGrid";

describe("PortfolioGrid", () => {
  it("renders items and filters by category", () => {
    render(
      <PortfolioGrid
        locale="en"
        items={[
          {
            id: "1",
            title: "Project One",
            slug: "project-one",
            category: "Design",
            imageUrl: "/test.jpg",
            date: "2026-01-10T00:00:00Z"
          },
          {
            id: "2",
            title: "Project Two",
            slug: "project-two",
            category: "Engineering",
            imageUrl: "/test.jpg"
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { level: 1, name: "Portfolio" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Project One" })).toHaveAttribute(
      "href",
      "/en/portfolio/project-one"
    );
    expect(screen.getByRole("link", { name: "Project Two" })).toHaveAttribute(
      "href",
      "/en/portfolio/project-two"
    );

    fireEvent.click(screen.getByRole("button", { name: "Design" }));
    expect(screen.getByRole("link", { name: "Project One" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Project Two" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByRole("link", { name: "Project Two" })).toBeInTheDocument();
  });

  it("shows an empty state when there are no items", () => {
    render(<PortfolioGrid locale="en" items={[]} />);
    expect(screen.getByText("No portfolio items in this category yet.")).toBeInTheDocument();
  });
});
