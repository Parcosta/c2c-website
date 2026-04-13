import Link from "next/link";
import { useTranslation } from "react-i18next";

import type { Locale } from "@/lib/i18n";
import { Container } from "@/components/layout/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "border-b border-gray-800",
        "bg-gray-950/60 supports-[backdrop-filter]:bg-gray-950/35 backdrop-blur"
      ].join(" ")}
    >
      <Container className="h-16">
        <div className="flex h-full items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Logo locale={locale} />
          </div>

          <DesktopNav locale={locale} className="flex-1 justify-center" />

          <div className="flex items-center gap-3">
            <LanguageToggle locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="hidden md:flex h-7 px-3 items-center justify-center bg-gray-900 text-white text-xs tracking-wide hover:bg-gray-800 transition-colors"
            >
              {t("nav.cta")}
            </Link>
            <MobileNav locale={locale} />
          </div>
        </div>
      </Container>
    </header>
  );
}
