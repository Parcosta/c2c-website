import type { ComponentPropsWithoutRef } from "react";

import { AnimatedButton } from "@/components/custom/AnimatedButton";
import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { type Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import { buildUpcomingEventsQuery, type EventValue } from "@/sanity/queries";

export type EventsBlockViewProps = ComponentPropsWithoutRef<"section"> & {
  locale: Locale;
  /** Section title. */
  title: string;
  /** Section subtitle / eyebrow text above the title. */
  subtitle: string;
  /** Per-event tickets button label. */
  ticketsLabel: string;
  events: EventValue[];
};

function formatEventDate(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const dateTime = date.toISOString().slice(0, 10);

  const dayNumber = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    timeZone: "UTC"
  }).format(date);

  const monthShort = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC"
  }).format(date);

  const weekdayShort = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    timeZone: "UTC"
  }).format(date);

  const formatted = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);

  return { dateTime, formatted, timestamp: date.getTime(), dayNumber, monthShort, weekdayShort };
}

function formatLocation(city?: string, country?: string) {
  const parts = [city?.trim(), country?.trim()].filter((value): value is string => Boolean(value));
  return parts.length ? parts.join(", ") : null;
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
  const visibleEvents = (events ?? [])
    .map((event) => {
      if (!event.date) return null;
      const date = formatEventDate(event.date, locale);
      if (!date) return null;
      return { event, date };
    })
    .filter(
      (
        value
      ): value is {
        event: EventValue;
        date: {
          dateTime: string;
          formatted: string;
          timestamp: number;
          dayNumber: string;
          monthShort: string;
          weekdayShort: string;
        };
      } => value != null
    )
    .sort((a, b) => a.date.timestamp - b.date.timestamp);

  if (visibleEvents.length === 0) return null;

  return (
    <Section className={cn("py-12 md:py-20", className)} {...props}>
      <Container>
        <div className="space-y-8 md:space-y-12">
          <SectionHeading title={title} subtitle={subtitle} className="text-center md:text-left" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleEvents.map(({ event, date }) => {
              const venue = event.venue?.trim();
              const location = formatLocation(event.city, event.country);

              return (
                <GlassCard
                  key={event._id}
                  className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-gray-600/80"
                  data-testid={`event-card-${event._id}`}
                >
                  <div className="relative flex items-start gap-4 border-b border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-5">
                    <div
                      className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg border border-border/60 bg-background/80 text-center shadow-sm"
                      aria-label={date.formatted}
                    >
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {date.monthShort}
                      </span>
                      <span className="font-display text-2xl font-bold leading-none tracking-tight text-gray-100">
                        {date.dayNumber}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                        {date.weekdayShort}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 pt-1">
                      {event.title ? (
                        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-gray-100 line-clamp-2">
                          {event.title}
                        </h3>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    {venue ? (
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 shrink-0 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        <span className="text-base font-semibold tracking-tight text-gray-100">
                          {venue}
                        </span>
                      </div>
                    ) : null}

                    {location ? (
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 shrink-0 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>
                        <span className="text-sm leading-relaxed text-gray-400">{location}</span>
                      </div>
                    ) : null}

                    <time
                      data-testid={`event-date-${event._id}`}
                      dateTime={date.dateTime}
                      className="sr-only"
                    >
                      {date.formatted}
                    </time>
                  </div>

                  {event.ticketUrl ? (
                    <div className="border-t border-border/40 p-5 pt-0">
                      <AnimatedButton asChild size="sm" variant="secondary" className="w-full">
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="flex items-center justify-center gap-2"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                            />
                          </svg>
                          {ticketsLabel}
                        </a>
                      </AnimatedButton>
                    </div>
                  ) : null}
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
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
