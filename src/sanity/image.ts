import type { ImageValue } from "@/sanity/queries";
import { dataset, projectId } from "@/sanity/config";

export function getSanityImageUrl(image?: ImageValue | null): string | null {
  const ref = image?.asset?._ref;
  if (!ref) return null;
  if (!projectId || projectId === "your-project-id") return null;
  if (!dataset) return null;

  const match = /^image-([^-]+)-(\d+x\d+)-([a-z0-9]+)$/i.exec(ref);
  if (!match) return null;

  const [, assetId, dimensions, format] = match;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`;
}

