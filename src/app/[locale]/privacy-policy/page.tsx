import type { Metadata } from "next";

import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const title = validLocale === "es" ? "Política de privacidad" : "Privacy Policy";
  const description = validLocale === "es" 
    ? "Política de privacidad de Coast2Coast"
    : "Privacy policy for Coast2Coast";
  return buildMetadata({
    title,
    description,
    pathname: "/privacy-policy",
    locale: validLocale
  });
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  if (validLocale === "es") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Política de privacidad</h1>
        <div className="prose prose-invert max-w-none">
          <p>Esta política de privacidad describe cómo se recopila, utiliza y protege tu información.</p>
          <h2>Información que recopilamos</h2>
          <p>Recopilamos información que nos proporcionas directamente, como tu nombre y correo electrónico cuando nos contactas.</p>
          <h2>Cómo utilizamos tu información</h2>
          <p>Utilizamos tu información para responder a tus consultas y mejorar nuestros servicios.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none">
        <p>This privacy policy describes how we collect, use, and protect your information.</p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, such as your name and email when you contact us.</p>
        <h2>How We Use Your Information</h2>
        <p>We use your information to respond to your inquiries and improve our services.</p>
      </div>
    </main>
  );
}
