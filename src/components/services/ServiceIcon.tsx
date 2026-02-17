import type * as React from "react";
import * as LucideIcons from "lucide-react";

export type ServiceIconProps = {
  name?: string;
  className?: string;
  "data-testid"?: string;
};

type LucideIconComponent = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
  focusable?: boolean;
}>;

function getLucideIconByName(name: string | undefined): LucideIconComponent | null {
  if (!name) return null;
  const candidate = (LucideIcons as unknown as Record<string, unknown>)[name];
  if (typeof candidate !== "function") return null;
  return candidate as LucideIconComponent;
}

export function ServiceIcon({ name, className, ...props }: ServiceIconProps) {
  const Icon = getLucideIconByName(name) ?? LucideIcons.Sparkles;
  return <Icon aria-hidden focusable={false} className={className} {...props} />;
}

