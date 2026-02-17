import * as React from "react";

import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: ({
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
  }
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => React.createElement("a", { href, ...props }, children)
}));
