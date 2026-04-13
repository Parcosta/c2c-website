"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

import type { Locale } from "@/lib/i18n";

interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    date: "2026-03-15",
    title: "New EP Release: "Echoes"",
    excerpt: "Our latest EP featuring 5 tracks of experimental modular synthesis is now available on all streaming platforms.",
    link: "#",
  },
  {
    id: "2",
    date: "2026-02-28",
    title: "Live Performance at Mutek",
    excerpt: "Join us for an immersive audio-visual experience at this year's Mutek festival in Mexico City.",
    link: "#",
  },
  {
    id: "3",
    date: "2026-01-10",
    title: "Workshop: Introduction to Modular Synthesis",
    excerpt: "Learn the basics of modular synthesis in our upcoming workshop. Limited spots available.",
    link: "#",
  },
];

function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export interface NewsBlockProps {
  locale: Locale;
  className?: string;
}

export function NewsBlock({ locale, className }: NewsBlockProps) {
  const { t } = useTranslation();

  return (
    <section className={cn("w-full", className)}>
      <Container>
        <div className="flex flex-col gap-8 py-10 px-6">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-gray-500">
              {t("news.sectionLabel")}
            </p>
            <h2 className="text-2xl font-semibold text-gray-50 tracking-tight">
              {t("news.title")}
            </h2>
          </div>

          {/* News List */}
          <div className="flex flex-col gap-6">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-2 pb-6 border-b border-gray-800 last:border-0"
              >
                <time className="text-xs text-gray-500">
                  {formatDate(item.date, locale)}
                </time>
                <h3 className="text-lg font-semibold text-gray-100">
                  <Link
                    href={item.link}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {item.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
