"use client";

import { useCallback, useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getSanityImageUrl } from "@/sanity/image";
import type { ImageValue } from "@/sanity/queries";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  _id: string;
  src: ImageValue;
  alt?: string;
  caption?: string;
}

export interface GalleryBlockProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

function GalleryImageCard({ image, onClick }: { image: GalleryImage; onClick: () => void }) {
  const imageUrl = getSanityImageUrl(image.src, { width: 600 });

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-lg bg-slate-900",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
      )}
      data-testid={`gallery-image-${image._id}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={image.alt || ""}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            "group-hover:scale-105"
          )}
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-500">
          No image
        </div>
      )}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        )}
      />
      {image.caption && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-3 text-sm text-white",
            "translate-y-full transition-transform duration-300 group-hover:translate-y-0"
          )}
        >
          {image.caption}
        </div>
      )}
    </button>
  );
}

function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious
}: {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const currentImage = images[currentIndex];
  const imageUrl = currentImage ? getSanityImageUrl(currentImage.src, { width: 1200 }) : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "Escape") onClose();
    },
    [onNext, onPrevious, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!currentImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          "max-w-[95vw] max-h-[95vh] p-0 border-none bg-slate-950/95",
          "flex items-center justify-center"
        )}
        data-testid="gallery-lightbox"
      >
        <DialogTitle className="sr-only">
          {currentImage.alt || `Image ${currentIndex + 1} of ${images.length}`}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Use arrow keys to navigate between images. Press Escape to close.
        </DialogDescription>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 z-50 p-2 rounded-full",
            "bg-slate-900/80 text-slate-100 hover:bg-slate-800",
            "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          )}
          aria-label="Close lightbox"
          data-testid="lightbox-close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Previous button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={onPrevious}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full",
              "bg-slate-900/80 text-slate-100 hover:bg-slate-800",
              "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            )}
            aria-label="Previous image"
            data-testid="lightbox-previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Image container */}
        <div className="flex flex-col items-center justify-center max-w-full max-h-full p-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={currentImage.alt || ""}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              data-testid="lightbox-image"
            />
          ) : (
            <div className="flex h-64 w-64 items-center justify-center text-slate-500">
              No image available
            </div>
          )}

          {currentImage.caption && (
            <p className="mt-4 text-center text-sm text-slate-300 max-w-2xl">
              {currentImage.caption}
            </p>
          )}

          {images.length > 1 && (
            <div className="mt-2 text-sm text-slate-400">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Next button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={onNext}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full",
              "bg-slate-900/80 text-slate-100 hover:bg-slate-800",
              "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            )}
            aria-label="Next image"
            data-testid="lightbox-next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function GalleryBlock({
  images,
  title,
  subtitle,
  columns = 3,
  className
}: GalleryBlockProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  if (!images.length) return null;

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
  };

  return (
    <section
      className={cn("py-16 sm:py-20", className)}
      aria-label={title || "Image gallery"}
      data-testid="gallery-block"
    >
      <div className="space-y-8">
        {(title || subtitle) && (
          <div className="space-y-2 text-center">
            {title && (
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className={cn("grid gap-4", gridCols[columns])}>
          {images.map((image, index) => (
            <GalleryImageCard key={image._id} image={image} onClick={() => openLightbox(index)} />
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </section>
  );
}
