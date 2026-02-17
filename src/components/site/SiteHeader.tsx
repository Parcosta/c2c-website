"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { switchLocaleInPathname } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";

type NavItem = { href: string; label: string; testId: string };

function buildNav(locale: Locale): NavItem[] {
  const copy = getCopy(locale);
  return [
    { href: `/${locale}`, label: copy.nav.home, testId: "nav-home" },
    { href: `/${locale}/portfolio`, label: copy.nav.portfolio, testId: "nav-portfolio" },
    { href: `/${locale}/contact`, label: copy.nav.contact, testId: "nav-contact" }
  ];
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname() ?? `/${locale}`;
  const copy = getCopy(locale);

  const nav = useMemo(() => buildNav(locale), [locale]);
  const [mobileOpen, setMobileOpen] = useState(false);

  function onSwitchLocale(nextLocale: Locale) {
    const nextPath = switchLocaleInPathname(pathname, nextLocale);
    setMobileOpen(false);
    router.push(nextPath);
  }

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/70 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="font-display text-base font-semibold tracking-tight text-slate-50"
          data-testid="brand"
        >
          {copy.brand}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary" data-testid="desktop-nav">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-testid={item.testId}
              className="text-sm text-slate-200 transition-colors hover:text-white"
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
                locale === "en" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onSwitchLocale("es")}
              data-testid="lang-es"
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                locale === "es" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"
              }`}
              aria-label="Switch language to Spanish"
            >
              ES
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:text-white md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          data-testid="mobile-menu-button"
        >
          Menu
        </button>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          data-testid="mobile-menu"
          className="border-t border-slate-800 bg-slate-950 md:hidden"
        >
          <div className="mx-auto w-full max-w-7xl space-y-3 px-4 py-4 sm:px-6 lg:px-8">
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-testid={`mobile-${item.testId}`}
                  className="rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 hover:text-white"
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
                    locale === "en" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchLocale("es")}
                  data-testid="mobile-lang-es"
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                    locale === "es" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  ES
                </button>
              </div>

              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm text-slate-300 hover:text-white"
                onClick={() => setMobileOpen(false)}
                data-testid="mobile-menu-close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

