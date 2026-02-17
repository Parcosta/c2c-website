import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ServicesBlock } from "./ServicesBlock";

describe("ServicesBlock", () => {
  it("renders a heading and service cards", () => {
    render(
      <ServicesBlock
        title="Services"
        subtitle="What we do"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            description: "Identity systems and guidelines.",
            icon: "Palette",
            features: ["Logo + visual system", "Guidelines", "Templates"]
          },
          {
            _id: "service-b",
            title: "Web Development",
            description: "Modern Next.js builds.",
            icon: "Code",
            features: ["App Router", "Performance", "SEO"]
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByText("What we do")).toBeInTheDocument();

    expect(screen.getByText("Brand Design")).toBeInTheDocument();
    expect(screen.getByText("Identity systems and guidelines.")).toBeInTheDocument();
    expect(screen.getByText("Logo + visual system")).toBeInTheDocument();

    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Modern Next.js builds.")).toBeInTheDocument();
    expect(screen.getByText("SEO")).toBeInTheDocument();
  });

  it("renders nothing when services are missing", () => {
    const { container } = render(<ServicesBlock title="Services" services={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
