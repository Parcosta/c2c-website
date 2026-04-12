"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main data-testid="not-found">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="max-w-2xl space-y-4">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
              {t("error.notFoundTitle")}
            </h1>
            <p className="text-gray-400">{t("error.notFoundDescription")}</p>
            <Link
              href={`/${defaultLocale}`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              data-testid="not-found-home"
            >
              {t("error.backToHome")}
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
