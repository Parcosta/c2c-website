import type { Locale } from "@/lib/i18n";

export type PortfolioCardItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
  description?: string;
  date?: string;
};

export type PortfolioDetailItem = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  images: Array<{ url: string; alt: string }>;
  description?: unknown[];
  date?: string;
  tags: string[];
  locale: Locale;
};
