"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

type LanguageToggleProps = {
  locale: Locale;
  className?: string;
};

export function LanguageToggle({ locale, className }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  function onSwitchLocale(target: Locale) {
    // Replace current locale in pathname with new locale
    const newPath = pathname.replace(/^\/(en|es)/, `/${target}`);
    router.push(newPath);
  }

  return (
    <div className={cn("hidden sm:flex items-center gap-1", className)} aria-label="Language">
      {locales.map((target) => {
        const isActive = target === locale;
        return (
          <Button
            key={target}
            size="sm"
            variant={isActive ? "secondary" : "ghost"}
            onClick={() => onSwitchLocale(target)}
            aria-current={isActive ? "page" : undefined}
          >
            {target.toUpperCase()}
          </Button>
        );
      })}
    </div>
  );
}
