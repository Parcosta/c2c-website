import { metadata, viewport } from "next-sanity/studio";
import type { ReactNode } from "react";

export { metadata, viewport };

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}

