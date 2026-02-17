import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-[var(--section-padding-mobile,48px)] md:py-[var(--section-padding-desktop,80px)]",
        className
      )}
      {...props}
    />
  );
}
