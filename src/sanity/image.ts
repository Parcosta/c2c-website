import imageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/config";
import type { ImageValue } from "@/sanity/queries";

const builder = imageUrlBuilder({ projectId, dataset });

export function getSanityImageUrl(
  source: ImageValue | null | undefined,
  { width, height }: { width?: number; height?: number } = {}
): string | null {
  if (!source?.asset?._ref) return null;

  let image = builder.image(source).auto("format").fit("max");
  if (width) image = image.width(width);
  if (height) image = image.height(height);
  return image.url();
}

