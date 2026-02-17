import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnimatedButton } from "./AnimatedButton";

describe("AnimatedButton", () => {
  it("renders a button with text", () => {
    render(<AnimatedButton>Click me</AnimatedButton>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("supports aria-label for accessibility", () => {
    render(<AnimatedButton aria-label="Save" />);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("applies shadcn variant styles", () => {
    render(<AnimatedButton variant="destructive">Delete</AnimatedButton>);
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass("bg-destructive");
  });

  it("can disable glow effect", () => {
    render(<AnimatedButton glow={false}>No Glow</AnimatedButton>);
    const button = screen.getByRole("button", { name: "No Glow" });
    expect(button.className).toContain("hover:scale");
    expect(button.className).not.toContain("hover:shadow-[0_0_0_3px");
  });
});
