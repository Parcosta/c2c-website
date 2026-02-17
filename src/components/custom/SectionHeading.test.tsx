import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders title and subtitle", () => {
    render(<SectionHeading title="Work" subtitle="Selected projects" />);
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Selected projects")).toBeInTheDocument();
  });

  it("renders an accent line by default", () => {
    render(<SectionHeading title="Gallery" />);
    expect(screen.getByTestId("accent-line")).toBeInTheDocument();
  });

  it("can hide the accent line", () => {
    render(<SectionHeading title="Gallery" showAccent={false} />);
    expect(screen.queryByTestId("accent-line")).not.toBeInTheDocument();
  });

  it("supports different heading levels", () => {
    render(<SectionHeading title="Title" as="h3" />);
    expect(screen.getByRole("heading", { level: 3, name: "Title" })).toBeInTheDocument();
  });
});
