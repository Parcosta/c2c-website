"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
              <div
                aria-hidden
                className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-brand-accent/15 blur-3xl"
              />
              <div className="relative space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="destructive">{t("error.badgeError")}</Badge>
                  <Badge variant="outline">{t("error.badgeMessage")}</Badge>
                </div>

                <SectionHeading as="h1" title={t("error.title")} subtitle={t("error.subtitle")} />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <AnimatedButton onClick={reset}>{t("error.tryAgain")}</AnimatedButton>
                  <AnimatedButton asChild variant="secondary" glow={false}>
                    <Link href={`/${defaultLocale}`}>{t("error.goHome")}</Link>
                  </AnimatedButton>
                </div>

                {error.digest ? (
                  <p className="text-xs text-muted-foreground">
                    {t("error.reference")}:{" "}
                    <code className="rounded bg-gray-900/60 px-1.5 py-0.5">{error.digest}</code>
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
