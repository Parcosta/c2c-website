import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { AudioLines } from "lucide-react";

import { BlockFrame } from "@/components/blocks/BlockFrame";
import { Button } from "@/components/ui/button";
import { prefixLocaleHref, type Locale } from "@/lib/locale";
import type { ServiceValue } from "@/sanity/queries";

export type ServicesBlockProps = ComponentPropsWithoutRef<"section"> & {
  locale: Locale;
  title: string;
  description: string;
  services: ServiceValue[];
  ctaLabel: string;
  ctaHref: string;
  image: { src: string; alt: string };
};

export function ServicesBlock({
  locale,
  title,
  description,
  services,
  ctaLabel,
  ctaHref,
  image,
  className,
  ...props
}: ServicesBlockProps) {
  if (!services.length) return null;

  return (
    <BlockFrame
      className={className}
      aria-labelledby="services-title"
      innerClassName="gap-10 md:flex-row md:items-start md:gap-20"
      {...props}
    >
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-4">
          <AudioLines className="size-6 text-gray-50" aria-hidden="true" strokeWidth={2} />
          <h2
            id="services-title"
            className="font-display text-h3 font-semibold uppercase leading-none tracking-tight text-gray-50"
          >
            {title}
          </h2>
          <p className="text-body text-gray-50">{description}</p>
        </div>

        <ul className="flex flex-col gap-6" role="list">
          {services.map((service) => {
            if (!service.title) return null;
            return (
              <li key={service._id} className="flex flex-col gap-0.5">
                <h3 className="font-display text-subheader font-semibold uppercase text-gray-50">
                  {service.title}
                </h3>
                {service.description && (
                  <p className="text-body text-gray-300">{service.description}</p>
                )}
              </li>
            );
          })}
        </ul>

        <div>
          <Button asChild variant="dark" size="sm" className="uppercase tracking-wide">
            <Link href={prefixLocaleHref(ctaHref, locale)}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>

      <div className="relative aspect-[536/707] w-full shrink-0 overflow-hidden md:w-[536px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 536px, 100vw"
        />
      </div>
    </BlockFrame>
  );
}
