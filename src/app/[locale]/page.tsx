import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import type { Locale } from "@/lib/i18n";

const heroCopy: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    ctaLabel: string;
  }
> = {
  en: {
    title: "Build consistent UI—fast.",
    subtitle:
      "A dark-first foundation with tokens, layout primitives, and reusable components—ready for production.",
    ctaLabel: "Explore components"
  },
  es: {
    title: "Crea UI consistente—rápido.",
    subtitle:
      "Una base dark-first con tokens, primitivas de layout y componentes reutilizables—lista para producción.",
    ctaLabel: "Ver componentes"
  }
};

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const copy = heroCopy[params.locale];
  return (
    <main>
      <HeroBlock title={copy.title} subtitle={copy.subtitle} ctaLabel={copy.ctaLabel} ctaHref="/components" />
      <Section>
        <Container>
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="font-display text-sm font-medium tracking-wide text-slate-300">Design System</p>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                Foundation highlights
              </h2>
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

