"use client";

import Link from "next/link";

import { AnimatedButton } from "@/components/custom/AnimatedButton";
import { AudioPlayer } from "@/components/custom/AudioPlayer";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface HeroBlockTranslations {
  brand: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
}

export interface HeroBlockClientProps {
  className?: string;
  audioSrc?: string;
  audioTitle?: string;
  locale: Locale;
  translations: HeroBlockTranslations;
}

export function HeroBlockClient({
  className,
  audioSrc,
  audioTitle,
  locale,
  translations
}: HeroBlockClientProps) {
  return (
    <section
      aria-labelledby="homepage-hero-title"
      className={cn(
        "relative isolate overflow-hidden bg-gray-950",
        "min-h-[100svh] flex items-center",
        className
      )}
    >
      {/* Background gradient effects */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/0 via-gray-950/40 to-gray-950" />
      </div>

      <Container className="relative py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/40 px-3 py-1 text-xs font-medium text-gray-200">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_0_4px_rgba(59,130,246,0.15)]" />
            {translations.brand}
          </div>

          {/* Title and subtitle */}
          <div className="space-y-6">
            <h1 id="homepage-hero-title" className="font-display text-hero text-gray-100">
              {translations.heroTitle}
            </h1>
            <p className="max-w-2xl text-body text-gray-200">{translations.heroSubtitle}</p>
          </div>

          {/* Audio Player */}
          {audioSrc && (
            <div className="pt-2">
              <AudioPlayer src={audioSrc} title={audioTitle} />
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <AnimatedButton asChild size="lg" className="rounded-full px-8">
              <Link href={`/${locale}/contact`}>{translations.heroCtaPrimary}</Link>
            </AnimatedButton>
            <AnimatedButton asChild variant="secondary" size="lg" className="rounded-full px-8">
              <Link href={`/${locale}/portfolio`}>{translations.heroCtaSecondary}</Link>
            </AnimatedButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
