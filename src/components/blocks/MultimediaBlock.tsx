"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export interface MultimediaItem {
  _id: string;
  title: string;
  embedUrl: string;
  thumbnail?: string;
}

export interface MultimediaBlockProps extends ComponentPropsWithoutRef<"section"> {
  locale: Locale;
  title?: string;
  subtitle?: string;
  items?: MultimediaItem[];
}

export function MultimediaBlock({
  locale,
  title,
  subtitle,
  items,
  className,
  ...props
}: MultimediaBlockProps) {
  if (!items?.length) return null;

  return (
    <Section className={cn("py-16 sm:py-20", className)} {...props}>
      <Container>
        <div className="space-y-12 md:space-y-16">
          {title && <SectionHeading title={title} subtitle={subtitle} />}

          {/* Video Grid - Figma: 2-column grid with 24px gap */}
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item._id} className="flex flex-col gap-3">
                {/* Video Container - Figma: aspect-video with rounded corners */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
                  <iframe
                    src={item.embedUrl}
                    title={item.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                {/* Title - Figma: text-sm, font-medium, gray-200 */}
                <h3 className="text-sm font-medium text-gray-200">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
