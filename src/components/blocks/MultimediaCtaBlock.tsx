import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MultimediaCtaBlockProps extends ComponentPropsWithoutRef<"section"> {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function MultimediaCtaBlock({
  title,
  description,
  ctaLabel,
  ctaHref,
  className,
  ...props
}: MultimediaCtaBlockProps) {
  return (
    <section
      className={cn("w-full", className)}
      aria-labelledby="multimedia-cta-title"
      data-testid="multimedia-cta-block"
      {...props}
    >
      <Container>
        <div
          className={cn(
            "relative overflow-hidden border border-gray-900 bg-gray-900/20",
            "flex min-h-[360px] items-center justify-center md:min-h-[457px]",
            "px-6 py-12 md:px-16 md:py-20"
          )}
        >
          <div className="relative z-10 flex w-full max-w-[638px] flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <h2 id="multimedia-cta-title" className="font-display text-h3 uppercase text-gray-50">
                {title}
              </h2>
              <p className="text-body text-gray-50">{description}</p>
            </div>

            <Button asChild variant="dark" size="sm" className="uppercase tracking-widest">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
