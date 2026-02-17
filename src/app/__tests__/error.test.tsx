import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ErrorBoundary from "../error";

describe("error boundary", () => {
  it("calls reset when the user clicks try again", () => {
    const reset = vi.fn();
    const error = Object.assign(new Error("Boom"), { digest: "abc123" });

    render(<ErrorBoundary error={error} reset={reset} />);

    expect(screen.getByRole("heading", { name: "We hit a snag" })).toBeInTheDocument();
    expect(screen.getByText("Reference:")).toBeInTheDocument();
    expect(screen.getByText("abc123")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
