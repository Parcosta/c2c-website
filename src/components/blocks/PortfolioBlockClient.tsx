"use client";

import { useMemo, useState } from "react";

import { ImageCard } from "@/components/custom/ImageCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

export type PortfolioBlockItem = {
  id: string;
  title: string;
  slug: string;
  category?: string | null;
  imageUrl?: string | null;
};

export type PortfolioBlockClientProps = {
  items: PortfolioBlockItem[];
  heading?: string;
  subheading?: string;
};

const ALL_CATEGORY = "All";

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

export function PortfolioBlockClient({
  items,
  heading = "Portfolio",
  subheading = "A selection of recent work, filterable by category."
}: PortfolioBlockClientProps) {
  const categories = useMemo(() => {
    const unique = new Set<string>();
    for (const item of items) {
      const value = item.category?.trim();
      if (value) unique.add(value);
    }
    return [ALL_CATEGORY, ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORY);

  const filteredItems = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) return items;
    return items.filter((item) => item.category?.trim() === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <SectionHeading title={heading} subtitle={subheading} />

          {/* Filter buttons with Figma styling */}
          <div className="flex flex-wrap items-center gap-3">
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

          {filteredItems.length ? (
            // Figma 4-column grid with 40px gaps
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredItems.map((item) => (
                <ImageCard
                  key={item.id}
                  src={item.imageUrl ?? "/preview-1.svg"}
                  alt={item.title}
                  title={item.title}
                  description={item.category ?? undefined}
                  href={`/portfolio/${item.slug}`}
                  aspectClassName="aspect-[4/3]"
                  className="bg-gray-900/40 border-gray-800 hover:border-gray-600"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No items in this category yet.</p>
          )}
        </div>
      </Container>
    </Section>
  );
}
