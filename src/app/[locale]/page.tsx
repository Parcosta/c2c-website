import type { Metadata } from "next";

import { EventsBlock } from "@/components/blocks/EventsBlock";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { type Locale } from "@/lib/i18n";
import { buildMetadata, createMusicGroupJsonLd, createOrganizationJsonLd, createEventJsonLd, getSiteName } from "@/lib/seo";

function getHomeSeo(locale: Locale): { title: string; description: string } {
  switch (locale) {
    case "es":
      return {
        title: getSiteName(),
        description:
          "Live modular techno y DJ. Música, shows y lanzamientos de Coast2Coast (C2C)."
      };
    case "en":
    default:
      return {
        title: getSiteName(),
        description:
          "Live modular techno & DJ. Music, shows, and releases by Coast2Coast (C2C)."
      };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const seo = getHomeSeo(locale);
  return buildMetadata({
    ...seo,
    pathname: `/${locale}`
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const org = createOrganizationJsonLd({ name: "Coast2Coast" });
  const group = createMusicGroupJsonLd({ name: "Coast2Coast (C2C)" });

  const nextEventName = (process.env.NEXT_PUBLIC_NEXT_EVENT_NAME ?? "").trim();
  const nextEventStartDate = (process.env.NEXT_PUBLIC_NEXT_EVENT_START_DATE ?? "").trim();
  const nextEventUrl = (process.env.NEXT_PUBLIC_NEXT_EVENT_URL ?? "").trim();
  const event =
    nextEventName && nextEventStartDate
      ? createEventJsonLd({
          name: nextEventName,
          startDate: nextEventStartDate,
          url: nextEventUrl || undefined,
          organizerName: "Coast2Coast"
        })
      : null;

  return (
    <main>
      <JsonLdScript data={event ? [org, group, event] : [org, group]} />
      <Section>
        <Container>
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="font-display text-sm font-medium tracking-wide text-slate-300">Design System</p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                Foundation
              </h1>
              <p className="max-w-2xl text-base text-slate-300">
                Tokens, layout primitives, and utilities—ready to build consistent UI.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <div className="text-sm font-medium text-slate-200">Typography</div>
                <div className="mt-3 space-y-2">
                  <div className="font-display text-2xl font-semibold">DM Sans</div>
                  <div className="text-sm text-slate-300">Inter for body text</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <div className="text-sm font-medium text-slate-200">Color</div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-brand-accent shadow-[0_0_0_4px_rgba(59,130,246,0.15)]" />
                  <div className="text-sm text-slate-300">Brand accent: electric blue</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <div className="text-sm font-medium text-slate-200">Layout</div>
                <div className="mt-3 space-y-2 text-sm text-slate-300">
                  <div>Container: max-w-7xl</div>
                  <div>Section: py-16 / md:py-24</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <EventsBlock locale={locale} />
    </main>
  );
}
