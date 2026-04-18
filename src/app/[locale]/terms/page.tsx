import type { Metadata } from "next";

import { LegalPageView } from "@/components/site/LegalPageView";
import { isLocale, type Locale } from "@/lib/locale";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import { buildLegalPageQuery } from "@/sanity/queries";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const page = isSanityConfigured()
    ? await sanityFetch(buildLegalPageQuery(locale, "terms"))
    : null;
  return { title: page?.seo?.title ?? page?.title };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const page = isSanityConfigured()
    ? await sanityFetch(buildLegalPageQuery(locale, "terms"))
    : null;

  return <LegalPageView locale={locale} page={page} />;
}
