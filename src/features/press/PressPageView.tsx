"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useTranslation } from "react-i18next";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/lib/i18n";
import type { PressDownloadValue, PressItemValue, PressPhotoValue } from "@/sanity/queries";

export type PressPageViewModel = {
  locale: Locale;
  title?: string;
  bio?: unknown;
  pressPhotos?: PressPhotoValue[];
  pressKitAssets?: PressDownloadValue[];
  techRider?: { url?: string; filename?: string } | null;
  stagePlot?: { url?: string; filename?: string } | null;
  bookings?: { email?: string; phone?: string };
  pressMentions?: PressItemValue[];
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm leading-relaxed text-gray-200 sm:text-base">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-lg font-semibold tracking-tight text-gray-100 sm:text-xl">
        {children}
      </h3>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 text-gray-200">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 text-gray-200">{children}</ol>
    )
  },
  listItem: {
    bullet: ({ children }) => <li className="text-sm leading-relaxed sm:text-base">{children}</li>,
    number: ({ children }) => <li className="text-sm leading-relaxed sm:text-base">{children}</li>
  }
};

function formatPressDate(locale: Locale, date?: string) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(parsed);
}

function makeSanityImagePreviewUrl(url: string) {
  const joinChar = url.includes("?") ? "&" : "?";
  return `${url}${joinChar}auto=format&fit=max&w=1200`;
}

export function PressPageView({
  locale,
  title,
  bio,
  pressPhotos,
  pressKitAssets,
  techRider,
  stagePlot,
  bookings,
  pressMentions
}: PressPageViewModel) {
  const { t } = useTranslation();
  const effectiveTitle = title || t("press.pageTitleFallback");
  const photos = pressPhotos ?? [];
  const downloads = pressKitAssets ?? [];
  const mentions = pressMentions ?? [];

  const bookingsEmail = bookings?.email?.trim();
  const bookingsPhone = bookings?.phone?.trim();

  return (
    <main>
      <Section className="pt-10 md:pt-16">
        <Container>
          <div className="space-y-4">
            <SectionHeading title={effectiveTitle} subtitle={t("press.intro")} as="h1" />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base sm:text-lg">{t("press.bioTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bio ? (
                    <PortableText value={bio as never} components={portableTextComponents} />
                  ) : (
                    <p className="text-sm text-muted-foreground sm:text-base">
                      {t("press.bioEmpty")}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base sm:text-lg">
                    {t("press.pressPhotosTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {photos.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {photos.map((photo) => {
                        const imageUrl = photo.imageUrl?.trim();
                        const filename = photo.filename?.trim();
                        const label =
                          photo.title?.trim() || filename || t("press.pressPhotosTitle");
                        return (
                          <div
                            key={photo._key}
                            className="overflow-hidden rounded-lg border border-gray-800"
                          >
                            {imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={makeSanityImagePreviewUrl(imageUrl)}
                                alt={label}
                                className="h-48 w-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="flex h-48 w-full items-center justify-center bg-gray-900/40 text-sm text-muted-foreground">
                                {t("press.pressPhotosEmpty")}
                              </div>
                            )}
                            <div className="flex items-center justify-between gap-3 p-3">
                              <div className="min-w-0">
                                <div className="truncate text-sm font-medium text-gray-100">
                                  {label}
                                </div>
                              </div>
                              {imageUrl ? (
                                <a
                                  href={imageUrl}
                                  download={filename || true}
                                  className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
                                >
                                  {t("press.downloadLabel")}
                                </a>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground sm:text-base">
                      {t("press.pressPhotosEmpty")}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base sm:text-lg">
                    {t("press.pressMentionsTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mentions.length > 0 ? (
                    <ul className="space-y-4">
                      {mentions.map((item) => {
                        const dateLabel = formatPressDate(locale, item.date);
                        const titleLabel = item.title?.trim() || t("press.pressMentionsTitle");
                        const publicationLabel = item.publication?.trim();
                        const href = item.url?.trim();
                        return (
                          <li key={item._id} className="space-y-1">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                              {href ? (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-medium text-gray-100 underline-offset-4 hover:underline"
                                >
                                  {titleLabel}
                                </a>
                              ) : (
                                <div className="font-medium text-gray-100">{titleLabel}</div>
                              )}
                              {publicationLabel ? (
                                <span className="text-sm text-muted-foreground">
                                  {publicationLabel}
                                </span>
                              ) : null}
                              {dateLabel ? (
                                <span className="text-sm text-muted-foreground">{dateLabel}</span>
                              ) : null}
                            </div>
                            {item.quote ? (
                              <p className="text-sm text-gray-200 sm:text-base">
                                &ldquo;{item.quote}&rdquo;
                              </p>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground sm:text-base">
                      {t("press.pressMentionsEmpty")}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base sm:text-lg">{t("press.pressKitTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {downloads.length > 0 ? (
                    <ul className="space-y-2">
                      {downloads.map((asset) => {
                        const href = asset.url?.trim();
                        const filename = asset.filename?.trim();
                        const label = asset.title?.trim() || filename || t("press.pressKitTitle");
                        return (
                          <li key={asset._key} className="flex items-center justify-between gap-3">
                            <span className="min-w-0 truncate text-sm text-gray-200">{label}</span>
                            {href ? (
                              <a
                                href={href}
                                download={filename || true}
                                className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
                              >
                                {t("press.downloadLabel")}
                              </a>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t("press.pressKitEmpty")}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base sm:text-lg">
                    {t("press.techRiderTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {techRider?.url ? (
                    <a
                      href={techRider.url}
                      download={techRider.filename || true}
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {t("press.downloadLabel")}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t("press.techRiderEmpty")}</p>
                  )}

                  <Separator className="bg-gray-800" />

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-100">
                      {t("press.stagePlotTitle")}
                    </div>
                    {stagePlot?.url ? (
                      <a
                        href={stagePlot.url}
                        download={stagePlot.filename || true}
                        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {t("press.downloadLabel")}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {t("press.stagePlotPlaceholder")}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base sm:text-lg">{t("press.bookingsTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {bookingsEmail ? (
                    <div className="text-sm">
                      <a
                        href={`mailto:${bookingsEmail}`}
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {bookingsEmail}
                      </a>
                    </div>
                  ) : null}
                  {bookingsPhone ? (
                    <div className="text-sm text-gray-200">{bookingsPhone}</div>
                  ) : null}
                  {!bookingsEmail && !bookingsPhone ? (
                    <p className="text-sm text-muted-foreground">{t("press.bookingsEmpty")}</p>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
