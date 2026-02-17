import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale, locales } from "@/lib/i18n";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Container } from "@/components/layout/Container";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="min-h-dvh">
      <SiteHeader locale={locale} />
      {children}
      <footer className="border-t border-gray-800 py-10">
        <Container>
          <p className="text-sm text-gray-400" data-testid="site-footer">
            © {new Date().getFullYear()} Coast2Coast
          </p>
        </Container>
      </footer>
    </div>
  );
}
