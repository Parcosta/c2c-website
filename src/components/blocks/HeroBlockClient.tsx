"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface HeroBlockTranslations {
  tag1: string;
  tag2: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  audioPlaceholder: string;
}

export interface HeroBlockClientProps {
  className?: string;
  locale: Locale;
  translations: HeroBlockTranslations;
  audioSrc?: string;
}

export function HeroBlockClient({
  className,
  locale,
  translations,
  audioSrc
}: HeroBlockClientProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!audioSrc) return;
    const link = document.createElement("a");
    link.href = audioSrc;
    link.download = translations.audioPlaceholder || "track";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section
      aria-labelledby="homepage-hero-title"
      className={cn("relative isolate overflow-hidden bg-black", className)}
    >
      <Container className="relative py-10 px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="flex-1 flex flex-col gap-4 items-start justify-center">
            {/* Title Tags */}
            <div className="flex gap-2 items-center text-xs text-gray-500">
              <span>{translations.tag1}</span>
              <span>{translations.tag2}</span>
            </div>

            {/* Main Title and Description */}
            <div className="flex flex-col gap-2 text-gray-50 w-full">
              <h1
                id="homepage-hero-title"
                className="font-semibold text-6xl leading-none tracking-tight"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {translations.title}
              </h1>
              <p
                className="text-base leading-normal tracking-wide"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {translations.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-6 items-start pt-2">
              <Link
                href={`/${locale}/contact`}
                className="h-9 px-3 flex items-center justify-center bg-gray-950 text-white text-xs tracking-widest hover:bg-gray-800 transition-colors"
              >
                {translations.ctaPrimary}
              </Link>
              <Link
                href={`/${locale}/store`}
                className="h-9 px-3 flex items-center justify-center border border-gray-800 text-white text-xs tracking-widest hover:border-gray-600 transition-colors"
              >
                {translations.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Right Column - Image with Audio Player */}
          <div className="flex flex-col gap-2.5 w-full lg:w-[536px]">
            {/* Hero Image */}
            <div className="relative h-[364px] w-full">
              <Image
                src="/images/hero-image.jpg"
                alt={translations.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 536px"
              />
            </div>

            {/* Audio Player */}
            <div className="border border-gray-800 flex items-center gap-20 overflow-hidden p-4">
              <div className="flex-1 flex gap-2 items-center">
                {/* Hidden audio element for playback */}
                {audioSrc && <audio ref={audioRef} src={audioSrc} preload="metadata" />}

                {/* Play Button */}
                <button
                  onClick={togglePlay}
                  disabled={!audioSrc}
                  className={cn(
                    "w-6 h-6 flex items-center justify-center transition-colors",
                    audioSrc
                      ? "text-gray-500 hover:text-white cursor-pointer"
                      : "text-gray-700 cursor-not-allowed"
                  )}
                  aria-label={isPlaying ? "Pause" : translations.audioPlaceholder}
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>

                {/* Song Title */}
                <span className="text-xs text-gray-500">{translations.audioPlaceholder}</span>

                {/* Progress Bar */}
                <div className="flex-1 flex items-center" aria-hidden="true">
                  <div className="flex-1 h-1.5 bg-gray-800" />
                  <div className="flex-1 h-1.5 bg-gray-950" />
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={!audioSrc}
                  className={cn(
                    "w-6 h-6 flex items-center justify-center transition-colors",
                    audioSrc
                      ? "text-gray-500 hover:text-white cursor-pointer"
                      : "text-gray-700 cursor-not-allowed"
                  )}
                  aria-label="Download"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex gap-2 items-start mt-4" aria-hidden="true">
          <div className="h-1 w-10 bg-gray-800" />
          <div className="h-1 w-10 bg-gray-950" />
          <div className="h-1 w-10 bg-gray-950" />
          <div className="h-1 w-10 bg-gray-950" />
        </div>
      </Container>
    </section>
  );
}
