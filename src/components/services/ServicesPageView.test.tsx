import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ServicesPageView } from "./ServicesPageView";

const content = {
  heading: "Services",
  subheading: "Everything we offer",
  emptyMessage: "No services are published yet.",
  pricingLabel: "Pricing",
  serviceFallbackTitle: "Service"
};

describe("ServicesPageView", () => {
  it("renders service cards with title, description, features, icon, and pricing when present", () => {
    render(
      <ServicesPageView
        locale="en"
        content={content}
        services={[
          {
            _id: "svc-1",
            title: "Web Design",
            description: "Modern, fast, and accessible websites.",
            icon: "Zap",
            pricing: "Starting at $2,500",
            features: ["Discovery workshop", "Design system", "Responsive layouts"]
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { level: 1, name: "Services" })).toBeInTheDocument();
    expect(screen.getByText("Web Design")).toBeInTheDocument();
    expect(screen.getByText("Modern, fast, and accessible websites.")).toBeInTheDocument();
    expect(screen.getByText("Discovery workshop")).toBeInTheDocument();
    expect(screen.getByText("Pricing: Starting at $2,500")).toBeInTheDocument();
    expect(screen.getByTestId("service-icon")).toBeInTheDocument();
  });

  it("renders an empty state when no services are provided", () => {
    render(<ServicesPageView locale="en" services={[]} content={content} />);
    expect(screen.getByText("No services are published yet.")).toBeInTheDocument();
  });
});
