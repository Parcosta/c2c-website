import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PortfolioDetail } from "./PortfolioDetail";

describe("PortfolioDetail", () => {
  it("renders title, tags, gallery, and description", () => {
    render(
      <PortfolioDetail
        item={{
          id: "1",
          title: "Case Study",
          slug: "case-study",
          category: "Design",
          images: [
            { url: "/a.jpg", alt: "Image A" },
            { url: "/b.jpg", alt: "Image B" }
          ],
          description: [
            {
              _type: "block",
              children: [{ _type: "span", text: "Hello from Sanity." }]
            }
          ],
          date: "2026-02-01T00:00:00Z",
          tags: ["Next.js", "Sanity"],
          locale: "en"
        }}
      />
    );

    expect(screen.getByRole("link", { name: "Back to portfolio" })).toHaveAttribute("href", "/en/portfolio");
    expect(screen.getByRole("heading", { level: 1, name: "Case Study" })).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Sanity")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getByText("Hello from Sanity.")).toBeInTheDocument();
  });
});

