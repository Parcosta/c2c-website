"use client";

import Link from "next/link";
import { useEffect } from "react";

import { AnimatedButton } from "@/components/custom/AnimatedButton";
import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { defaultLocale } from "@/lib/i18n";

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_25%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(900px_circle_at_85%_0%,rgba(59,130,246,0.10),transparent_50%)]"
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <GlassCard className="relative overflow-hidden p-6 sm:p-8">
              <div aria-hidden className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-brand-accent/15 blur-3xl" />
              <div className="relative space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="destructive">Error</Badge>
                  <Badge variant="outline">Something went wrong</Badge>
                </div>

                <SectionHeading
                  as="h1"
                  title="We hit a snag"
                  subtitle="Try again in a moment. If the problem persists, return home and retry from there."
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <AnimatedButton onClick={reset}>Try again</AnimatedButton>
                  <AnimatedButton asChild variant="secondary" glow={false}>
                    <Link href={`/${defaultLocale}`}>Go to homepage</Link>
                  </AnimatedButton>
                </div>

                {error.digest ? (
                  <p className="text-xs text-muted-foreground">
                    Reference: <code className="rounded bg-slate-900/60 px-1.5 py-0.5">{error.digest}</code>
                  </p>
                ) : null}
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </main>
  );
}

