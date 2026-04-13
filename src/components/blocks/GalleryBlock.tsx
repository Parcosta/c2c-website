"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

import type { Locale } from "@/lib/i18n";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { id: "1", src: "/images/gallery-1.jpg", alt: "Gallery image 1" },
  { id: "2", src: "/images/gallery-2.jpg", alt: "Gallery image 2" },
  { id: "3", src: "/images/gallery-3.jpg", alt: "Gallery image 3" },
  { id: "4", src: "/images/gallery-4.jpg", alt: "Gallery image 4" },
  { id: "5", src: "/images/gallery-5.jpg", alt: "Gallery image 5" },
  { id: "6", src: "/images/gallery-6.jpg", alt: "Gallery image 6" },
];

export interface GalleryBlockProps {
  locale: Locale;
  className?: string;
}

export function GalleryBlock({ locale, className }: GalleryBlockProps) {
  const { t } = useTranslation();

  return (
    <section className={cn("w-full", className)}>
      <Container>
        <div className="flex flex-col gap-8 py-10 px-6">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-gray-500">
              {t("gallery.sectionLabel")}
            </p>
            <h2 className="text-2xl font-semibold text-gray-50 tracking-tight">
              {t("gallery.title")}
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
