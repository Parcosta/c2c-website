import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PressBlock } from "./PressBlock";

describe("PressBlock", () => {
  it("renders press mentions with publication, quote, date, and link", () => {
    render(
      <PressBlock
        locale="en"
        items={[
          {
            _id: "press-1",
            publication: "Design Weekly",
            quote: "A sharp, modern redesign that feels effortless.",
            date: "2026-02-10T00:00:00.000Z",
            url: "https://example.com/press"
          }
        ]}
      />
    );

    expect(screen.getByText("Design Weekly")).toBeInTheDocument();
    expect(screen.getByText(/A sharp, modern redesign/i)).toBeInTheDocument();

    const time = screen.getByTestId("press-date-press-1");
    expect(time).toHaveAttribute("dateTime", "2026-02-10");
    expect(time.textContent?.length).toBeGreaterThan(0);

    expect(screen.getByRole("link", { name: "Read" })).toHaveAttribute(
      "href",
      "https://example.com/press"
    );
  });

  it("renders nothing when there are no visible items", () => {
    const { container } = render(<PressBlock locale="en" items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
