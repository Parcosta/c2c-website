"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

import type { Locale } from "@/lib/i18n";

export interface HeroBlockProps {
  className?: string;
  audioSrc?: string;
  audioTitle?: string;
  locale: Locale;
}

export function HeroBlock({ className, audioSrc, audioTitle, locale }: HeroBlockProps) {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="homepage-hero-title"
      className={cn(
        "relative isolate overflow-hidden bg-black",
        className
      )}
    >
      <Container className="relative py-10 px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="flex-1 flex flex-col gap-4 items-start justify-center">
            {/* Title Tags */}
            <div className="flex gap-2 items-center text-xs text-gray-500">
              <span>ARTISTA MULTIMEDIA MEXICANA</span>
              <span>SÍNTESIS MODULAR</span>
            </div>

            {/* Main Title and Description */}
            <div className="flex flex-col gap-2 text-gray-50 w-full">
              <h1 
                id="homepage-hero-title" 
                className="font-semibold text-6xl leading-none tracking-tight"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                DISEÑO SONORO EXPERIMENTAL
              </h1>
              <p 
                className="text-base leading-normal tracking-wide"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Artista multimedia y sintetista modular con sede en la Ciudad de México, conocida por su enfoque crudo y exploratorio de la música electrónica en vivo.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-6 items-start pt-2">
              <Link 
                href={`/${locale}/contact`}
                className="h-9 px-3 flex items-center justify-center bg-gray-950 text-white text-xs tracking-widest hover:bg-gray-800 transition-colors"
              >
                CONTÁCTAME
              </Link>
              <Link 
                href={`/${locale}/store`}
                className="h-9 px-3 flex items-center justify-center border border-gray-800 text-white text-xs tracking-widest hover:border-gray-600 transition-colors"
              >
                TIENDA OFICIAL
              </Link>
            </div>
          </div>

          {/* Right Column - Image with Audio Player */}
          <div className="flex flex-col gap-2.5 w-full lg:w-[536px]">
            {/* Hero Image */}
            <div className="relative h-[364px] w-full">
              <Image
                src="/images/hero-image.jpg"
                alt="Artist performance"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 536px"
              />
            </div>

            {/* Audio Player */}
            <div className="border border-gray-800 flex items-center gap-20 overflow-hidden p-4">
              <div className="flex-1 flex gap-2 items-center">
                {/* Play Button */}
                <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Song Title */}
                <span className="text-xs text-gray-500">
                  NOMBRE DE EL TEMA
                </span>

                {/* Progress Bar */}
                <div className="flex-1 flex items-center">
                  <div className="flex-1 h-1.5 bg-gray-800" />
                  <div className="flex-1 h-1.5 bg-gray-950" />
                </div>

                {/* Download Button */}
                <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex gap-2 items-start mt-4">
          <div className="h-1 w-10 bg-gray-800" />
          <div className="h-1 w-10 bg-gray-950" />
          <div className="h-1 w-10 bg-gray-950" />
          <div className="h-1 w-10 bg-gray-950" />
        </div>
      </Container>
    </section>
  );
}
