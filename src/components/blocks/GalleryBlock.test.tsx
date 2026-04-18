import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { GalleryBlock, type GalleryImage } from "./GalleryBlock";

vi.mock("@/sanity/image", () => ({
  getSanityImageUrl: (src: unknown, options?: { width?: number }) => {
    if (!src) return null;
    return `https://cdn.sanity.io/image-${options?.width || 600}.jpg`;
  }
}));

const mockImages: GalleryImage[] = [
  {
    _id: "img1",
    src: { _type: "image", asset: { _ref: "image-1", _type: "reference" } },
    alt: "First image",
    caption: "Caption for first image"
  },
  {
    _id: "img2",
    src: { _type: "image", asset: { _ref: "image-2", _type: "reference" } },
    alt: "Second image"
  },
  {
    _id: "img3",
    src: { _type: "image", asset: { _ref: "image-3", _type: "reference" } },
    caption: "Caption for third image"
  }
];

const baseProps = {
  title: "Test Gallery",
  eyebrow: "High-resolution imagery"
};

describe("GalleryBlock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when no images are provided", () => {
    const { container } = render(<GalleryBlock {...baseProps} images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders gallery with images", () => {
    render(<GalleryBlock {...baseProps} images={mockImages} />);

    expect(screen.getByTestId("gallery-block")).toBeInTheDocument();
    expect(screen.getByTestId("gallery-image-img1")).toBeInTheDocument();
    expect(screen.getByTestId("gallery-image-img2")).toBeInTheDocument();
    expect(screen.getByTestId("gallery-image-img3")).toBeInTheDocument();
  });

  it("renders with title and eyebrow", () => {
    render(<GalleryBlock {...baseProps} images={mockImages} />);

    expect(screen.getByText("Test Gallery")).toBeInTheDocument();
    expect(screen.getByText("High-resolution imagery")).toBeInTheDocument();
  });

  it("opens lightbox when clicking an image", async () => {
    render(<GalleryBlock {...baseProps} images={mockImages} />);

    fireEvent.click(screen.getByTestId("gallery-image-img1"));

    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });
  });

  it("closes lightbox when close button is clicked", async () => {
    render(<GalleryBlock {...baseProps} images={mockImages} />);

    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("lightbox-close"));

    await waitFor(() => {
      expect(screen.queryByTestId("gallery-lightbox")).not.toBeInTheDocument();
    });
  });

  it("navigates to next image in lightbox", async () => {
    render(<GalleryBlock {...baseProps} images={mockImages} />);

    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("lightbox-next"));
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("navigates to previous image in lightbox", async () => {
    render(<GalleryBlock {...baseProps} images={mockImages} />);

    fireEvent.click(screen.getByTestId("gallery-image-img2"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("lightbox-previous"));
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("cycles to first image when clicking next on last image", async () => {
    render(<GalleryBlock {...baseProps} images={mockImages} />);

    fireEvent.click(screen.getByTestId("gallery-image-img3"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("lightbox-next"));
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("cycles to last image when clicking previous on first image", async () => {
    render(<GalleryBlock {...baseProps} images={mockImages} />);

    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("lightbox-previous"));
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("does not render navigation buttons for single image", async () => {
    render(<GalleryBlock {...baseProps} images={[mockImages[0]]} />);

    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });

    expect(screen.queryByTestId("lightbox-next")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lightbox-previous")).not.toBeInTheDocument();
  });

  it("displays image counter in lightbox", async () => {
    render(<GalleryBlock {...baseProps} images={mockImages} />);

    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });

    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<GalleryBlock {...baseProps} images={mockImages} className="custom-class" />);
    expect(screen.getByTestId("gallery-block")).toHaveClass("custom-class");
  });

  it("renders with correct column classes for different column counts", () => {
    const { rerender } = render(<GalleryBlock {...baseProps} images={mockImages} columns={2} />);

    let grid = screen.getByTestId("gallery-block").querySelector(".grid");
    expect(grid).toHaveClass("sm:grid-cols-2");

    rerender(<GalleryBlock {...baseProps} images={mockImages} columns={3} />);
    grid = screen.getByTestId("gallery-block").querySelector(".grid");
    expect(grid).toHaveClass("lg:grid-cols-3");

    rerender(<GalleryBlock {...baseProps} images={mockImages} columns={4} />);
    grid = screen.getByTestId("gallery-block").querySelector(".grid");
    expect(grid).toHaveClass("lg:grid-cols-4");
  });
});
