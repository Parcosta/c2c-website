import { Check } from "lucide-react";

import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";
import type { ServiceValue } from "@/sanity/queries";

import { ServiceIcon } from "./ServiceIcon";

export type ServicesPageViewProps = {
  locale: Locale;
  services: ServiceValue[];
};

function getLabels(locale: Locale) {
  return locale === "es"
    ? { heading: "Servicios", subheading: "Todo lo que ofrecemos—en detalle.", pricing: "Precio" }
    : { heading: "Services", subheading: "Everything we offer—explained in detail.", pricing: "Pricing" };
}

export function ServicesPageView({ locale, services }: ServicesPageViewProps) {
  const labels = getLabels(locale);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <SectionHeading title={labels.heading} subtitle={labels.subheading} as="h1" />
      </header>

      {services.length === 0 ? (
        <GlassCard className="p-6">
          <p className="text-sm text-muted-foreground">
            {locale === "es" ? "No hay servicios publicados todavía." : "No services are published yet."}
          </p>
        </GlassCard>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {services.map((service) => {
            const title = service.title?.trim() || (locale === "es" ? "Servicio" : "Service");
            const features = (service.features ?? []).filter(Boolean);

            return (
              <GlassCard key={service._id} className="h-full">
                <CardHeader className="gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/30">
                        <ServiceIcon name={service.icon} className="size-5 text-primary" data-testid="service-icon" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="font-display text-lg">{title}</CardTitle>
                        {service.description ? <CardDescription>{service.description}</CardDescription> : null}
                      </div>
                    </div>

                    {service.pricing ? (
                      <Badge variant="secondary" className="shrink-0">
                        {labels.pricing}: {service.pricing}
                      </Badge>
                    ) : null}
                  </div>
                </CardHeader>

                {features.length > 0 ? (
                  <CardContent>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {features.map((feature, idx) => (
                        <li key={`${service._id}-feature-${idx}`} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                ) : null}
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

