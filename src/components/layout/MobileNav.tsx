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
        <SheetContent className="bg-slate-950 text-slate-50 border-slate-800/60">
          <SheetHeader>
            <SheetTitle className="text-slate-50">Menu</SheetTitle>
            <SheetDescription className="sr-only">Primary navigation</SheetDescription>
          </SheetHeader>
          <nav className="mt-6 grid gap-2" aria-label="Mobile">
            {navItems.map((item) => (
              <SheetClose asChild key={item.label}>
                <Link
                  href={item.href(locale)}
                  className="rounded-md px-3 py-2 text-base font-medium text-slate-50/90 hover:bg-slate-900/60 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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

