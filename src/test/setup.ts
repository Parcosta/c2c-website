import * as React from "react";

import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => {
  const NextImageMock = ({
    src,
    alt,
    ...props
  }: {
    src: string | { src: string };
    alt: string;
    fill?: boolean;
    [key: string]: unknown;
  }) => {
    const resolvedSrc = typeof src === "string" ? src : src.src;
    const {
      fill: _fill,
      priority: _priority,
      blurDataURL: _blurDataURL,
      placeholder: _placeholder,
      ...imgProps
    } = props;
    void _fill;
    void _priority;
    void _blurDataURL;
    void _placeholder;
    return React.createElement("img", { src: resolvedSrc, alt, ...imgProps });
  };
  NextImageMock.displayName = "NextImageMock";

  return { default: NextImageMock };
});

vi.mock("next/link", () => {
  const NextLinkMock = React.forwardRef<
    HTMLAnchorElement,
    { href: string; children: React.ReactNode; [key: string]: unknown }
  >(({ href, children, ...props }, ref) => React.createElement("a", { ref, href, ...props }, children));
  NextLinkMock.displayName = "NextLinkMock";

  return { default: NextLinkMock };
});

vi.mock("next/navigation", () => ({
  usePathname: () => (globalThis as unknown as { __NEXT_PATHNAME__?: string }).__NEXT_PATHNAME__ ?? "/en"
}));
