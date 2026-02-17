"use client";

import { useMemo, useState } from "react";

import { ImageCard } from "@/components/custom/ImageCard";
import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { addLocaleToPathname } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import type { PortfolioCardItem } from "./types";

const allCategory = "All";

function formatMonthYear(value: string | undefined, locale: Locale): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short" }).format(date);
}

export function PortfolioGrid({ items, locale }: { items: PortfolioCardItem[]; locale: Locale }) {
  const categories = useMemo(() => {
    const unique = new Set<string>();
    for (const item of items) {
      const category = item.category?.trim();
      if (category) unique.add(category);
    }
    return [allCategory, ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const [selectedCategory, setSelectedCategory] = useState<string>(allCategory);

  const filtered = useMemo(() => {
    if (selectedCategory === allCategory) return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <div className="space-y-6">
      <SectionHeading
        as="h1"
        title="Portfolio"
        subtitle="Selected work from the Sanity CMS. Filter by category to explore."
      />

      <GlassCard className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filtered.length}/{items.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = category === selectedCategory;
              return (
                <Button
                  key={category}
                  type="button"
                  size="sm"
                  variant={isActive ? "default" : "secondary"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {filtered.length === 0 ? (
        <GlassCard className="p-6">
          <div className="text-sm text-muted-foreground">No portfolio items in this category yet.</div>
        </GlassCard>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const dateLabel = formatMonthYear(item.date, locale);
            const meta =
              item.description?.trim() ||
              [item.category?.trim(), dateLabel].filter(Boolean).join(" • ") ||
              undefined;

            return (
              <ImageCard
                key={item.id}
                src={item.imageUrl}
                alt={item.title}
                title={item.title}
                description={meta}
                href={addLocaleToPathname(`/portfolio/${item.slug}`, locale)}
                className={cn("bg-slate-950/30")}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

