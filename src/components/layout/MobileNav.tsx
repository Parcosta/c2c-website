"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { navItems } from "@/components/layout/navItems";

type MobileNavProps = {
  locale: Locale;
};

export function MobileNav({ locale }: MobileNavProps) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-gray-950 text-gray-100 border-gray-800/60">
          <SheetHeader>
            <SheetTitle className="text-gray-100">Menu</SheetTitle>
            <SheetDescription className="sr-only">Primary navigation</SheetDescription>
          </SheetHeader>
          <nav className="mt-6 grid gap-2" aria-label="Mobile">
            {navItems.map((item) => (
              <SheetClose asChild key={item.label}>
                <Link
                  href={item.href(locale)}
                  className="rounded-md px-3 py-2 text-body font-medium text-gray-100/90 hover:bg-gray-900/60 hover:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
