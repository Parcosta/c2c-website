import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Loading from "../loading";

describe("loading", () => {
  it("renders an accessible loading state with skeletons", () => {
    const { container } = render(<Loading />);

    const main = screen.getByLabelText("Loading");
    expect(main).toHaveAttribute("aria-busy", "true");

    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(5);
  });
});

