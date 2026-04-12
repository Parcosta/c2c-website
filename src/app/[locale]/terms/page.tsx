import type { Metadata } from "next";

import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const title = validLocale === "es" ? "Términos de servicio" : "Terms of Service";
  const description =
    validLocale === "es"
      ? "Términos de servicio de Coast2Coast"
      : "Terms of service for Coast2Coast";
  return buildMetadata({
    title,
    description,
    pathname: "/terms",
    locale: validLocale
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  if (validLocale === "es") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Términos de servicio</h1>
        <div className="prose prose-invert max-w-none">
          <p>Al utilizar este sitio web, aceptas estos términos de servicio.</p>
          <h2>Uso del sitio</h2>
          <p>Te comprometes a utilizar este sitio de manera legal y respetuosa.</p>
          <h2>Propiedad intelectual</h2>
          <p>Todo el contenido de este sitio está protegido por derechos de autor.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
      <div className="prose prose-invert max-w-none">
        <p>By using this website, you agree to these terms of service.</p>
        <h2>Site Usage</h2>
        <p>You agree to use this site in a lawful and respectful manner.</p>
        <h2>Intellectual Property</h2>
        <p>All content on this site is protected by copyright.</p>
      </div>
    </main>
  );
}
