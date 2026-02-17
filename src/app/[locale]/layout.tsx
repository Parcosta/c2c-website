import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CookieConsent } from "@/components/CookieConsent";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  return (
    <>
      {children}
      <CookieConsent locale={params.locale} />
    </>
  );
}

