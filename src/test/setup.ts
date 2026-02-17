import * as React from "react";

import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

const NextImage = ({
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
  const { fill: _fill, ...imgProps } = props;
  void _fill;
  return React.createElement("img", { src: resolvedSrc, alt, ...imgProps });
};

NextImage.displayName = "NextImage";

vi.mock("next/image", () => ({
  default: NextImage
}));

const NextLink = React.forwardRef<
  HTMLAnchorElement,
  { href: string; children: React.ReactNode; [key: string]: unknown }
>(({ href, children, ...props }, ref) =>
  React.createElement("a", { ref, href, ...props }, children)
);

NextLink.displayName = "NextLink";

vi.mock("next/link", () => ({
  default: NextLink
}));

vi.mock("next/navigation", () => ({
  usePathname: () => (globalThis as unknown as { __NEXT_PATHNAME__?: string }).__NEXT_PATHNAME__ ?? "/en"
}));
