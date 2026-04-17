import type { Metadata } from "next";

import { LegalPageView } from "@/components/site/LegalPageView";
import { isLocale, type Locale } from "@/lib/i18n";
import { getClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/config";
import { buildLegalPageQuery } from "@/sanity/queries";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const def = buildLegalPageQuery(locale, "privacy-policy");
  const page = isSanityConfigured() ? await getClient().fetch(def.query, def.params) : null;
  return { title: page?.seo?.title ?? page?.title };
}

export default async function PrivacyPolicyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const def = buildLegalPageQuery(locale, "privacy-policy");
  const page = isSanityConfigured() ? await getClient().fetch(def.query, def.params) : null;

  return <LegalPageView locale={locale} page={page} />;
}
