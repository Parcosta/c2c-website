import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { BlockFrame, BlockHeader } from "@/components/blocks/BlockFrame";
import { cn } from "@/lib/utils";

export interface NewsListItem {
  _key: string;
  date?: string;
  displayDate?: string;
  label: string;
  href?: string;
  location?: string;
  ariaLabel?: string;
}

export interface NewsListBlockProps extends ComponentPropsWithoutRef<"section"> {
  title: string;
  eyebrow: string;
  ctaLabel: string;
  items: NewsListItem[];
  dateLocale?: string;
  dateColumnWidthClass?: string;
}

export function NewsListBlock({
  title,
  eyebrow,
  ctaLabel,
  items,
  dateLocale = "es",
  dateColumnWidthClass = "w-[100px]",
  className,
  ...props
}: NewsListBlockProps) {
  if (!items.length) return null;

  return (
    <BlockFrame
      className={className}
      aria-labelledby="news-list-title"
      data-testid="news-list-block"
      {...props}
    >
      <BlockHeader eyebrow={eyebrow} title={title} titleId="news-list-title" />

      <ul className="flex flex-col gap-6 md:gap-10" role="list">
        {items.map((item) => (
          <li key={item._key}>
            <NewsListRow
              item={item}
              ctaLabel={ctaLabel}
              dateLocale={dateLocale}
              dateColumnWidthClass={dateColumnWidthClass}
            />
          </li>
        ))}
      </ul>
    </BlockFrame>
  );
}

interface NewsListRowProps {
  item: NewsListItem;
  ctaLabel: string;
  dateLocale: string;
  dateColumnWidthClass: string;
}

export function NewsListRow({
  item,
  ctaLabel,
  dateLocale,
  dateColumnWidthClass
}: NewsListRowProps): ReactNode {
  const formattedDate = item.displayDate ?? formatNewsDate(item.date, dateLocale);
  const isoDate = item.date ? toIsoDateOrUndefined(item.date) : undefined;

  const content = (
    <>
      {formattedDate ? (
        <time
          dateTime={isoDate}
          className={cn(
            "shrink-0 self-baseline font-display text-body font-medium text-gray-400",
            dateColumnWidthClass
          )}
        >
          {formattedDate}
        </time>
      ) : (
        <span aria-hidden="true" className={cn("shrink-0 self-baseline", dateColumnWidthClass)} />
      )}

      <span className="flex-1 self-baseline font-display text-body font-medium text-gray-300">
        {item.label}
      </span>

      {item.location ? (
        <span className="hidden shrink-0 self-baseline text-right font-display text-body font-medium text-gray-300 md:inline">
          {item.location}
        </span>
      ) : null}

      {item.href ? (
        <span
          aria-hidden="true"
          className="shrink-0 self-baseline text-right font-display text-body font-medium uppercase tracking-widest text-gray-50 transition-colors group-hover:text-brand-accent"
        >
          {ctaLabel}
        </span>
      ) : null}
    </>
  );

  if (!item.href) {
    return <div className="flex items-baseline gap-4 md:gap-6">{content}</div>;
  }

  return (
    <Link
      href={item.href}
      aria-label={
        item.ariaLabel ?? [formattedDate, item.label, item.location].filter(Boolean).join(" · ")
      }
      className={cn(
        "group flex items-baseline gap-4 md:gap-6",
        "rounded-sm py-1 -my-1",
        "transition-colors hover:bg-gray-900/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
      )}
    >
      {content}
    </Link>
  );
}

function formatNewsDate(input: string | undefined, locale: string): string | null {
  if (!input) return null;
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      timeZone: "UTC"
    })
      .format(date)
      .toUpperCase()
      .replace(".", "");
  } catch {
    return input;
  }
}

function toIsoDateOrUndefined(input: string): string | undefined {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}
