import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CurrentWorkBlock, type CurrentWorkProject } from "@/components/blocks/CurrentWorkBlock";
import { isLocale, type Locale } from "@/lib/i18n";
import { client } from "@/sanity/client";
import { hasSanityConfig } from "@/sanity/config";
import { buildCurrentWorkQuery } from "@/sanity/queries";

const copy: Record<Locale, { heading: string; subtitle: string }> = {
  en: { heading: "Current work", subtitle: "What I'm building right now." },
  es: { heading: "Trabajo actual", subtitle: "Lo que estoy construyendo ahora mismo." }
};

async function getCurrentWorkProject(locale: Locale): Promise<CurrentWorkProject | null> {
  if (!hasSanityConfig()) return null;

  const def = buildCurrentWorkQuery(locale);
  const result = await client.fetch(def.query, def.params);
  if (!result || typeof result !== "object") return null;

  const title = typeof (result as { title?: unknown }).title === "string" ? (result as { title: string }).title : "";
  const description = (result as { description?: unknown }).description;
  const mediaUrl = (result as { media?: { asset?: { url?: unknown } } }).media?.asset?.url;
  const mimeType = (result as { media?: { asset?: { mimeType?: unknown } } }).media?.asset?.mimeType;

  const media =
    typeof mediaUrl === "string"
      ? {
          kind: typeof mimeType === "string" && mimeType.startsWith("video/") ? "video" : "image",
          url: mediaUrl,
          mimeType: typeof mimeType === "string" ? mimeType : undefined
        }
      : null;

  return { title, description, media };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const project = await getCurrentWorkProject(locale);

  return (
    <main>
      <Section>
        <Container>
          <CurrentWorkBlock heading={copy[locale].heading} subtitle={copy[locale].subtitle} project={project} />
        </Container>
      </Section>

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
    </main>
  );
}

