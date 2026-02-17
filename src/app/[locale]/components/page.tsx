import type { Metadata } from "next";

import { AnimatedButton } from "@/components/custom/AnimatedButton";
import { GlassCard } from "@/components/custom/GlassCard";
import { ImageCard } from "@/components/custom/ImageCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
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

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
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
        <SectionHeading title="Components" subtitle="Preview of custom components built on shadcn/ui." />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Dark theme</Badge>
          <Badge>Electric blue primary</Badge>
          <Badge variant="outline">Glassmorphism</Badge>
        </div>
      </header>

      <Separator />

      <section className="space-y-4">
        <SectionHeading title="AnimatedButton" subtitle="Hover/press animations with optional glow." />
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
            <p className="text-sm text-muted-foreground">A subtle border + blur + translucent fill.</p>
            <p className="font-medium">Looks great on slate backgrounds.</p>
          </div>
        </GlassCard>
      </section>

      <Separator />

      <section className="space-y-4">
        <SectionHeading title="ImageCard" subtitle="Portfolio/gallery card with image + metadata." />
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
    </main>
  );
}

