import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  PortfolioBlockClient,
  type PortfolioBlockItem
} from "@/components/blocks/PortfolioBlockClient";

describe("PortfolioBlockClient", () => {
  const items: PortfolioBlockItem[] = [
    {
      id: "1",
      title: "Project Alpha",
      slug: "alpha",
      category: "Branding",
      imageUrl: "/preview-1.svg"
    },
    { id: "2", title: "Project Beta", slug: "beta", category: "Web", imageUrl: "/preview-2.svg" },
    {
      id: "3",
      title: "Project Gamma",
      slug: "gamma",
      category: "Branding",
      imageUrl: "/preview-1.svg"
    }
  ];

  it("renders portfolio items linking to /portfolio/[slug]", () => {
    render(<PortfolioBlockClient items={items} />);

    expect(screen.getByRole("link", { name: "Project Alpha" })).toHaveAttribute(
      "href",
      "/portfolio/alpha"
    );
    expect(screen.getByRole("link", { name: "Project Beta" })).toHaveAttribute(
      "href",
      "/portfolio/beta"
    );
    expect(screen.getByRole("link", { name: "Project Gamma" })).toHaveAttribute(
      "href",
      "/portfolio/gamma"
    );
  });

  it("filters by category", () => {
    render(<PortfolioBlockClient items={items} />);

    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    expect(screen.getByText("Project Beta")).toBeInTheDocument();
    expect(screen.getByText("Project Gamma")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Branding" }));

    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    expect(screen.queryByText("Project Beta")).not.toBeInTheDocument();
    expect(screen.getByText("Project Gamma")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All" }));

    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    expect(screen.getByText("Project Beta")).toBeInTheDocument();
    expect(screen.getByText("Project Gamma")).toBeInTheDocument();
  });
});
