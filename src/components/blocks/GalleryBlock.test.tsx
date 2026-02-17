import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { GalleryBlock, type GalleryImage } from "./GalleryBlock";

// Mock the Sanity image utility
vi.mock("@/sanity/image", () => ({
  getSanityImageUrl: (src: unknown, options?: { width?: number }) => {
    if (!src) return null;
    return `https://cdn.sanity.io/image-${options?.width || 600}.jpg`;
  }
}));

const mockImages: GalleryImage[] = [
  {
    _id: "img1",
    src: { _ref: "image-1" },
    alt: "First image",
    caption: "Caption for first image"
  },
  {
    _id: "img2",
    src: { _ref: "image-2" },
    alt: "Second image"
  },
  {
    _id: "img3",
    src: { _ref: "image-3" },
    caption: "Caption for third image"
  }
];

describe("GalleryBlock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when no images are provided", () => {
    const { container } = render(<GalleryBlock images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders gallery with images", () => {
    render(<GalleryBlock images={mockImages} />);
    
    expect(screen.getByTestId("gallery-block")).toBeInTheDocument();
    expect(screen.getByTestId("gallery-image-img1")).toBeInTheDocument();
    expect(screen.getByTestId("gallery-image-img2")).toBeInTheDocument();
    expect(screen.getByTestId("gallery-image-img3")).toBeInTheDocument();
  });

  it("renders with title and subtitle", () => {
    render(
      <GalleryBlock
        images={mockImages}
        title="Test Gallery"
        subtitle="A collection of test images"
      />
    );
    
    expect(screen.getByText("Test Gallery")).toBeInTheDocument();
    expect(screen.getByText("A collection of test images")).toBeInTheDocument();
  });

  it("opens lightbox when clicking an image", async () => {
    render(<GalleryBlock images={mockImages} />);
    
    const firstImage = screen.getByTestId("gallery-image-img1");
    fireEvent.click(firstImage);
    
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });
  });

  it("closes lightbox when close button is clicked", async () => {
    render(<GalleryBlock images={mockImages} />);
    
    // Open lightbox
    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });
    
    // Close lightbox
    fireEvent.click(screen.getByTestId("lightbox-close"));
    
    await waitFor(() => {
      expect(screen.queryByTestId("gallery-lightbox")).not.toBeInTheDocument();
    });
  });

  it("navigates to next image in lightbox", async () => {
    render(<GalleryBlock images={mockImages} />);
    
    // Open lightbox with first image
    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });
    
    // Navigate to next
    fireEvent.click(screen.getByTestId("lightbox-next"));
    
    // Should show counter as 2/3
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("navigates to previous image in lightbox", async () => {
    render(<GalleryBlock images={mockImages} />);
    
    // Open lightbox with second image
    fireEvent.click(screen.getByTestId("gallery-image-img2"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });
    
    // Navigate to previous
    fireEvent.click(screen.getByTestId("lightbox-previous"));
    
    // Should show counter as 1/3
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("cycles to first image when clicking next on last image", async () => {
    render(<GalleryBlock images={mockImages} />);
    
    // Open lightbox with last image
    fireEvent.click(screen.getByTestId("gallery-image-img3"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });
    
    // Navigate to next (should cycle to first)
    fireEvent.click(screen.getByTestId("lightbox-next"));
    
    // Should show counter as 1/3
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("cycles to last image when clicking previous on first image", async () => {
    render(<GalleryBlock images={mockImages} />);
    
    // Open lightbox with first image
    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });
    
    // Navigate to previous (should cycle to last)
    fireEvent.click(screen.getByTestId("lightbox-previous"));
    
    // Should show counter as 3/3
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("does not render navigation buttons for single image", async () => {
    render(<GalleryBlock images={[mockImages[0]]} />);
    
    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });
    
    expect(screen.queryByTestId("lightbox-next")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lightbox-previous")).not.toBeInTheDocument();
  });

  it("displays image counter in lightbox", async () => {
    render(<GalleryBlock images={mockImages} />);
    
    // Open lightbox with first image
    fireEvent.click(screen.getByTestId("gallery-image-img1"));
    await waitFor(() => {
      expect(screen.getByTestId("gallery-lightbox")).toBeInTheDocument();
    });
    
    // Check counter shows 1/3
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<GalleryBlock images={mockImages} className="custom-class" />);
    
    expect(screen.getByTestId("gallery-block")).toHaveClass("custom-class");
  });

  it("renders with correct column classes for different column counts", () => {
    const { rerender } = render(<GalleryBlock images={mockImages} columns={2} />);
    
    let grid = screen.getByTestId("gallery-block").querySelector(".grid");
    expect(grid).toHaveClass("sm:grid-cols-2");
    
    rerender(<GalleryBlock images={mockImages} columns={3} />);
    grid = screen.getByTestId("gallery-block").querySelector(".grid");
    expect(grid).toHaveClass("lg:grid-cols-3");
    
    rerender(<GalleryBlock images={mockImages} columns={4} />);
    grid = screen.getByTestId("gallery-block").querySelector(".grid");
    expect(grid).toHaveClass("lg:grid-cols-4");
  });
});
