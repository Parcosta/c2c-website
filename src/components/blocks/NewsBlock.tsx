"use client";

import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export interface NewsItem {
  _id: string;
  date: string;
  title: string;
  excerpt: string;
  link?: string;
}

export interface NewsBlockProps extends ComponentPropsWithoutRef<"section"> {
  locale: Locale;
  title?: string;
  subtitle?: string;
  items?: NewsItem[];
}

function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsBlock({
  locale,
  title,
  subtitle,
  items,
  className,
  ...props
}: NewsBlockProps) {
  if (!items?.length) return null;

  return (
    <Section className={cn("py-16 sm:py-20", className)} {...props}>
      <Container>
        <div className="space-y-12 md:space-y-16">
          {title && <SectionHeading title={title} subtitle={subtitle} />}

          {/* News List - Figma: stacked items with border separators */}
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <article
                key={item._id}
                className="flex flex-col gap-2 pb-6 border-b border-gray-800 last:border-0"
              >
                {/* Date - Figma: text-xs, gray-500 */}
                <time className="text-xs font-medium text-gray-500">
                  {formatDate(item.date, locale)}
                </time>
                
                {/* Title - Figma: text-lg, font-semibold, gray-100 */}
                {item.link ? (
                  <Link
                    href={item.link}
                    className="text-lg font-semibold text-gray-100 hover:text-brand-accent transition-colors"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <h3 className="text-lg font-semibold text-gray-100">{item.title}</h3>
                )}
                
                {/* Excerpt - Figma: text-sm, gray-400 */}
                <p className="text-sm leading-relaxed text-gray-400">{item.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
