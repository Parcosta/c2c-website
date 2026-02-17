import { createElement } from "react";
import type { ComponentType } from "react";
import * as LucideIcons from "lucide-react";

export type ServiceIconProps = {
  name?: string;
  className?: string;
  "data-testid"?: string;
};

const iconMap = new Map<string, ComponentType<Record<string, unknown>>>();
for (const [key, value] of Object.entries(LucideIcons)) {
  if (typeof value === "function") {
    iconMap.set(key, value as ComponentType<Record<string, unknown>>);
  }
}

export function ServiceIcon({ name, className, ...props }: ServiceIconProps) {
  const icon = (name && iconMap.get(name)) || LucideIcons.Sparkles;
  return createElement(icon, { "aria-hidden": true, focusable: false, className, ...props });
}
