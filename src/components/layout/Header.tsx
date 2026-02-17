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
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "border-b border-white/5",
        "bg-slate-950/60 supports-[backdrop-filter]:bg-slate-950/35 backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_60px_rgba(0,0,0,0.35)]"
      ].join(" ")}
    >
      <Container className="h-16">
        <div className="flex h-full items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Logo locale={locale} />
          </div>

          <DesktopNav locale={locale} className="flex-1 justify-center" />

          <div className="flex items-center gap-1">
            <LanguageToggle locale={locale} />
            <MobileNav locale={locale} />
          </div>
        </div>
      </Container>
    </header>
  );
}
