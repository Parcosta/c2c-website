import type { Metadata } from "next";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  ...studioMetadata,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true
    }
  }
};

export { viewport };

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}
