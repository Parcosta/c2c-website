import * as React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type GlassCardProps = React.ComponentPropsWithoutRef<typeof Card>;

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "border-border/60 bg-card/40 backdrop-blur-md shadow-lg",
          "supports-[backdrop-filter]:bg-card/30",
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";
