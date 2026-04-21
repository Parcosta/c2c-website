import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ServicesBlock } from "./ServicesBlock";
import type { ServiceValue } from "@/sanity/queries";

const baseProps = {
  locale: "en" as const,
  title: "Services",
  description: "What we do for you.",
  ctaLabel: "Start a project",
  ctaHref: "/booking",
  image: { src: "/images/services-image.jpg", alt: "Coast2c studio" }
};

const services: ServiceValue[] = [
  {
    _id: "service-a",
    title: "Music Production",
    description: "Full production of electronic tracks."
  },
  {
    _id: "service-b",
    title: "Sound Design",
    description: "Soundscapes for installations and film."
  }
];

describe("ServicesBlock", () => {
  it("renders the section heading, description, and service items", () => {
    render(<ServicesBlock {...baseProps} services={services} />);

    expect(screen.getByRole("heading", { level: 2, name: "Services" })).toBeInTheDocument();
    expect(screen.getByText("What we do for you.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Music Production" })).toBeInTheDocument();
    expect(screen.getByText("Full production of electronic tracks.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Sound Design" })).toBeInTheDocument();
  });

  it("renders the CTA with a locale-prefixed href", () => {
    render(<ServicesBlock {...baseProps} services={services} />);

    const cta = screen.getByRole("link", { name: "Start a project" });
    expect(cta).toHaveAttribute("href", "/en/booking");
  });

  it("renders the services image with provided alt text", () => {
    render(<ServicesBlock {...baseProps} services={services} />);

    expect(screen.getByAltText("Coast2c studio")).toBeInTheDocument();
  });

  it("returns nothing when services array is empty", () => {
    const { container } = render(<ServicesBlock {...baseProps} services={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("omits service items without a title", () => {
    render(
      <ServicesBlock
        {...baseProps}
        services={[
          { _id: "service-a", title: "Music Production", description: "With title." },
          { _id: "service-b", description: "No title — should be skipped." }
        ]}
      />
    );

    expect(screen.getByText("Music Production")).toBeInTheDocument();
    expect(screen.queryByText("No title — should be skipped.")).not.toBeInTheDocument();
  });

  it("applies custom className to the section element", () => {
    const { container } = render(
      <ServicesBlock {...baseProps} services={services} className="custom-class" />
    );

    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
