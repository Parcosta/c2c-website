"use client";

import { useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";

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

export function PortfolioGallery({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.category === filter);
  }, [filter]);

  const filters: Array<{ key: Filter; label: string; testId: string }> = [
    { key: "all", label: copy.portfolio.filters.all, testId: "portfolio-filter-all" },
    { key: "live", label: copy.portfolio.filters.live, testId: "portfolio-filter-live" },
    { key: "dj", label: copy.portfolio.filters.dj, testId: "portfolio-filter-dj" },
    { key: "studio", label: copy.portfolio.filters.studio, testId: "portfolio-filter-studio" }
  ];

  return (
    <div className="space-y-6" data-testid="portfolio">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Portfolio filters"
        data-testid="portfolio-filters"
      >
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            data-testid={f.testId}
            className={`rounded-md border px-3 py-2 text-sm transition-colors ${
              filter === f.key
                ? "border-slate-700 bg-slate-900 text-white"
                : "border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
            }`}
            aria-pressed={filter === f.key}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="portfolio-grid">
        {visible.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-5"
            data-testid="portfolio-item"
            data-category={item.category}
          >
            <div className="text-sm font-medium text-slate-200">{item.title[locale]}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-800 px-2 py-0.5 text-xs text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="text-sm text-slate-400" data-testid="portfolio-count">
        {visible.length} items
      </p>
    </div>
  );
}
