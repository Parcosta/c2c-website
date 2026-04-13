"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

import type { Locale } from "@/lib/i18n";

export interface ServicesBlockProps {
  locale: Locale;
  className?: string;
}

export function ServicesBlock({ locale, className }: ServicesBlockProps) {
  const { t } = useTranslation();

  return (
    <section className={cn("w-full", className)}>
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 items-center py-10 px-6">
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/services-image.jpg"
                alt={t("services.title")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <p className="text-xs font-medium text-gray-500">
              {t("services.sectionLabel")}
            </p>
            <h2 className="text-2xl font-semibold text-gray-50 tracking-tight">
              {t("services.title")}
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              {t("services.description")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={`/${locale}/services`}
                className="h-9 px-3 flex items-center justify-center bg-gray-950 text-white text-xs tracking-widest hover:bg-gray-800 transition-colors"
              >
                {t("services.ctaPrimary")}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
