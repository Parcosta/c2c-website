import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PressBlock } from "@/components/blocks/PressBlock";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { projectId } from "@/sanity/config";
import { client } from "@/sanity/client";
import { buildPressQuery, type PressItemValue } from "@/sanity/queries";

type HomePageProps = {
  params: { locale: string };
};

export default async function HomePage({ params }: HomePageProps) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  let pressItems: PressItemValue[] = [];

  if (projectId && projectId !== "your-project-id") {
    const def = buildPressQuery(locale);
    pressItems = await client.fetch(def.query, def.params);
  }

  return (
    <main>
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

      <Section className="pt-0">
        <Container>
          <div className="space-y-8">
            <SectionHeading
              title={locale === "es" ? "Prensa" : "Press"}
              subtitle={locale === "es" ? "Menciones y reseñas destacadas." : "Highlights and mentions from the press."}
            />
            <PressBlock locale={locale} items={pressItems} />
          </div>
        </Container>
      </Section>
    </main>
  );
}

