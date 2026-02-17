import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles: DM Sans font (font-display), 14px (text-sm), medium weight (font-medium), flex centering
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-display text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary: bg-gray-100, text-gray-950 per Figma
        primary:
          "bg-gray-100 text-gray-950 hover:bg-gray-200",
        // Secondary: border-gray-600, text-gray-100, transparent bg per Figma
        secondary:
          "border border-gray-600 bg-transparent text-gray-100 hover:bg-gray-800 hover:border-gray-400",
        // Outline variant for compatibility
        outline:
          "border border-gray-600 bg-transparent text-gray-100 hover:bg-gray-800",
        // Ghost variant for subtle interactions
        ghost:
          "hover:bg-gray-800 hover:text-gray-100 text-gray-100",
        // Link variant
        link: "text-gray-100 underline-offset-4 hover:underline",
        // Destructive for error states
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600"
      },
      size: {
        // Figma specs: 12px 24px padding
        default: "px-6 py-3",
        sm: "px-4 py-2 text-xs",
        lg: "px-8 py-4 text-base",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
