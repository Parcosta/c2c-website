"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { PortfolioItemValue } from "@/sanity/queries";
import { getSanityImageUrl } from "@/sanity/image";

type Category = "live" | "dj" | "studio";
type Filter = "all" | Category;

// Figma filter button styling per design specs
interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  testId: string;
}

function FilterButton({ active, onClick, children, testId }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
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

// Figma card styling - 258px width equivalent with proper styling
function PortfolioCard({ item, locale }: { item: PortfolioItemValue; locale: Locale }) {
  const imageUrl =
    item.images && item.images.length > 0
      ? getSanityImageUrl(item.images[0], { width: 600 })
      : null;

  // Map category to filter type
  const category: Category = item.category?.toLowerCase().includes("live")
    ? "live"
    : item.category?.toLowerCase().includes("dj")
      ? "dj"
      : item.category?.toLowerCase().includes("studio")
        ? "studio"
        : "live";

  return (
    <Link href={`/portfolio/${item.slug}`}>
      <article
        className={cn(
          // Figma specs: rounded-xl, border-gray-800, dark bg
          "rounded-xl border border-gray-800 bg-gray-900/40 overflow-hidden",
          "transition-all duration-200 hover:border-gray-600 hover:bg-gray-900/60"
        )}
        data-testid="portfolio-item"
        data-category={category}
      >
        {imageUrl ? (
          <div className="aspect-video w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={item.title ?? ""}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
              width={600}
              height={338}
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No image</span>
          </div>
        )}
        <div className="p-5">
          <div className="text-sm font-medium text-gray-200">{item.title}</div>
          <div className="mt-2 text-xs text-gray-400">{item.category}</div>
          {item.tags && item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-800 px-2 py-0.5 text-xs text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

interface PortfolioGalleryProps {
  locale: Locale;
  translations: {
    filters: {
      all: string;
      live: string;
      dj: string;
      studio: string;
    };
  };
  items: PortfolioItemValue[];
}

export function PortfolioGallery({ locale, translations, items }: PortfolioGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => {
      const category = item.category?.toLowerCase() ?? "";
      if (filter === "live") return category.includes("live");
      if (filter === "dj") return category.includes("dj");
      if (filter === "studio") return category.includes("studio");
      return true;
    });
  }, [filter, items]);

  const filters: Array<{ key: Filter; label: string; testId: string }> = [
    { key: "all", label: translations.filters.all, testId: "portfolio-filter-all" },
    { key: "live", label: translations.filters.live, testId: "portfolio-filter-live" },
    { key: "dj", label: translations.filters.dj, testId: "portfolio-filter-dj" },
    { key: "studio", label: translations.filters.studio, testId: "portfolio-filter-studio" }
  ];

  if (items.length === 0) {
    return (
      <div className="py-12 text-center" data-testid="portfolio-empty">
        <p className="text-gray-400">No portfolio items found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="portfolio">
      {/* Filter buttons with Figma styling */}
      <div
        className="flex flex-wrap gap-3"
        role="group"
        aria-label="Portfolio filters"
        data-testid="portfolio-filters"
      >
        {filters.map((f) => (
          <FilterButton
            key={f.key}
            active={filter === f.key}
            onClick={() => setFilter(f.key)}
            testId={f.testId}
          >
            {f.label}
          </FilterButton>
        ))}
      </div>

      {/* Figma 4-column grid with 40px gaps */}
      <div
        className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        data-testid="portfolio-grid"
      >
        {visible.map((item, index) => (
          <PortfolioCard key={item._id || `portfolio-item-${index}`} item={item} locale={locale} />
        ))}
      </div>

      <p className="text-sm text-gray-400" data-testid="portfolio-count">
        {visible.length} items
      </p>
    </div>
  );
}
