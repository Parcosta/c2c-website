import { render } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import type { PageValue } from "@/sanity/queries";

const getHomePageMock = vi.fn<(locale: string) => Promise<PageValue | null>>();

vi.mock("@/sanity/cache", () => ({
  getHomePage: (locale: string) => getHomePageMock(locale)
}));

// Keep image URL builder deterministic in tests.
vi.mock("@/sanity/image", () => ({
  getSanityImageUrl: () => "https://cdn.example.com/hero.jpg"
}));

// Import AFTER the mocks so the wrapper binds to the stubbed modules.
// eslint-disable-next-line import/first
import { HeroBlockWrapper } from "@/components/blocks/HeroBlockWrapper";

const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

function completePage(): PageValue {
  return {
    _id: "home-page",
    hero: {
      heading: "Hero heading",
      subheading: "Subheading",
      cta: { label: "Book", href: "/booking" }
    },
    homeSections: {
      heroEyebrows: ["Tag 1", "Tag 2"],
      heroSecondaryCta: { label: "Watch", href: "/portfolio" },
      heroAudioTrackLabel: "Featured track"
    }
  } as PageValue;
}

async function renderWrapper(locale: "en" | "es" = "en") {
  // HeroBlockWrapper is an async server component — call it directly and
  // render the resolved React element.
  const element = await HeroBlockWrapper({ locale });
  return render(element);
}

describe("HeroBlockWrapper (data boundary)", () => {
  beforeEach(() => {
    getHomePageMock.mockReset();
    // @ts-expect-error — intentional override for this test
    process.env.NODE_ENV = "development";
  });

  afterAll(() => {
    // @ts-expect-error — restore
    process.env.NODE_ENV = ORIGINAL_NODE_ENV;
  });

  it("renders hero copy when all required Sanity content is present", async () => {
    getHomePageMock.mockResolvedValue(completePage());
    const { getByRole, getByText } = await renderWrapper();
    expect(getByRole("heading", { level: 1 })).toHaveTextContent("Hero heading");
    expect(getByText("Subheading")).toBeInTheDocument();
    expect(getByText("Book")).toBeInTheDocument();
    expect(getByText("Watch")).toBeInTheDocument();
  });

  it("throws with path + locale when hero.heading is missing in dev", async () => {
    const page = completePage();
    page.hero!.heading = undefined;
    getHomePageMock.mockResolvedValue(page);

    await expect(renderWrapper("es")).rejects.toThrowError(/page\.hero\.heading.*for locale "es"/);
  });

  it("throws when one of the hero eyebrows is missing", async () => {
    const page = completePage();
    page.homeSections!.heroEyebrows = ["Tag 1"]; // index [1] missing
    getHomePageMock.mockResolvedValue(page);

    await expect(renderWrapper("en")).rejects.toThrowError(/heroEyebrows\[1\]/);
  });

  it("does not require audioTrackLabel when no audio source is provided", async () => {
    const page = completePage();
    page.homeSections!.heroAudioTrackLabel = undefined;
    getHomePageMock.mockResolvedValue(page);

    // Should still render successfully — the audio requirement is gated
    // on `audioSrc` being provided.
    const { getByRole } = await renderWrapper();
    expect(getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("requires audioTrackLabel when an audio source IS provided", async () => {
    const page = completePage();
    page.homeSections!.heroAudioTrackLabel = undefined;
    getHomePageMock.mockResolvedValue(page);

    await expect(
      HeroBlockWrapper({ locale: "en", audioSrc: "/audio/sample.mp3" })
    ).rejects.toThrowError(/heroAudioTrackLabel/);
  });
});
