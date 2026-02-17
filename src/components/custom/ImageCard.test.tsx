import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ImageCard } from "./ImageCard";

describe("ImageCard", () => {
  it("renders image, title and description", () => {
    render(
      <ImageCard
        src="/test.jpg"
        alt="Test image"
        title="Project One"
        description="A short description"
      />
    );

    expect(screen.getByRole("img", { name: "Test image" })).toHaveAttribute("src", "/test.jpg");
    expect(screen.getByText("Project One")).toBeInTheDocument();
    expect(screen.getByText("A short description")).toBeInTheDocument();
  });

  it("wraps content in a link when href is provided", () => {
    render(
      <ImageCard
        src="/test.jpg"
        alt="Test image"
        title="Project One"
        href="/work/project-one"
        ariaLabel="Open Project One"
      />
    );

    const link = screen.getByRole("link", { name: "Open Project One" });
    expect(link).toHaveAttribute("href", "/work/project-one");
  });

  it("uses title as default aria-label when href is provided without ariaLabel", () => {
    render(<ImageCard src="/test.jpg" alt="Test image" title="Project One" href="/x" />);
    expect(screen.getByRole("link", { name: "Project One" })).toHaveAttribute("href", "/x");
  });
});
