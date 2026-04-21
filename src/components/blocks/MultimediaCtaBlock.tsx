import Image from "next/image";
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
          data-block="content"
          className={cn(
            "relative isolate overflow-hidden border border-gray-900 bg-gray-950",
            "flex min-h-[360px] items-center justify-center md:min-h-[457px]",
            "px-6 py-16 md:px-24 md:py-24"
          )}
        >
          <Image
            src="/images/multimedia-vector-left.svg"
            alt=""
            aria-hidden="true"
            width={266}
            height={361}
            className="pointer-events-none absolute -left-4 top-1/2 hidden h-[70%] w-auto -translate-y-1/2 select-none opacity-70 md:block"
            priority={false}
          />
          <Image
            src="/images/multimedia-vector-right.svg"
            alt=""
            aria-hidden="true"
            width={822}
            height={1117}
            className="pointer-events-none absolute -right-40 top-1/2 hidden h-[220%] w-auto -translate-y-1/2 select-none opacity-70 lg:block"
            priority={false}
          />

          <div className="relative z-10 flex w-full max-w-[638px] flex-col items-center gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <h2
                id="multimedia-cta-title"
                className="font-display text-h3 font-semibold uppercase text-gray-50"
              >
                {title}
              </h2>
              <p className="font-display text-body text-gray-50">{description}</p>
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
