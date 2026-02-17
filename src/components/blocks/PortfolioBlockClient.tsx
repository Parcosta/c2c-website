"use client";

import { useMemo, useState } from "react";

import { ImageCard } from "@/components/custom/ImageCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";

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

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const isActive = category === selectedCategory;
              return (
                <Button
                  key={category}
                  type="button"
                  size="sm"
                  variant={isActive ? "default" : "secondary"}
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              );
            })}
          </div>

          {filteredItems.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <ImageCard
                  key={item.id}
                  src={item.imageUrl ?? "/preview-1.svg"}
                  alt={item.title}
                  title={item.title}
                  description={item.category ?? undefined}
                  href={`/portfolio/${item.slug}`}
                  aspectClassName="aspect-[4/3]"
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
