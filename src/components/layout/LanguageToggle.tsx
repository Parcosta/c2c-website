"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n";
import { locales, switchLocaleInPathname } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  locale: Locale;
  className?: string;
};

export function LanguageToggle({ locale, className }: LanguageToggleProps) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <div className={cn("hidden sm:flex items-center gap-1", className)} aria-label="Language">
      {locales.map((target) => {
        const href = switchLocaleInPathname(pathname, target);
        const isActive = target === locale;
        return (
          <Button asChild key={target} size="sm" variant={isActive ? "secondary" : "ghost"}>
            <Link href={href} aria-current={isActive ? "page" : undefined}>
              {target.toUpperCase()}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
