"use client";

import { useMemo, useState } from "react";

import { ImageCard } from "@/components/custom/ImageCard";
import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
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

// Figma filter button styling
interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Figma specs: 14px font, medium weight, rounded-md
        "rounded-md px-6 py-3 text-sm font-medium transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
        active
          ? // Active: bg-gray-100, text-gray-950 per Figma primary button
            "bg-gray-100 text-gray-950 hover:bg-gray-200"
          : // Inactive: border-gray-600, text-gray-100 per Figma secondary button
            "border border-gray-600 bg-transparent text-gray-100 hover:border-gray-400 hover:bg-gray-800"
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
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
    <div className="space-y-8">
      <SectionHeading
        as="h1"
        title="Portfolio"
        subtitle="Selected work from the Sanity CMS. Filter by category to explore."
      />

      <GlassCard className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filtered.length}/{items.length}
            </span>
          </div>
          {/* Filter buttons with Figma styling */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <FilterButton
                key={category}
                active={category === selectedCategory}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </div>
        </div>
      </GlassCard>

      {filtered.length === 0 ? (
        <GlassCard className="p-6">
          <div className="text-sm text-muted-foreground">
            No portfolio items in this category yet.
          </div>
        </GlassCard>
      ) : (
        // Figma 4-column grid with 40px gaps
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                className={cn("bg-gray-950/30 border-gray-800 hover:border-gray-600")}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
