import Link from "next/link";

import { GlassCard } from "@/components/custom/GlassCard";
import { NewsListRow, type NewsListItem } from "@/components/blocks/NewsListBlock";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import type { PressItemValue } from "@/sanity/queries";

export type PressBlockVariant = "cards" | "list";

export type PressBlockProps = {
  items: PressItemValue[];
  locale: Locale;
  variant?: PressBlockVariant;
  ctaLabel?: string;
  className?: string;
};

function formatPressDate(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const dateTime = date.toISOString().slice(0, 10);
  const formatted = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);

  return { dateTime, formatted };
}

export function PressBlock({
  items,
  locale,
  variant = "cards",
  ctaLabel,
  className
}: PressBlockProps) {
  const visibleItems = items.filter((item) => item.publication || item.quote || item.url);
  if (visibleItems.length === 0) return null;

  if (variant === "list") {
    if (!ctaLabel) {
      if (process.env.NODE_ENV !== "production") {
        throw new Error(
          "PressBlock variant='list' requires a `ctaLabel` prop. Provide one from Sanity (e.g. siteLabels.pressPage.readMore)."
        );
      }
      return null;
    }
    return (
      <ul
        className={cn("flex flex-col gap-6 md:gap-10", className)}
        role="list"
        data-testid="press-list"
      >
        {visibleItems.map((item) => {
          const listItem: NewsListItem = {
            _key: item._id,
            date: item.date,
            label: item.publication || item.title || "",
            href: item.url ?? undefined
          };

          return (
            <li key={item._id}>
              <NewsListRow
                item={listItem}
                ctaLabel={ctaLabel}
                dateLocale={locale}
                dateColumnWidthClass="w-[100px]"
              />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "flex gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]",
          "snap-x snap-mandatory",
          "md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
        )}
      >
        {visibleItems.map((item) => {
          const label = item.publication || item.title || "Press mention";
          const date = item.date ? formatPressDate(item.date, locale) : null;

          return (
            <GlassCard
              key={item._id}
              className={cn(
                "w-[min(85vw,24rem)] shrink-0 snap-start p-6",
                "md:w-auto md:shrink md:snap-none"
              )}
            >
              <div className="flex h-full flex-col gap-4">
                <div className="space-y-2">
                  <div className="text-small font-semibold text-gray-100">{label}</div>
                  {item.quote ? (
                    <blockquote className="text-small text-gray-200">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  ) : null}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4">
                  {date ? (
                    <time
                      data-testid={`press-date-${item._id}`}
                      dateTime={date.dateTime}
                      className="text-xs text-muted-foreground"
                    >
                      {date.formatted}
                    </time>
                  ) : (
                    <span />
                  )}

                  {item.url ? (
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Read
                    </Link>
                  ) : null}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
