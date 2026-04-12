import * as React from "react";

import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  showAccent?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function SectionHeading({
  title,
  subtitle,
  showAccent = true,
  as: HeadingTag = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div className="flex items-center gap-3">
        {showAccent ? (
          <span
            data-testid="accent-line"
            className="h-1 w-10 rounded-full bg-primary shadow-[0_0_24px_-8px_hsl(var(--ring))]"
          />
        ) : null}
        <HeadingTag className="font-display text-header text-gray-100">{title}</HeadingTag>
      </div>
      {subtitle ? <p className="max-w-prose text-body text-gray-400">{subtitle}</p> : null}
    </div>
  );
}
