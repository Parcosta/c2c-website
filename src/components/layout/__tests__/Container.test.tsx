import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "@/components/layout/Container";

describe("Container", () => {
  it("renders children", () => {
    render(
      <Container>
        <div>Content</div>
      </Container>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("merges className", () => {
    render(<Container data-testid="container" className="bg-brand-accent" />);
    expect(screen.getByTestId("container")).toHaveClass("max-w-7xl");
    expect(screen.getByTestId("container")).toHaveClass("bg-brand-accent");
  });
});

