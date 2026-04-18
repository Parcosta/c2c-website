"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { prefixLocaleHref, type Locale } from "@/lib/locale";

interface HeroBlockTranslations {
  tag1: string;
  tag2: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
}

export interface HeroImage {
  src: string;
  alt: string;
}

/** Present only when the hero should render an inline audio player. */
export interface HeroAudio {
  src: string;
  /** Track label shown in the player row and used as `aria-label`. */
  label: string;
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
      el.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!audio) return;
    const link = document.createElement("a");
    link.href = audio.src;
    link.download = audio.label;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const primaryHref = prefixLocaleHref(translations.ctaPrimaryHref, locale);
  const secondaryHref = prefixLocaleHref(translations.ctaSecondaryHref, locale);

  return (
    <section
      aria-labelledby="homepage-hero-title"
      className={cn("relative isolate overflow-hidden bg-black", className)}
    >
      <Container className="relative py-10 px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 flex flex-col gap-4 items-start justify-center">
            <div className="flex gap-2 items-center text-xs text-gray-500">
              <span>{translations.tag1}</span>
              <span>{translations.tag2}</span>
            </div>

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

            <div className="flex gap-6 items-start pt-2">
              <Link
                href={primaryHref}
                className="h-9 px-3 flex items-center justify-center bg-gray-950 text-white text-xs tracking-widest hover:bg-gray-800 transition-colors"
              >
                {translations.ctaPrimary}
              </Link>
              <Link
                href={secondaryHref}
                className="h-9 px-3 flex items-center justify-center border border-gray-800 text-white text-xs tracking-widest hover:border-gray-600 transition-colors"
              >
                {translations.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full lg:w-[536px]">
            <div className="relative h-[364px] w-full">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 536px"
              />
            </div>

            {audio ? (
              <div className="border border-gray-800 flex items-center gap-20 overflow-hidden p-4">
                <div className="flex-1 flex gap-2 items-center">
                  <audio ref={audioRef} src={audio.src} preload="metadata" />

                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white cursor-pointer transition-colors"
                    aria-label={audio.label}
                    aria-pressed={isPlaying}
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                        aria-hidden="true"
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
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  <span className="text-xs text-gray-500">{audio.label}</span>

                  <div className="flex-1 flex items-center" aria-hidden="true">
                    <div className="flex-1 h-1.5 bg-gray-800" />
                    <div className="flex-1 h-1.5 bg-gray-950" />
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white cursor-pointer transition-colors"
                    aria-label={audio.label}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                      aria-hidden="true"
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
            ) : null}
          </div>
        </div>

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
