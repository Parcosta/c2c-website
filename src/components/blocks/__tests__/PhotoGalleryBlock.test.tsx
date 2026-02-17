import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PhotoGalleryBlock } from "@/components/blocks/PhotoGalleryBlock";

describe("PhotoGalleryBlock", () => {
  it("renders a masonry grid of images and opens a lightbox dialog on click", async () => {
    render(
      <PhotoGalleryBlock
        title="Photo gallery"
        subtitle="A few favorites."
        images={[
          {
            _key: "a",
            url: "https://cdn.sanity.io/images/x/y/a.jpg",
            width: 1200,
            height: 800,
            alt: "First image",
            blurDataUrl: "data:image/jpeg;base64,abcd",
            caption: "Caption one"
          },
          {
            _key: "b",
            url: "https://cdn.sanity.io/images/x/y/b.jpg",
            width: 900,
            height: 1200,
            alt: "Second image"
          }
        ]}
      />
    );

    expect(screen.getByText("Photo gallery")).toBeInTheDocument();
    expect(screen.getByText("A few favorites.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "First image" })).toHaveAttribute(
      "src",
      "https://cdn.sanity.io/images/x/y/a.jpg"
    );
    expect(screen.getByText("Caption one")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open photo: First image" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("photo-gallery-dialog-image")).toHaveAttribute(
      "src",
      "https://cdn.sanity.io/images/x/y/a.jpg"
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

