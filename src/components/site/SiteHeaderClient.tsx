"use client";

import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/locale";
import { switchLocaleInPathname } from "@/lib/locale";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  testId: string;
}

interface SiteHeaderTranslations {
  brand: string;
  primaryAriaLabel: string;
  mobileAriaLabel: string;
  navHome: string;
  navPortfolio: string;
  navServices: string;
  navPress: string;
  navAbout: string;
  navContact: string;
  navMobileMenu: string;
  navClose: string;
  languageSwitchToEnglish: string;
  languageSwitchToSpanish: string;
}

interface SiteHeaderClientProps {
  locale: Locale;
  translations: SiteHeaderTranslations;
}

function buildNav(translations: SiteHeaderTranslations, locale: Locale): NavItem[] {
  return [
    { href: `/${locale}`, label: translations.navHome, testId: "nav-home" },
    { href: `/${locale}/portfolio`, label: translations.navPortfolio, testId: "nav-portfolio" },
    { href: `/${locale}/services`, label: translations.navServices, testId: "nav-services" },
    { href: `/${locale}/press`, label: translations.navPress, testId: "nav-press" },
    { href: `/${locale}/about`, label: translations.navAbout, testId: "nav-about" }
  ];
}

const navLinkClass =
  "font-display text-small font-medium uppercase tracking-wide text-gray-100 transition-colors hover:text-white";

export function SiteHeaderClient({ locale, translations }: SiteHeaderClientProps) {
  const router = useRouter();
  const pathname = usePathname() ?? `/${locale}`;

  const nav = useMemo(() => buildNav(translations, locale), [translations, locale]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const nextLocale: Locale = locale === "en" ? "es" : "en";
  const switchLabel =
    nextLocale === "en"
      ? translations.languageSwitchToEnglish
      : translations.languageSwitchToSpanish;

  function onSwitchLocale() {
    const nextPath = switchLocaleInPathname(pathname, nextLocale);
    setMobileOpen(false);
    router.push(nextPath);
  }

  return (
    <header data-testid="site-header" className="sticky top-0 z-40 bg-black/85 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between gap-4 border border-gray-900 px-6 py-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-gray-100"
            data-testid="brand"
            aria-label={translations.brand}
          >
            <Logo title={translations.brand} />
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label={translations.primaryAriaLabel}
            data-testid="desktop-nav"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-testid={item.testId}
                className={navLinkClass}
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={onSwitchLocale}
              data-testid="lang-switch"
              aria-label={switchLabel}
              className={cn("flex items-center gap-1", navLinkClass)}
            >
              <Globe className="size-4" aria-hidden="true" />
              <span>{locale.toUpperCase()}</span>
            </button>

            <Button asChild variant="secondary" size="sm" className="uppercase tracking-wide">
              <Link href={`/${locale}/contact`} data-testid="nav-contact">
                {translations.navContact}
              </Link>
            </Button>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? translations.navClose : translations.navMobileMenu}
            data-testid="mobile-menu-button"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div id="mobile-menu" data-testid="mobile-menu" className="md:hidden">
          <Container>
            <div className="flex min-h-[calc(100vh-72px)] flex-col justify-between border-x border-b border-gray-900 bg-black px-6 py-10">
              <nav aria-label={translations.mobileAriaLabel} className="flex flex-col gap-6">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-testid={`mobile-${item.testId}`}
                    className="font-display text-subheader font-semibold uppercase tracking-wide text-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="mt-2 w-full max-w-[158px] uppercase tracking-wide"
                >
                  <Link
                    href={`/${locale}/contact`}
                    data-testid="mobile-nav-contact"
                    onClick={() => setMobileOpen(false)}
                  >
                    {translations.navContact}
                  </Link>
                </Button>
              </nav>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onSwitchLocale}
                  data-testid="mobile-lang-switch"
                  aria-label={switchLabel}
                  className={cn("flex items-center gap-1", navLinkClass)}
                >
                  <Globe className="size-4" aria-hidden="true" />
                  <span>{locale.toUpperCase()}</span>
                </button>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
