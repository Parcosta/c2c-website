"use client";

import * as React from "react";

import Image from "next/image";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type PhotoGalleryImage = {
  _key: string;
  url: string;
  width: number;
  height: number;
  alt: string;
  blurDataUrl?: string | null;
  caption?: string | null;
};

export type PhotoGalleryBlockProps = React.ComponentPropsWithoutRef<"section"> & {
  title?: string;
  subtitle?: string;
  images?: PhotoGalleryImage[];
};

export function PhotoGalleryBlock({ title, subtitle, images, className, ...props }: PhotoGalleryBlockProps) {
  const safeImages = images ?? [];
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const activeImage = activeIndex != null ? safeImages[activeIndex] : null;
  const isOpen = activeImage != null;

  if (safeImages.length === 0) return null;

  return (
    <Section className={className} {...props}>
      <Container>
        <div className="space-y-8">
          {title || subtitle ? <SectionHeading title={title} subtitle={subtitle} /> : null}

          <div className={cn("columns-1 gap-4 sm:columns-2 lg:columns-3", "[column-fill:_balance]")}>
            {safeImages.map((image, index) => {
              const aspectRatio = image.width > 0 && image.height > 0 ? `${image.width} / ${image.height}` : "4 / 3";
              const label = image.alt?.trim() || "Gallery photo";

              return (
                <button
                  key={image._key}
                  type="button"
                  className={cn(
                    "group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl",
                    "border border-slate-800 bg-slate-900/40",
                    "transition-shadow hover:shadow-[0_18px_55px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-brand-accent/60"
                  )}
                  aria-label={`Open photo: ${label}`}
                  onClick={() => setActiveIndex(index)}
                  data-testid={`photo-gallery-thumb-${index}`}
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
                    <Image
                      src={image.url}
                      alt={label}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                      placeholder={image.blurDataUrl ? "blur" : "empty"}
                      blurDataURL={image.blurDataUrl ?? undefined}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/35 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  {image.caption ? (
                    <div className="px-4 py-3 text-left text-sm text-slate-200">
                      <div className="line-clamp-2">{image.caption}</div>
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>

          <Dialog open={isOpen} onOpenChange={(open) => (!open ? setActiveIndex(null) : null)}>
            <DialogContent className="max-w-[min(92vw,1100px)] border-slate-800 bg-slate-950/95 p-0">
              {activeImage ? (
                <figure className="space-y-0">
                  <div
                    className="relative w-full overflow-hidden rounded-lg"
                    style={{
                      aspectRatio:
                        activeImage.width > 0 && activeImage.height > 0
                          ? `${activeImage.width} / ${activeImage.height}`
                          : "4 / 3"
                    }}
                  >
                    <Image
                      data-testid="photo-gallery-dialog-image"
                      src={activeImage.url}
                      alt={activeImage.alt?.trim() || "Gallery photo"}
                      fill
                      sizes="(min-width: 1024px) 1000px, 92vw"
                      className="object-contain"
                      placeholder={activeImage.blurDataUrl ? "blur" : "empty"}
                      blurDataURL={activeImage.blurDataUrl ?? undefined}
                    />
                  </div>
                  {activeImage.caption ? (
                    <figcaption className="border-t border-slate-800 px-5 py-4 text-sm text-slate-200">
                      {activeImage.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </Section>
  );
}

