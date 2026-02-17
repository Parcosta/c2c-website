import Link from "next/link";

import { AnimatedButton } from "@/components/custom/AnimatedButton";
import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(59,130,246,0.16),transparent_55%),radial-gradient(700px_circle_at_80%_10%,rgba(59,130,246,0.10),transparent_50%)]"
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <GlassCard className="relative overflow-hidden p-6 sm:p-8">
              <div aria-hidden className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand-accent/20 blur-3xl" />
              <div className="relative space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">404</Badge>
                  <Badge variant="outline">Not found</Badge>
                </div>

                <SectionHeading
                  as="h1"
                  title="This page doesn’t exist"
                  subtitle="The link may be broken, or the page may have moved. Let’s get you back on track."
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <AnimatedButton asChild>
                    <Link href={`/${defaultLocale}`}>Go to homepage</Link>
                  </AnimatedButton>
                  <AnimatedButton asChild variant="secondary" glow={false}>
                    <Link href="/components">Browse components</Link>
                  </AnimatedButton>
                </div>

                <p className="text-sm text-muted-foreground">
                  If you typed the address, double-check for spelling mistakes.
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </main>
  );
}

