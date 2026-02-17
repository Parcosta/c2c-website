import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LogoProps = {
  locale: Locale;
  className?: string;
};

export function Logo({ locale, className }: LogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className={cn(
        "group inline-flex items-center gap-2 rounded-md px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950",
        className
      )}
      aria-label="C2C home"
    >
      <span
        className={cn(
          "relative grid h-8 w-8 place-items-center rounded-lg",
          "bg-gradient-to-br from-gray-100/20 to-gray-100/5 ring-1 ring-white/10",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.35)]"
        )}
        aria-hidden="true"
      >
        <span className="text-small font-semibold text-gray-100">C2C</span>
      </span>
      <span className="hidden text-small font-medium text-gray-100/90 sm:inline">C2C</span>
    </Link>
  );
}
