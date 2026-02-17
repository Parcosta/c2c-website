import { notFound } from "next/navigation";

import { PressPageView } from "@/features/press/PressPageView";
import { isLocale, type Locale } from "@/lib/i18n";
import { isSanityConfigured } from "@/sanity/config";
import { client } from "@/sanity/client";
import { buildPressEpkQuery, type PressEpkValue } from "@/sanity/queries";

export const dynamic = "force-dynamic";

export default async function PressPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  let data: PressEpkValue | null = null;
  if (isSanityConfigured()) {
    const def = buildPressEpkQuery(locale);
    try {
      data = await client.fetch(def.query, def.params);
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
      locale={locale}
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

