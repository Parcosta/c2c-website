import Image from "next/image";
import Link from "next/link";

import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";
import { addLocaleToPathname } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import type { PortfolioDetailItem } from "./types";

function formatLongDate(value: string | undefined, locale: Locale): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(date);
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-sm leading-7 text-slate-200">{children}</p>,
    h2: ({ children }) => (
      <h2 className="pt-2 font-display text-lg font-semibold tracking-tight text-slate-50">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-2 font-display text-base font-semibold tracking-tight text-slate-50">{children}</h3>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-1 pl-5 text-sm text-slate-200">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-200">{children}</ol>
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <a
          href={href}
          className="text-primary underline underline-offset-4 hover:text-primary/90"
          rel="noreferrer noopener"
          target="_blank"
        >
          {children}
        </a>
      );
    }
  }
};

export function PortfolioDetail({ item }: { item: PortfolioDetailItem }) {
  const dateLabel = formatLongDate(item.date, item.locale);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link
          href={addLocaleToPathname("/portfolio", item.locale)}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Back to portfolio
        </Link>

        <SectionHeading
          as="h1"
          title={item.title}
          subtitle={[item.category?.trim(), dateLabel].filter(Boolean).join(" • ") || undefined}
        />

        {item.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      {item.images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {item.images.map((image, idx) => (
            <GlassCard
              key={`${image.url}-${idx}`}
              className={cn("overflow-hidden", idx === 0 ? "sm:col-span-2" : "")}
            >
              <div className={cn("relative w-full", idx === 0 ? "aspect-[16/9]" : "aspect-[4/3]")}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            </GlassCard>
          ))}
        </div>
      ) : null}

      {Array.isArray(item.description) && item.description.length > 0 ? (
        <GlassCard className="p-6">
          <div className="space-y-4">
            <PortableText value={item.description as unknown[]} components={portableTextComponents} />
          </div>
        </GlassCard>
      ) : null}
    </div>
  );
}

