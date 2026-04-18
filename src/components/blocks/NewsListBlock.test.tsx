import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NewsListBlock, type NewsListItem } from "./NewsListBlock";

const items: NewsListItem[] = [
  {
    _key: "1",
    date: "2026-10-25T00:00:00.000Z",
    label: "Entrevista Mixmag",
    href: "https://example.com/mixmag"
  },
  {
    _key: "2",
    date: "2026-10-26T00:00:00.000Z",
    label: "Taller de DJ"
  }
];

const baseProps = {
  title: "Noticias",
  eyebrow: "Press & mentions",
  ctaLabel: "MÁS INFO"
};

describe("NewsListBlock", () => {
  it("renders title, eyebrow, and a row per item", () => {
    render(<NewsListBlock {...baseProps} items={items} dateLocale="es" />);

    expect(screen.getByRole("heading", { name: "Noticias", level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Press & mentions")).toBeInTheDocument();
    expect(screen.getByText("Entrevista Mixmag")).toBeInTheDocument();
    expect(screen.getByText("Taller de DJ")).toBeInTheDocument();
  });

  it("wraps rows with href in links that use the item url", () => {
    render(<NewsListBlock {...baseProps} items={items} dateLocale="en" />);
    const link = screen.getByRole("link", { name: /Entrevista Mixmag/i });
    expect(link).toHaveAttribute("href", "https://example.com/mixmag");
  });

  it("skips rendering when items are empty", () => {
    const { container } = render(<NewsListBlock {...baseProps} items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("emits a dateTime attribute in ISO format for each dated row", () => {
    const { container } = render(<NewsListBlock {...baseProps} items={items} dateLocale="en" />);
    const times = container.querySelectorAll("time");
    expect(times).toHaveLength(2);
    expect(times[0]).toHaveAttribute("datetime", "2026-10-25");
    expect(times[1]).toHaveAttribute("datetime", "2026-10-26");
    expect(times[0].textContent ?? "").toMatch(/25|OCT/i);
  });
});
