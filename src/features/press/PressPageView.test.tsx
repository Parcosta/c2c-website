import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PressPageView } from "@/features/press/PressPageView";

describe("PressPageView", () => {
  it("renders core sections and placeholders", () => {
    render(
      <PressPageView
        locale="en"
        title="Press / EPK"
        pressMentions={[]}
        pressPhotos={[]}
        pressKitAssets={[]}
        bookings={{}}
      />
    );

    expect(screen.getByRole("heading", { name: "Press / EPK" })).toBeInTheDocument();
    expect(screen.getByText("Bio")).toBeInTheDocument();
    expect(screen.getByText("Press photos")).toBeInTheDocument();
    expect(screen.getByText("Press mentions")).toBeInTheDocument();
    expect(screen.getByText("Tech rider")).toBeInTheDocument();
    expect(screen.getByText("Stage plot")).toBeInTheDocument();
    expect(screen.getByText("Bookings")).toBeInTheDocument();

    expect(
      screen.getByText("Press photos will appear here once added in Sanity.")
    ).toBeInTheDocument();
    expect(screen.getByText("No press mentions yet.")).toBeInTheDocument();
    expect(
      screen.getByText("Downloadable assets will appear here once added in Sanity.")
    ).toBeInTheDocument();
    expect(screen.getByText("Placeholder — available upon request.")).toBeInTheDocument();
  });

  it("renders download links for photos and assets", () => {
    render(
      <PressPageView
        locale="en"
        title="Press / EPK"
        pressPhotos={[
          {
            _key: "p1",
            title: "Portrait",
            imageUrl: "https://cdn.sanity.io/images/project/dataset/photo.jpg",
            filename: "photo.jpg"
          }
        ]}
        pressKitAssets={[
          {
            _key: "d1",
            title: "Logo pack",
            url: "https://cdn.sanity.io/files/project/dataset/logos.zip",
            filename: "logos.zip"
          }
        ]}
        techRider={{
          url: "https://cdn.sanity.io/files/project/dataset/tech.pdf",
          filename: "tech.pdf"
        }}
        bookings={{ email: "bookings@example.com" }}
        pressMentions={[
          {
            _id: "m1",
            title: "Great show",
            publication: "Example Mag",
            date: "2025-01-10T00:00:00.000Z",
            url: "https://example.com/review",
            quote: "A must-see."
          }
        ]}
      />
    );

    const downloadLinks = screen.getAllByRole("link", { name: "Download" });
    expect(downloadLinks.length).toBeGreaterThanOrEqual(3);

    expect(screen.getByAltText("Portrait")).toHaveAttribute(
      "src",
      expect.stringContaining("auto=format")
    );

    expect(screen.getByRole("link", { name: "bookings@example.com" })).toHaveAttribute(
      "href",
      "mailto:bookings@example.com"
    );

    expect(screen.getByRole("link", { name: "Great show" })).toHaveAttribute(
      "href",
      "https://example.com/review"
    );
    expect(screen.getByText("“A must-see.”")).toBeInTheDocument();
  });
});
