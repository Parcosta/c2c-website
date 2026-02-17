import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { GlassCard } from "@/components/custom/GlassCard";
import { SectionHeading } from "@/components/custom/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n";

import { getAboutCopy } from "./aboutCopy";

export type AboutRelease = {
  _key: string;
  title?: string;
  year?: number;
  label?: string;
  url?: string;
};

export type AboutEquipmentGroup = {
  _key: string;
  title?: string;
  items?: string[];
};

export type AboutPageViewModel = {
  locale: Locale;
  title?: string;
  intro?: string;
  photoUrl?: string | null;
  photoAlt?: string;
  bio?: unknown;
  releases?: AboutRelease[];
  equipmentGroups?: AboutEquipmentGroup[];
  influences?: string[];
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm leading-relaxed text-slate-200 sm:text-base">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
        {children}
      </h3>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 text-slate-200">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 text-slate-200">{children}</ol>
    )
  },
  listItem: {
    bullet: ({ children }) => <li className="text-sm leading-relaxed sm:text-base">{children}</li>,
    number: ({ children }) => <li className="text-sm leading-relaxed sm:text-base">{children}</li>
  }
};

function formatReleaseLabel(release: AboutRelease) {
  const year = typeof release.year === "number" ? String(release.year) : null;
  const label = release.label?.trim() || null;
  if (year && label) return `${year} · ${label}`;
  return year ?? label;
}

export function AboutPageView({
  locale,
  title,
  intro,
  photoUrl,
  photoAlt,
  bio,
  releases,
  equipmentGroups,
  influences
}: AboutPageViewModel) {
  const c = getAboutCopy(locale);

  const effectiveTitle = title?.trim() || c.pageTitleFallback;
  const effectiveIntro = intro?.trim() || c.introFallback;
  const effectivePhotoAlt = photoAlt?.trim() || c.photoAltFallback;

  const releaseItems = (releases ?? []).filter((r) => r.title?.trim());
  const groups = (equipmentGroups ?? []).filter(
    (g) => g.title?.trim() || (g.items ?? []).length > 0
  );
  const influenceItems = (influences ?? []).map((i) => i.trim()).filter(Boolean);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <SectionHeading title={effectiveTitle} subtitle={effectiveIntro} as="h1" />
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="h-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base sm:text-lg">{c.bioTitle}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-[160px_1fr]">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-background/20">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl}
                  alt={effectivePhotoAlt}
                  className="h-40 w-full object-cover sm:h-full"
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center text-sm text-muted-foreground sm:h-full">
                  {c.photoAltFallback}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {bio ? (
                <PortableText value={bio as never} components={portableTextComponents} />
              ) : (
                <p className="text-sm text-muted-foreground sm:text-base">{c.bioEmpty}</p>
              )}
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard className="h-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base sm:text-lg">{c.releasesTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            {releaseItems.length > 0 ? (
              <ul className="space-y-3">
                {releaseItems.map((release) => {
                  const displayTitle = release.title?.trim() || "";
                  const meta = formatReleaseLabel(release);
                  const href = release.url?.trim();
                  return (
                    <li key={release._key} className="space-y-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-slate-100 underline-offset-4 hover:underline"
                          >
                            {displayTitle}
                          </a>
                        ) : (
                          <div className="font-medium text-slate-100">{displayTitle}</div>
                        )}
                        {meta ? (
                          <span className="text-sm text-muted-foreground">{meta}</span>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground sm:text-base">{c.releasesEmpty}</p>
            )}
          </CardContent>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base sm:text-lg">{c.equipmentTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {groups.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {groups.map((group) => {
                  const groupTitle = group.title?.trim() || c.equipmentTitle;
                  const items = (group.items ?? []).map((i) => i.trim()).filter(Boolean);
                  return (
                    <div key={group._key} className="space-y-2">
                      <div className="text-sm font-medium text-slate-100">{groupTitle}</div>
                      {items.length > 0 ? (
                        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-200 sm:text-base">
                          {items.map((item, idx) => (
                            <li key={`${group._key}-item-${idx}`}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{c.equipmentEmpty}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground sm:text-base">{c.equipmentEmpty}</p>
            )}
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base sm:text-lg">{c.influencesTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            {influenceItems.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {influenceItems.map((influence) => (
                  <Badge key={influence} variant="secondary">
                    {influence}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground sm:text-base">{c.influencesEmpty}</p>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
