import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "@/components/layout/Section";

describe("Section", () => {
  it("renders as a section element", () => {
    render(<Section>Hi</Section>);
    expect(screen.getByText("Hi").closest("section")).toBeInTheDocument();
  });

  it("applies default vertical spacing classes", () => {
    render(<Section data-testid="section" />);
    expect(screen.getByTestId("section")).toHaveClass("py-16");
    expect(screen.getByTestId("section")).toHaveClass("md:py-24");
  });
});

