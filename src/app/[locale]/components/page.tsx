import type { Metadata } from "next";

import { AnimatedButton } from "@/components/custom/AnimatedButton";
import { GlassCard } from "@/components/custom/GlassCard";
import { ImageCard } from "@/components/custom/ImageCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

function getComponentsSeo(locale: Locale): { title: string; description: string } {
  switch (locale) {
    case "es":
      return {
        title: "Componentes",
        description: "Vista previa de componentes personalizados construidos sobre shadcn/ui."
      };
    case "en":
    default:
      return {
        title: "Components",
        description: "Preview of custom components built on shadcn/ui."
      };
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = getComponentsSeo(locale);
  return buildMetadata({
    ...seo,
    pathname: `/${locale}/components`
  });
}

export default function ComponentsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 px-4 py-10 sm:px-6">
      <header className="space-y-3">
        <SectionHeading
          title="Components"
          subtitle="Preview of custom components built on shadcn/ui."
        />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Dark theme</Badge>
          <Badge>Electric blue primary</Badge>
          <Badge variant="outline">Glassmorphism</Badge>
        </div>
      </header>

      <Separator />

      <section className="space-y-4">
        <SectionHeading
          title="AnimatedButton"
          subtitle="Hover/press animations with optional glow."
        />
        <div className="flex flex-wrap gap-3">
          <AnimatedButton>Default</AnimatedButton>
          <AnimatedButton variant="secondary">Secondary</AnimatedButton>
          <AnimatedButton variant="outline">Outline</AnimatedButton>
          <AnimatedButton variant="ghost">Ghost</AnimatedButton>
          <AnimatedButton variant="link">Link</AnimatedButton>
          <AnimatedButton variant="destructive">Destructive</AnimatedButton>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <SectionHeading title="GlassCard" subtitle="Glassmorphism container for content blocks." />
        <GlassCard className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              A subtle border + blur + translucent fill.
            </p>
            <p className="font-medium">Looks great on slate backgrounds.</p>
          </div>
        </GlassCard>
      </section>

      <Separator />

      <section className="space-y-4">
        <SectionHeading
          title="ImageCard"
          subtitle="Portfolio/gallery card with image + metadata."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageCard
            src="/preview-1.svg"
            alt="Example thumbnail"
            title="Example Item"
            description="Image, title, and description."
            href="/"
          />
          <ImageCard
            src="/preview-2.svg"
            alt="Example thumbnail"
            title="Another Item"
            description="Also works without a link."
          />
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <SectionHeading
          title="GalleryBlock"
          subtitle="Image gallery with lightbox functionality."
        />
        <GalleryBlock
          title="Example Gallery"
          subtitle="Click any image to open the lightbox."
          columns={3}
          images={[
            {
              _id: "gallery-1",
              src: {
                _type: "image",
                asset: { _ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg", _type: "reference" }
              },
              alt: "Gallery image 1",
              caption: "Beautiful scenery"
            },
            {
              _id: "gallery-2",
              src: {
                _type: "image",
                asset: { _ref: "image-abc123def456-1500x2000-png", _type: "reference" }
              },
              alt: "Gallery image 2",
              caption: "Amazing view"
            },
            {
              _id: "gallery-3",
              src: {
                _type: "image",
                asset: { _ref: "image-xyz789uvw012-3000x2000-jpg", _type: "reference" }
              },
              alt: "Gallery image 3",
              caption: "Stunning landscape"
            },
            {
              _id: "gallery-4",
              src: {
                _type: "image",
                asset: { _ref: "image-def456ghi789-2000x1500-webp", _type: "reference" }
              },
              alt: "Gallery image 4"
            },
            {
              _id: "gallery-5",
              src: {
                _type: "image",
                asset: { _ref: "image-ghi789jkl012-2500x3500-jpg", _type: "reference" }
              },
              alt: "Gallery image 5",
              caption: "Wonderful moment"
            },
            {
              _id: "gallery-6",
              src: {
                _type: "image",
                asset: { _ref: "image-jkl012mno345-1800x2400-png", _type: "reference" }
              },
              alt: "Gallery image 6"
            }
          ]}
        />
      </section>
    </main>
  );
}
