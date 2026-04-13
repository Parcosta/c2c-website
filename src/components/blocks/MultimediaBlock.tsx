"use client";

import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

import type { Locale } from "@/lib/i18n";

interface VideoItem {
  id: string;
  title: string;
  embedUrl: string;
}

const videos: VideoItem[] = [
  {
    id: "1",
    title: "Live at Boiler Room",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Modular Synthesis Tutorial",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export interface MultimediaBlockProps {
  locale: Locale;
  className?: string;
}

export function MultimediaBlock({ locale, className }: MultimediaBlockProps) {
  const { t } = useTranslation();

  return (
    <section className={cn("w-full", className)}>
      <Container>
        <div className="flex flex-col gap-8 py-10 px-6">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-gray-500">
              {t("multimedia.sectionLabel")}
            </p>
            <h2 className="text-2xl font-semibold text-gray-50 tracking-tight">
              {t("multimedia.title")}
            </h2>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="flex flex-col gap-2">
                <div className="relative aspect-video w-full bg-gray-900">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-200">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
