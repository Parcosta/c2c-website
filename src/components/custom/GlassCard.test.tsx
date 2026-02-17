import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GlassCard } from "./GlassCard";

describe("GlassCard", () => {
  it("renders children", () => {
    render(
      <GlassCard>
        <div>Content</div>
      </GlassCard>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies glassmorphism classes", () => {
    render(<GlassCard data-testid="glass-card" />);
    expect(screen.getByTestId("glass-card")).toHaveClass("backdrop-blur-md");
  });
});
