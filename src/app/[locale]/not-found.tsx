import Link from "next/link";
import { headers } from "next/headers";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n-server";

async function getLocaleFromHeaders(): Promise<Locale> {
  const headerStore = await headers();
  const value = headerStore.get("x-locale");
  return value === "es" ? "es" : "en";
}

export default async function NotFound() {
  const locale = await getLocaleFromHeaders();
  const t = await getTranslation(locale);

  return (
    <main data-testid="not-found">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="max-w-2xl space-y-4">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
              {t("notFound.title")}
            </h1>
            <p className="text-gray-400">{t("notFound.body")}</p>
            <Link
              href={`/${locale}`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              data-testid="not-found-home"
            >
              {t("notFound.backHome")}
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
