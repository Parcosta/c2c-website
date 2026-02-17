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
        <div className="space-y-10">
          {(title || subtitle) && <SectionHeading title={title} subtitle={subtitle} />}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = resolveLucideIcon(service.icon);

              return (
                <GlassCard
                  key={service._id}
                  className={cn(
                    "group relative overflow-hidden p-6",
                    "transition-shadow hover:shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
                  )}
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "inline-flex h-11 w-11 items-center justify-center rounded-xl",
                          "bg-brand-accent/15 ring-1 ring-brand-accent/25",
                          "shadow-[0_0_0_4px_rgba(59,130,246,0.08)]"
                        )}
                      >
                        <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        {service.title && (
                          <h3 className="font-display text-lg font-semibold tracking-tight text-slate-50">
                            {service.title}
                          </h3>
                        )}
                        {service.description && (
                          <p className="mt-1 text-sm leading-relaxed text-slate-300">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {!!service.features?.length && (
                      <ul className="space-y-2 text-sm text-slate-200" role="list">
                        {service.features.map((feature, idx) => (
                          <li key={`${service._id}-feature-${idx}`} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-brand-accent" aria-hidden="true" />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
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

