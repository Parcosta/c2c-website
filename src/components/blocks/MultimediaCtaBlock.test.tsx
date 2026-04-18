import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MultimediaCtaBlock } from "./MultimediaCtaBlock";

describe("MultimediaCtaBlock", () => {
  const baseProps = {
    title: "Música y diseño sonoro",
    description: "Un proyecto integral de diseño sonoro para performance.",
    ctaLabel: "Trabajemos juntos",
    ctaHref: "/es/contact"
  };

  it("renders heading, description, and a link to the CTA href", () => {
    render(<MultimediaCtaBlock {...baseProps} />);

    expect(screen.getByRole("heading", { name: baseProps.title, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: baseProps.ctaLabel });
    expect(cta).toHaveAttribute("href", baseProps.ctaHref);
  });

  it("associates the section with its heading for assistive tech", () => {
    render(<MultimediaCtaBlock {...baseProps} />);
    const region = screen.getByTestId("multimedia-cta-block");
    expect(region).toHaveAttribute("aria-labelledby", "multimedia-cta-title");
  });
});
