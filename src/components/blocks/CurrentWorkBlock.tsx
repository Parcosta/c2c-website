import * as React from "react";

import Image from "next/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { GlassCard } from "@/components/custom/GlassCard";
import { cn } from "@/lib/utils";

export type CurrentWorkMedia = {
  kind: "image" | "video";
  url: string;
  mimeType?: string;
};

export type CurrentWorkProject = {
  title: string;
  description?: unknown;
  media?: CurrentWorkMedia | null;
};

export interface CurrentWorkBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  subtitle?: string;
  project?: CurrentWorkProject | null;
}

function isPortableTextValue(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function CurrentWorkBlock({
  heading = "Current work",
  subtitle = "What I'm building right now.",
  project,
  className,
  ...props
}: CurrentWorkBlockProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      <SectionHeading title={heading} subtitle={subtitle} />
      <GlassCard className="overflow-hidden">
        <div className="grid gap-6 p-5 md:grid-cols-2 md:gap-8 md:p-8">
          <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/40">
            <div className="relative aspect-[16/10] w-full">
              {project?.media?.kind === "video" ? (
                <video
                  src={project.media.url}
                  controls
                  preload="metadata"
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  data-testid="current-work-video"
                />
              ) : project?.media?.kind === "image" ? (
                <Image
                  src={project.media.url}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="absolute inset-0 grid place-items-center text-sm text-gray-400"
                  data-testid="current-work-media-empty"
                >
                  No media yet
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Latest project
              </p>
              <h3 className="font-display text-header text-gray-100">
                {project?.title ?? "Coming soon"}
              </h3>
            </div>

            {project?.description && isPortableTextValue(project.description) ? (
              <div className="prose prose-invert max-w-none prose-p:text-body prose-p:text-gray-400">
                <PortableText value={project.description as PortableTextBlock[]} />
              </div>
            ) : project?.description ? (
              <p className="text-body text-gray-400">{String(project.description)}</p>
            ) : (
              <p className="text-body text-gray-400">
                I’m currently working on the next piece in my portfolio. Check back soon for
                updates.
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
