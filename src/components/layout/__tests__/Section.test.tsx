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
    // Section now uses CSS variables per Figma specs (48px mobile, 80px desktop)
    expect(screen.getByTestId("section")).toHaveClass("py-[var(--section-padding-mobile,48px)]");
    expect(screen.getByTestId("section")).toHaveClass("md:py-[var(--section-padding-desktop,80px)]");
  });
});
