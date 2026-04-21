import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { BlockFrame, BlockHeader } from "@/components/blocks/BlockFrame";
import { type Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import { buildUpcomingEventsQuery, type EventValue } from "@/sanity/queries";

export type EventsBlockViewProps = ComponentPropsWithoutRef<"section"> & {
  locale: Locale;
  title: string;
  /** Small uppercase label rendered above the title. */
  subtitle: string;
  /** Per-event "more info" / tickets link label. */
  ticketsLabel: string;
  events: EventValue[];
};

type FormattedEvent = {
  event: EventValue;
  dateTime: string;
  dateLabel: string;
  timestamp: number;
};

function formatEventDate(value: string, locale: Locale): FormattedEvent["dateLabel"] | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const parts = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    weekday: "long",
    timeZone: "UTC"
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {});

  const day = parts.day ?? "";
  const month = (parts.month ?? "").replace(".", "");
  const weekday = parts.weekday ?? "";

  return `${day} ${month} ${weekday}`.toUpperCase().trim();
}

function formatLocation(city?: string, country?: string) {
  const parts = [country?.trim(), city?.trim()].filter((v): v is string => Boolean(v));
  return parts.length ? parts.join(", ").toUpperCase() : null;
}

export function EventsBlockView({
  locale,
  title,
  subtitle,
  ticketsLabel,
  events,
  className,
  ...props
}: EventsBlockViewProps) {
  const rows: FormattedEvent[] = (events ?? [])
    .map((event) => {
      if (!event.date) return null;
      const date = new Date(event.date);
      if (Number.isNaN(date.getTime())) return null;
      const dateLabel = formatEventDate(event.date, locale);
      if (!dateLabel) return null;
      return {
        event,
        dateLabel,
        dateTime: date.toISOString().slice(0, 10),
        timestamp: date.getTime()
      };
    })
    .filter((v): v is FormattedEvent => v !== null)
    .sort((a, b) => a.timestamp - b.timestamp);

  if (rows.length === 0) return null;

  return (
    <BlockFrame
      className={className}
      aria-labelledby="events-list-title"
      data-testid="events-block"
      innerClassName="gap-8"
      {...props}
    >
      <BlockHeader eyebrow={subtitle} title={title} titleId="events-list-title" />

      <ul className="flex flex-col gap-6 md:gap-10" role="list">
        {rows.map(({ event, dateLabel, dateTime }) => {
          const name = event.title?.trim() ?? "";
          const location = formatLocation(event.city, event.country);

          return (
            <li key={event._id} data-testid={`event-row-${event._id}`}>
              <EventRow
                href={event.ticketUrl}
                dateTime={dateTime}
                dateLabel={dateLabel}
                name={name}
                location={location}
                ticketsLabel={ticketsLabel}
              />
            </li>
          );
        })}
      </ul>
    </BlockFrame>
  );
}

interface EventRowProps {
  href?: string;
  dateTime: string;
  dateLabel: string;
  name: string;
  location: string | null;
  ticketsLabel: string;
}

function EventRow({ href, dateTime, dateLabel, name, location, ticketsLabel }: EventRowProps) {
  const content = (
    <>
      <time
        dateTime={dateTime}
        className="w-full shrink-0 font-display text-body font-medium uppercase tracking-wide text-gray-400 md:w-[200px]"
      >
        {dateLabel}
      </time>

      <span className="flex-1 font-display text-body font-medium text-gray-300">{name}</span>

      {location ? (
        <span className="font-display text-body font-medium text-gray-300 md:text-right">
          {location}
        </span>
      ) : null}

      {href ? (
        <span
          aria-hidden="true"
          className="font-display text-body font-medium uppercase tracking-wide text-gray-50 transition-colors group-hover:text-brand-accent md:w-[75px] md:text-right"
        >
          {ticketsLabel}
        </span>
      ) : null}
    </>
  );

  const base = "flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4 text-body leading-6";

  if (!href) {
    return <div className={base}>{content}</div>;
  }

  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      aria-label={[dateLabel, name, location].filter(Boolean).join(" · ")}
      className={cn(
        base,
        "group rounded-sm py-1 -my-1 transition-colors hover:bg-gray-900/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
      )}
    >
      {content}
    </Link>
  );
}

export type EventsBlockProps = Omit<EventsBlockViewProps, "events">;

export async function EventsBlock({ locale, ...props }: EventsBlockProps) {
  if (!isSanityConfigured()) return null;

  const events = await sanityFetch(buildUpcomingEventsQuery(locale), { revalidate: 60 }).catch(
    () => [] as EventValue[]
  );

  return <EventsBlockView {...props} locale={locale} events={events ?? []} />;
}
