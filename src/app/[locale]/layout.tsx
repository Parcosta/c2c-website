import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale, locales } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";

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
      <Header locale={params.locale} />
      <main className="pt-16">{children}</main>
    </>
  );
}

