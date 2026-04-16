import { notFound } from "next/navigation";

import { PressPageView } from "@/features/press/PressPageView";
import { isLocale, type Locale } from "@/lib/i18n";
import { isSanityConfigured } from "@/sanity/config";
import { getClient } from "@/sanity/client";
import { buildPressEpkQuery, buildSiteLabelsQuery, type PressEpkValue } from "@/sanity/queries";

export const dynamic = "force-dynamic";

export default async function PressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale: Locale = locale;

  let data: PressEpkValue | null = null;
  let labels = null;
  if (isSanityConfigured()) {
    const def = buildPressEpkQuery(resolvedLocale);
    const labelsDef = buildSiteLabelsQuery(resolvedLocale);
    try {
      [data, labels] = await Promise.all([
        getClient().fetch(def.query, def.params),
        getClient().fetch(labelsDef.query, labelsDef.params)
      ]);
    } catch {
      data = null;
    }
  }

  const pressPage = data?.pressPage ?? null;
  const pressMentions = data?.pressMentions ?? [];
  const siteSettings = data?.siteSettings ?? null;

  const bookingsEmail = pressPage?.bookingsEmail ?? siteSettings?.contactEmail;
  const bookingsPhone = pressPage?.bookingsPhone;

  return (
    <PressPageView
      locale={resolvedLocale}
      content={labels?.pressPage}
      title={pressPage?.title}
      bio={pressPage?.bio}
      pressPhotos={pressPage?.pressPhotos}
      pressKitAssets={pressPage?.pressKitAssets}
      techRider={pressPage?.techRider}
      stagePlot={pressPage?.stagePlot}
      pressMentions={pressMentions}
      bookings={{ email: bookingsEmail, phone: bookingsPhone }}
    />
  );
}
