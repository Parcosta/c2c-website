"use client";

import Link from "next/link";

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
  return (
    <nav className={cn("hidden md:flex", className)} aria-label="Primary">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild>
                <Link href={item.href(locale)} className={navigationMenuTriggerStyle()}>
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
