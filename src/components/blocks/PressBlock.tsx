"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { GlassCard } from "@/components/custom/GlassCard";
import { cn } from "@/lib/utils";
import type { PressItemValue } from "@/sanity/queries";

export type PressBlockProps = {
  items: PressItemValue[];
  className?: string;
};

function formatPressDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const dateTime = date.toISOString().slice(0, 10);
  const formatted = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);

  return { dateTime, formatted };
}

export function PressBlock({ items, className }: PressBlockProps) {
  const { t } = useTranslation();
  const visibleItems = items.filter((item) => item.publication || item.quote || item.url);
  if (visibleItems.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "flex gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]",
          "snap-x snap-mandatory",
          "md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
        )}
      >
        {visibleItems.map((item, index) => {
          const label = item.publication || item.title || t("press.fallbackMention");
          const date = item.date ? formatPressDate(item.date) : null;

          return (
            <GlassCard
              key={item._id || `press-${index}`}
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
                      {t("press.readLink")}
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
