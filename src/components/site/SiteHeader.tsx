"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Locale } from "@/lib/i18n";
import { switchLocaleInPathname } from "@/lib/i18n";

type NavItem = { href: string; label: string; testId: string };

function buildNav(t: (key: string) => string, locale: Locale): NavItem[] {
  return [
    { href: `/${locale}`, label: t("nav.home"), testId: "nav-home" },
    { href: `/${locale}/portfolio`, label: t("nav.portfolio"), testId: "nav-portfolio" },
    { href: `/${locale}/contact`, label: t("nav.contact"), testId: "nav-contact" }
  ];
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname() ?? `/${locale}`;
  const { t, i18n } = useTranslation();

  const nav = useMemo(() => buildNav(t as (key: string) => string, locale), [t, locale]);
  const [mobileOpen, setMobileOpen] = useState(false);

  function onSwitchLocale(nextLocale: Locale) {
    // Change i18next language
    i18n.changeLanguage(nextLocale);
    // Navigate to the new locale path
    const nextPath = switchLocaleInPathname(pathname, nextLocale);
    setMobileOpen(false);
    router.push(nextPath);
  }

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
            <button
              type="button"
              onClick={() => onSwitchLocale("en")}
              data-testid="lang-en"
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                locale === "en" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
              }`}
              aria-label={t("language.switchToEnglish")}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onSwitchLocale("es")}
              data-testid="lang-es"
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                locale === "es" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
              }`}
              aria-label={t("language.switchToSpanish")}
            >
              ES
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-800 px-3 py-2 text-small text-gray-200 hover:text-white md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          data-testid="mobile-menu-button"
        >
          {t("nav.home") === "Home" ? "Menu" : "Menú"}
        </button>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          data-testid="mobile-menu"
          className="border-t border-gray-800 bg-gray-950 md:hidden"
        >
          <div className="mx-auto w-full max-w-7xl space-y-3 px-4 py-4 sm:px-6 lg:px-8">
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-testid={`mobile-${item.testId}`}
                  className="rounded-md px-3 py-2 text-small text-gray-200 hover:bg-gray-900 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2" data-testid="mobile-language-switcher">
                <button
                  type="button"
                  onClick={() => onSwitchLocale("en")}
                  data-testid="mobile-lang-en"
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                    locale === "en" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchLocale("es")}
                  data-testid="mobile-lang-es"
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                    locale === "es" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  ES
                </button>
              </div>

              <button
                type="button"
                className="rounded-md px-3 py-2 text-small text-gray-400 hover:text-white"
                onClick={() => setMobileOpen(false)}
                data-testid="mobile-menu-close"
              >
                {t("nav.home") === "Home" ? "Close" : "Cerrar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
