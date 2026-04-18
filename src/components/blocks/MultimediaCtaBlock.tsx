import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
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
    <Section
      className={className}
      aria-labelledby="multimedia-cta-title"
      data-testid="multimedia-cta-block"
      {...props}
    >
      <Container>
        <div
          className={cn(
            "relative overflow-hidden",
            "border border-gray-900 bg-gray-950",
            "flex items-center justify-center",
            "px-6 py-12 md:px-16 md:py-20",
            "min-h-[360px] md:min-h-[457px]"
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 12% 50%, rgba(59,130,246,0.16), transparent 42%), radial-gradient(circle at 88% 50%, rgba(59,130,246,0.08), transparent 48%)"
            }}
          />

          <div
            className={cn(
              "relative z-10 flex w-full max-w-[638px] flex-col items-center gap-4 text-center"
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <h2 id="multimedia-cta-title" className="font-display text-h3 text-gray-50">
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
    </Section>
  );
}
