import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type BlockFrameProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  as?: ElementType;
  children: ReactNode;
  innerClassName?: string;
};

/**
 * Canonical wrapper for every home-page block. Renders the Figma-aligned
 * 1200px container with a `gray-900` hairline border and the inner padding
 * the design system expects (16px on mobile, 24px from `md:` up; 40px top
 * and bottom). Blocks sit flush against each other; their 1px borders
 * touch to form the continuous rule seen in Figma.
 */
export function BlockFrame({
  as: Tag = "section",
  className,
  innerClassName,
  children,
  ...props
}: BlockFrameProps) {
  return (
    <Tag className={cn("w-full", className)} {...props}>
      <Container>
        <div
          className={cn(
            "border border-gray-900 px-4 py-8 md:px-6 md:py-10",
            "flex flex-col gap-8",
            innerClassName
          )}
        >
          {children}
        </div>
      </Container>
    </Tag>
  );
}

type BlockHeaderProps = {
  eyebrow?: string;
  title: string;
  rightLinkLabel?: string;
  rightLinkHref?: string;
  titleId?: string;
  className?: string;
};

/**
 * Section header used inside `BlockFrame` — small uppercase eyebrow on top,
 * 28px semibold title below, with an optional right-aligned ghost link
 * (for patterns like "Visit store" on Projects or "About me" on Gallery).
 */
export function BlockHeader({
  eyebrow,
  title,
  rightLinkLabel,
  rightLinkHref,
  titleId,
  className
}: BlockHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-3", className)}>
      {eyebrow ? (
        <p className="font-display text-xs font-medium uppercase tracking-wide text-gray-500">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2
          id={titleId}
          className="font-display text-header font-semibold uppercase text-gray-50"
        >
          {title}
        </h2>
        {rightLinkLabel && rightLinkHref ? (
          <a
            href={rightLinkHref}
            className="font-display text-body font-medium uppercase tracking-wide text-gray-300 transition-colors hover:text-gray-50"
          >
            {rightLinkLabel}
          </a>
        ) : null}
      </div>
    </header>
  );
}
