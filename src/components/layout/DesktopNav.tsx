"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import type { Locale } from "@/lib/i18n";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navItems } from "@/components/layout/navItems";

type DesktopNavProps = {
  locale: Locale;
  className?: string;
};

export function DesktopNav({ locale, className }: DesktopNavProps) {
  const { t } = useTranslation();

  return (
    <nav className={cn("hidden md:flex", className)} aria-label="Primary">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.labelKey}>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${locale}${item.href === "/" ? "" : item.href}`}
                  className={navigationMenuTriggerStyle()}
                >
                  {t(item.labelKey)}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
