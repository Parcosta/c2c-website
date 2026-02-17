import type { ComponentPropsWithoutRef } from "react";

import { headers } from "next/headers";

import { AnimatedButton } from "@/components/custom/AnimatedButton";
import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/config";
import { buildUpcomingEventsQuery, type EventValue } from "@/sanity/queries";

export type EventsBlockViewProps = ComponentPropsWithoutRef<"section"> & {
  locale: Locale;
  title?: string;
  subtitle?: string;
  events: EventValue[];
};

async function getLocaleFromHeaders(): Promise<Locale> {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-locale") ?? defaultLocale;
  return isLocale(headerLocale) ? headerLocale : defaultLocale;
}

function formatEventDate(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const dateTime = date.toISOString().slice(0, 10);
  const formatted = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);

  return { dateTime, formatted, timestamp: date.getTime() };
}

function getDefaultCopy(locale: Locale) {
  switch (locale) {
    case "es":
      return {
        title: "Eventos",
        subtitle: "Próximos shows y presentaciones.",
        ticketsLabel: "Entradas"
      };
    case "en":
    default:
      return {
        title: "Events",
        subtitle: "Upcoming shows and appearances.",
        ticketsLabel: "Tickets"
      };
  }
}

function formatLocation(city?: string, country?: string) {
  const parts = [city?.trim(), country?.trim()].filter((value): value is string => Boolean(value));
  return parts.length ? parts.join(", ") : null;
}

export function EventsBlockView({
  locale,
  title,
  subtitle,
  events,
  className,
  ...props
}: EventsBlockViewProps) {
  const copy = getDefaultCopy(locale);

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
        date: { dateTime: string; formatted: string; timestamp: number };
      } => value != null
    )
    .sort((a, b) => a.date.timestamp - b.date.timestamp);

  if (visibleEvents.length === 0) return null;

  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <div className="space-y-10">
          <SectionHeading title={title ?? copy.title} subtitle={subtitle ?? copy.subtitle} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleEvents.map(({ event, date }) => {
              const venue = event.venue?.trim();
              const location = formatLocation(event.city, event.country);

              return (
                <GlassCard
                  key={event._id}
                  className="flex h-full flex-col gap-4 p-6"
                  data-testid={`event-card-${event._id}`}
                >
                  <div className="space-y-2">
                    <time
                      data-testid={`event-date-${event._id}`}
                      dateTime={date.dateTime}
                      className="text-xs font-medium tracking-wide text-muted-foreground"
                    >
                      {date.formatted}
                    </time>

                    {event.title ? (
                      <div className="font-display text-lg font-semibold tracking-tight text-slate-50">
                        {event.title}
                      </div>
                    ) : null}

                    {venue ? (
                      <div className="text-sm font-semibold tracking-tight text-slate-100">
                        {venue}
                      </div>
                    ) : null}
                    {location ? <div className="text-sm text-slate-300">{location}</div> : null}
                  </div>

                  {event.ticketUrl ? (
                    <AnimatedButton
                      asChild
                      size="sm"
                      variant="secondary"
                      className="mt-auto w-full"
                    >
                      <a href={event.ticketUrl} target="_blank" rel="noreferrer noopener">
                        {copy.ticketsLabel}
                      </a>
                    </AnimatedButton>
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

export type EventsBlockProps = Omit<EventsBlockViewProps, "events" | "locale"> & {
  locale?: Locale;
};

export async function EventsBlock({ locale: localeProp, ...props }: EventsBlockProps) {
  const locale = localeProp ?? (await getLocaleFromHeaders());
  if (!isSanityConfigured()) return null;

  const def = buildUpcomingEventsQuery(locale);
  const events = await getClient()
    .fetch<EventValue[]>(def.query, def.params, {
      next: { revalidate: 60 }
    })
    .catch(() => []);

  return <EventsBlockView {...props} locale={locale} events={events ?? []} />;
}
