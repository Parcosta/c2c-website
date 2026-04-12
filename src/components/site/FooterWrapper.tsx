import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { loadTranslations, getTranslation } from "@/lib/server-i18n";
import { Container } from "@/components/layout/Container";

interface FooterWrapperProps {
  locale: Locale;
}

export async function FooterWrapper({ locale }: FooterWrapperProps) {
  const translations = await loadTranslations(locale);
  const t = (key: string) => getTranslation(translations, key);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 py-10">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-sm text-gray-400" data-testid="site-footer">
            © {currentYear} Coast2Coast
          </p>

          {/* Footer Navigation */}
          <nav className="flex flex-wrap items-center gap-4 text-sm" aria-label="Footer">
            <Link
              href={`/${locale}/booking`}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {t("nav.home") === "Home" ? "Booking" : "Contratación"}
            </Link>
            <Link
              href={`/${locale}/privacy-policy`}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {t("nav.home") === "Home" ? "Privacy Policy" : "Política de Privacidad"}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {t("nav.home") === "Home" ? "Terms" : "Términos"}
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
