import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AboutPageView } from "@/features/about/AboutPageView";

describe("AboutPageView", () => {
  it("renders headings and empty-state placeholders", () => {
    render(<AboutPageView locale="en" />);

    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(screen.getByText("Artist bio")).toBeInTheDocument();
    expect(screen.getByText("Discography / releases")).toBeInTheDocument();
    expect(screen.getByText("Equipment / setup")).toBeInTheDocument();
    expect(screen.getByText("Influences")).toBeInTheDocument();

    expect(screen.getByText("Bio content will appear here once added in Sanity.")).toBeInTheDocument();
    expect(screen.getByText("Releases will appear here once added in Sanity.")).toBeInTheDocument();
    expect(screen.getAllByText("Setup details will appear here once added in Sanity.").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Influences will appear here once added in Sanity.")).toBeInTheDocument();
  });

  it("renders bio, photo, releases, equipment, and influences when provided", () => {
    render(
      <AboutPageView
        locale="en"
        title="About C2C"
        intro="A short intro."
        photoUrl="https://cdn.sanity.io/images/project/dataset/photo.jpg"
        photoAlt="Portrait"
        bio={[
          {
            _type: "block",
            _key: "b1",
            style: "normal",
            markDefs: [],
            children: [{ _type: "span", _key: "s1", text: "Bio text here." }]
          }
        ]}
        releases={[
          { _key: "r1", title: "Release One", year: 2024, label: "Label X", url: "https://example.com/release" }
        ]}
        equipmentGroups={[
          { _key: "g1", title: "Modular", items: ["Eurorack", "Sequencer"] },
          { _key: "g2", title: "DJ", items: ["CDJs", "Mixer"] }
        ]}
        influences={["Drexciya", "Jeff Mills"]}
      />
    );

    expect(screen.getByRole("heading", { name: "About C2C" })).toBeInTheDocument();
    expect(screen.getByText("A short intro.")).toBeInTheDocument();

    expect(screen.getByAltText("Portrait")).toHaveAttribute(
      "src",
      "https://cdn.sanity.io/images/project/dataset/photo.jpg"
    );
    expect(screen.getByText("Bio text here.")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Release One" })).toHaveAttribute("href", "https://example.com/release");
    expect(screen.getByText("2024 · Label X")).toBeInTheDocument();

    expect(screen.getByText("Modular")).toBeInTheDocument();
    expect(screen.getByText("Eurorack")).toBeInTheDocument();
    expect(screen.getByText("DJ")).toBeInTheDocument();
    expect(screen.getByText("Mixer")).toBeInTheDocument();

    expect(screen.getByText("Drexciya")).toBeInTheDocument();
    expect(screen.getByText("Jeff Mills")).toBeInTheDocument();
  });
});

