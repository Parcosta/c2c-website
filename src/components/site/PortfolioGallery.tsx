"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type Category = "live" | "dj" | "studio";
type Filter = "all" | Category;

type PortfolioItem = {
  id: string;
  title: { en: string; es: string };
  category: Category;
  tags: string[];
};

const items: PortfolioItem[] = [
  {
    id: "p1",
    title: { en: "Warehouse Live Set", es: "Set en vivo (Warehouse)" },
    category: "live",
    tags: ["modular"]
  },
  {
    id: "p2",
    title: { en: "Radio Guest Mix", es: "Mix invitado (Radio)" },
    category: "dj",
    tags: ["mix"]
  },
  {
    id: "p3",
    title: { en: "Studio Session", es: "Sesión de estudio" },
    category: "studio",
    tags: ["production"]
  },
  {
    id: "p4",
    title: { en: "Club Night DJ Set", es: "Set de DJ (Club)" },
    category: "dj",
    tags: ["club"]
  },
  {
    id: "p5",
    title: { en: "Modular Jam", es: "Jam modular" },
    category: "live",
    tags: ["improvised"]
  }
];

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
function PortfolioCard({ item, locale }: { item: PortfolioItem; locale: Locale }) {
  return (
    <article
      className={cn(
        // Figma specs: rounded-xl, border-gray-800, dark bg
        "rounded-xl border border-gray-800 bg-gray-900/40 p-5",
        "transition-all duration-200 hover:border-gray-600 hover:bg-gray-900/60"
      )}
      data-testid="portfolio-item"
      data-category={item.category}
    >
      <div className="text-sm font-medium text-gray-200">{item.title[locale]}</div>
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
    </article>
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
}

export function PortfolioGallery({ locale, translations }: PortfolioGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.category === filter);
  }, [filter]);

  const filters: Array<{ key: Filter; label: string; testId: string }> = [
    { key: "all", label: translations.filters.all, testId: "portfolio-filter-all" },
    { key: "live", label: translations.filters.live, testId: "portfolio-filter-live" },
    { key: "dj", label: translations.filters.dj, testId: "portfolio-filter-dj" },
    { key: "studio", label: translations.filters.studio, testId: "portfolio-filter-studio" }
  ];

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
        {visible.map((item) => (
          <PortfolioCard key={item.id} item={item} locale={locale} />
        ))}
      </div>

      <p className="text-sm text-gray-400" data-testid="portfolio-count">
        {visible.length} items
      </p>
    </div>
  );
}
