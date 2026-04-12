import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import { loadTranslations, getTranslation } from "@/lib/server-i18n";

interface NavItem {
  href: string;
  label: string;
  testId: string;
}

function buildNav(translations: Record<string, unknown>, locale: Locale): NavItem[] {
  const t = (key: string) => getTranslation(translations, key);

  return [
    { href: `/${locale}`, label: t("nav.home"), testId: "nav-home" },
    { href: `/${locale}/portfolio`, label: t("nav.portfolio"), testId: "nav-portfolio" },
    { href: `/${locale}/services`, label: t("nav.services"), testId: "nav-services" },
    { href: `/${locale}/press`, label: t("nav.press"), testId: "nav-press" },
    { href: `/${locale}/about`, label: t("nav.about"), testId: "nav-about" },
    { href: `/${locale}/contact`, label: t("nav.contact"), testId: "nav-contact" }
  ];
}

interface SiteHeaderServerProps {
  locale: Locale;
}

export async function SiteHeaderServer({ locale }: SiteHeaderServerProps) {
  const translations = await loadTranslations(locale);
  const t = (key: string) => getTranslation(translations, key);
  const nav = buildNav(translations, locale);

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 border-b border-gray-800 bg-gray-950/70 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="font-display text-base font-semibold text-gray-100"
          data-testid="brand"
        >
          {t("brand")}
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Primary"
          data-testid="desktop-nav"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-testid={item.testId}
              className="text-small text-gray-200 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2" data-testid="language-switcher">
            <Link
              href={`/en`}
              data-testid="lang-en"
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                locale === "en" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
              }`}
              aria-label={t("language.switchToEnglish")}
            >
              EN
            </Link>
            <Link
              href={`/es`}
              data-testid="lang-es"
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                locale === "es" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
              }`}
              aria-label={t("language.switchToSpanish")}
            >
              ES
            </Link>
          </div>
        </nav>

        {/* Mobile menu button - simplified for server render */}
        <Link
          href={`/${locale}/menu`}
          className="inline-flex items-center rounded-md border border-gray-800 px-3 py-2 text-small text-gray-200 hover:text-white md:hidden"
          data-testid="mobile-menu-button"
        >
          {locale === "es" ? "Menú" : "Menu"}
        </Link>
      </div>
    </header>
  );
}
