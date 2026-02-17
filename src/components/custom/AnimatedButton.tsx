import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AnimatedButtonProps extends ButtonProps {
  glow?: boolean;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, glow = true, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "transition-transform duration-150 will-change-transform hover:scale-[1.02] active:scale-[0.98]",
          glow && "hover:shadow-[0_0_0_3px_hsl(var(--ring)_/_0.25)]",
          className
        )}
        {...props}
      />
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
