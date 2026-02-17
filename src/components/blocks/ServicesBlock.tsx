import type { ComponentPropsWithoutRef } from "react";

import { Check, HelpCircle, type LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { ServiceValue } from "@/sanity/queries";
import { cn } from "@/lib/utils";

import * as Lucide from "lucide-react";

export type ServicesBlockProps = ComponentPropsWithoutRef<"section"> & {
  title?: string;
  subtitle?: string;
  services?: ServiceValue[];
};

function resolveLucideIcon(name?: string): LucideIcon {
  if (!name) return HelpCircle;
  const maybe = (Lucide as Record<string, unknown>)[name];
  return typeof maybe === "function" ? (maybe as LucideIcon) : HelpCircle;
}

export function ServicesBlock({
  title,
  subtitle,
  services,
  className,
  ...props
}: ServicesBlockProps) {
  if (!services?.length) return null;

  return (
    <Section className={className} {...props}>
      <Container>
        <div className="space-y-12 md:space-y-16">
          {/* Section Header - Figma Spec: accent line + title + subtitle */}
          {title && <SectionHeading title={title} subtitle={subtitle} />}

          {/* Service Cards Grid - Figma Spec: 3-column grid with 24px gap */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = resolveLucideIcon(service.icon);

              return (
                <GlassCard
                  key={service._id}
                  className={cn(
                    "group relative overflow-hidden",
                    "p-6 md:p-8",
                    "transition-all duration-300 ease-out",
                    "hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]",
                    "hover:border-brand-accent/30"
                  )}
                >
                  <div className="flex flex-col gap-6">
                    {/* Icon Container - Figma Spec: 48x48 with brand accent */}
                    <div
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-xl",
                        "bg-brand-accent/10",
                        "ring-1 ring-brand-accent/20",
                        "transition-all duration-300",
                        "group-hover:bg-brand-accent/15 group-hover:ring-brand-accent/30",
                        "group-hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)]"
                      )}
                    >
                      <Icon
                        className="h-5 w-5 text-brand-accent transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Content Area */}
                    <div className="space-y-3">
                      {/* Title - Figma Spec: font-display, text-subheader, gray-100 */}
                      {service.title && (
                        <h3 className="font-display text-lg font-semibold tracking-tight text-gray-100">
                          {service.title}
                        </h3>
                      )}

                      {/* Description - Figma Spec: text-body, gray-400 */}
                      {service.description && (
                        <p className="text-sm leading-relaxed text-gray-400">
                          {service.description}
                        </p>
                      )}
                    </div>

                    {/* Features List - Figma Spec: check icons with proper spacing */}
                    {!!service.features?.length && (
                      <ul className="space-y-2.5 pt-2" role="list">
                        {service.features.map((feature, idx) => (
                          <li
                            key={`${service._id}-feature-${idx}`}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-0.5 flex-shrink-0">
                              <Check
                                className="h-4 w-4 text-brand-accent"
                                aria-hidden="true"
                                strokeWidth={2.5}
                              />
                            </div>
                            <span className="text-sm leading-relaxed text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Pricing - Optional display */}
                    {service.pricing && (
                      <div className="pt-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          Starting at {service.pricing}
                        </span>
                      </div>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
