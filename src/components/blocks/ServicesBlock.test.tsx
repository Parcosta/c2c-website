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

  it("renders nothing when services is undefined", () => {
    const { container } = render(<ServicesBlock title="Services" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders without subtitle when not provided", () => {
    render(
      <ServicesBlock
        title="Services"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            description: "Identity systems and guidelines.",
            icon: "Palette"
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByText("Brand Design")).toBeInTheDocument();
  });

  it("renders without title when not provided", () => {
    render(
      <ServicesBlock
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            description: "Identity systems and guidelines.",
            icon: "Palette"
          }
        ]}
      />
    );

    expect(screen.getByText("Brand Design")).toBeInTheDocument();
    expect(screen.getByText("Identity systems and guidelines.")).toBeInTheDocument();
  });

  it("renders service without description", () => {
    render(
      <ServicesBlock
        title="Services"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            icon: "Palette",
            features: ["Logo design"]
          }
        ]}
      />
    );

    expect(screen.getByText("Brand Design")).toBeInTheDocument();
    expect(screen.getByText("Logo design")).toBeInTheDocument();
  });

  it("renders service without features", () => {
    render(
      <ServicesBlock
        title="Services"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            description: "Identity systems.",
            icon: "Palette"
          }
        ]}
      />
    );

    expect(screen.getByText("Brand Design")).toBeInTheDocument();
    expect(screen.getByText("Identity systems.")).toBeInTheDocument();
  });

  it("renders service with pricing", () => {
    render(
      <ServicesBlock
        title="Services"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            description: "Identity systems.",
            icon: "Palette",
            pricing: "$1,000"
          }
        ]}
      />
    );

    expect(screen.getByText("Brand Design")).toBeInTheDocument();
    expect(screen.getByText(/Starting at \$1,000/)).toBeInTheDocument();
  });

  it("renders with default icon when icon name is invalid", () => {
    render(
      <ServicesBlock
        title="Services"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            description: "Identity systems.",
            icon: "NonExistentIcon"
          }
        ]}
      />
    );

    expect(screen.getByText("Brand Design")).toBeInTheDocument();
  });

  it("renders with default icon when icon is undefined", () => {
    render(
      <ServicesBlock
        title="Services"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            description: "Identity systems."
          }
        ]}
      />
    );

    expect(screen.getByText("Brand Design")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ServicesBlock
        title="Services"
        className="custom-class"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            icon: "Palette"
          }
        ]}
      />
    );

    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders multiple features correctly", () => {
    render(
      <ServicesBlock
        title="Services"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            description: "Identity systems.",
            icon: "Palette",
            features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
          }
        ]}
      />
    );

    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
    expect(screen.getByText("Feature 4")).toBeInTheDocument();
  });

  it("renders features list with correct role", () => {
    render(
      <ServicesBlock
        title="Services"
        services={[
          {
            _id: "service-a",
            title: "Brand Design",
            icon: "Palette",
            features: ["Feature 1"]
          }
        ]}
      />
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
