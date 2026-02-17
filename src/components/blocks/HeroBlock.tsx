import Link from "next/link";

import { AnimatedButton } from "@/components/custom/AnimatedButton";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export interface HeroBlockProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function HeroBlock({
  title = "Build consistent UI—fast.",
  subtitle = "A dark-first foundation with tokens, layout primitives, and reusable components—ready for production.",
  ctaLabel = "Explore components",
  ctaHref = "/components",
  className
}: HeroBlockProps) {
  return (
    <section
      aria-labelledby="homepage-hero-title"
      className={cn(
        "relative isolate overflow-hidden bg-slate-950",
        "min-h-[100svh] flex items-center",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 opacity-70 blur-3xl",
            "bg-[linear-gradient(120deg,rgba(59,130,246,0.22),rgba(168,85,247,0.18),rgba(14,165,233,0.18))]",
            "bg-[length:200%_200%]",
            "motion-safe:animate-[heroGradient_14s_ease-in-out_infinite]",
            "motion-reduce:opacity-40"
          )}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/40 to-slate-950" />
      </div>

      <Container className="relative py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs font-medium tracking-wide text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_0_4px_rgba(59,130,246,0.15)]" />
            Design System
          </div>

          <div className="space-y-4">
            <h1
              id="homepage-hero-title"
              className="font-display text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl"
            >
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <AnimatedButton asChild size="lg" className="rounded-full px-7">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </AnimatedButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
