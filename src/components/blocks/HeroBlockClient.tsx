"use client";

import { Download, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { prefixLocaleHref, type Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

interface HeroBlockTranslations {
  tag1: string;
  tag2: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  audioTrackLabel: string;
}

export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroAudio {
  src: string;
}

export interface HeroBlockClientProps {
  className?: string;
  locale: Locale;
  translations: HeroBlockTranslations;
  heroImage: HeroImage;
  audio?: HeroAudio;
}

export function HeroBlockClient({
  className,
  locale,
  translations,
  heroImage,
  audio
}: HeroBlockClientProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
    } else {
      void el.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!audio) return;
    const link = document.createElement("a");
    link.href = audio.src;
    link.download = translations.audioTrackLabel;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const primaryHref = prefixLocaleHref(translations.ctaPrimaryHref, locale);
  const secondaryHref = prefixLocaleHref(translations.ctaSecondaryHref, locale);

  return (
    <section aria-labelledby="homepage-hero-title" className={cn("w-full", className)}>
      <Container>
        <div data-block="content" className="border border-gray-900 px-6 py-10 md:px-8 md:py-12">
          <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:gap-20">
            <div className="flex flex-1 flex-col items-start justify-center gap-4">
              <div className="flex flex-wrap items-center gap-2 font-display text-xs font-medium uppercase tracking-wide text-gray-500">
                <span>{translations.tag1}</span>
                <span>{translations.tag2}</span>
              </div>

              <div className="flex w-full flex-col gap-2 text-gray-50">
                <h1
                  id="homepage-hero-title"
                  className="font-display text-hero font-semibold uppercase"
                >
                  {translations.title}
                </h1>
                <p className="font-display text-body">{translations.description}</p>
              </div>

              <div className="flex flex-wrap items-start gap-4 pt-2">
                <Button asChild variant="dark" size="sm" className="uppercase tracking-wider">
                  <Link href={primaryHref}>{translations.ctaPrimary}</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="uppercase tracking-wider">
                  <Link href={secondaryHref}>{translations.ctaSecondary}</Link>
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2.5 lg:w-[536px]">
              <div className="relative aspect-[536/364] w-full">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 536px"
                />
              </div>

              <HeroAudioPlayer
                label={translations.audioTrackLabel}
                audioSrc={audio?.src}
                audioRef={audioRef}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                onDownload={handleDownload}
              />
            </div>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-2"
            aria-hidden="true"
            data-testid="hero-progress-indicator"
          >
            <span className="h-1 w-10 bg-gray-800" />
            <span className="h-1 w-10 bg-gray-950" />
            <span className="h-1 w-10 bg-gray-950" />
            <span className="h-1 w-10 bg-gray-950" />
          </div>
        </div>
      </Container>
    </section>
  );
}

interface HeroAudioPlayerProps {
  label: string;
  audioSrc?: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onDownload: () => void;
}

function HeroAudioPlayer({
  label,
  audioSrc,
  audioRef,
  isPlaying,
  onTogglePlay,
  onDownload
}: HeroAudioPlayerProps) {
  const hasAudio = Boolean(audioSrc);
  const iconBase =
    "flex size-6 shrink-0 items-center justify-center text-gray-500 transition-colors hover:text-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div
      className="flex items-center gap-4 border border-gray-900 p-4"
      data-testid="hero-audio-player"
    >
      {audioSrc ? <audio ref={audioRef} src={audioSrc} preload="metadata" /> : null}

      <button
        type="button"
        onClick={onTogglePlay}
        disabled={!hasAudio}
        className={iconBase}
        aria-label={label}
        aria-pressed={isPlaying}
        data-testid="hero-audio-play"
      >
        {isPlaying ? <Pause className="size-6" /> : <Play className="size-6" />}
      </button>

      <span className="font-display text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </span>

      <div className="flex flex-1 items-center" aria-hidden="true">
        <span className="h-1.5 flex-1 bg-gray-800" />
        <span className="h-1.5 flex-1 bg-gray-950" />
      </div>

      <button
        type="button"
        onClick={onDownload}
        disabled={!hasAudio}
        className={iconBase}
        aria-label={label}
        data-testid="hero-audio-download"
      >
        <Download className="size-6" />
      </button>
    </div>
  );
}
