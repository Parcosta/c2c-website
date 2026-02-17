import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CurrentWorkBlock } from "./CurrentWorkBlock";

describe("CurrentWorkBlock", () => {
  it("renders an image project with title and portable text description", () => {
    render(
      <CurrentWorkBlock
        heading="Current work"
        subtitle="What I'm building."
        project={{
          title: "Project Alpha",
          media: { kind: "image", url: "https://cdn.sanity.io/images/x/y/test.jpg" },
          description: [
            {
              _type: "block",
              _key: "a",
              style: "normal",
              markDefs: [],
              children: [{ _type: "span", _key: "b", text: "In progress.", marks: [] }]
            }
          ]
        }}
      />
    );

    expect(screen.getByText("Current work")).toBeInTheDocument();
    expect(screen.getByText("What I'm building.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Project Alpha" })).toHaveAttribute(
      "src",
      "https://cdn.sanity.io/images/x/y/test.jpg"
    );
    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    expect(screen.getByText("In progress.")).toBeInTheDocument();
  });

  it("renders a video when project media is video", () => {
    render(
      <CurrentWorkBlock
        project={{
          title: "Project Beta",
          media: { kind: "video", url: "https://cdn.sanity.io/files/x/y/test.mp4", mimeType: "video/mp4" }
        }}
      />
    );

    const video = screen.getByTestId("current-work-video");
    expect(video).toHaveAttribute("src", "https://cdn.sanity.io/files/x/y/test.mp4");
  });

  it("renders a fallback state when project is missing", () => {
    render(<CurrentWorkBlock project={null} />);

    expect(screen.getByText("Coming soon")).toBeInTheDocument();
    expect(screen.getByTestId("current-work-media-empty")).toBeInTheDocument();
  });
});

