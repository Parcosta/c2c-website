"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const CONSENT_COOKIE_NAME = "c2c_cookie_consent";
const CONSENT_STORAGE_KEY = "c2c_cookie_consent";
const CONSENT_VERSION = 1;
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type ConsentState = {
  version: typeof CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split(";").map((part) => part.trim());
  const prefix = `${name}=`;
  for (const part of parts) {
    if (part.startsWith(prefix)) return part.slice(prefix.length);
  }
  return null;
}

function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (parsed.necessary !== true) return null;
    if (typeof parsed.analytics !== "boolean") return null;
    if (typeof parsed.updatedAt !== "string") return null;
    return parsed as ConsentState;
  } catch {
    return null;
  }
}

function persistConsent(consent: ConsentState) {
  const serialized = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${CONSENT_COOKIE_NAME}=${serialized}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
}

function getInitialConsent(): ConsentState | null {
  const fromCookie = parseConsent(getCookieValue(CONSENT_COOKIE_NAME));
  if (fromCookie) return fromCookie;

  if (typeof window === "undefined") return null;
  const fromStorage = parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  if (fromStorage) return fromStorage;

  return null;
}

export function CookieConsent({ locale }: { locale: string }) {
  const resolvedLocale = useMemo<Locale>(() => (isLocale(locale) ? locale : "en"), [locale]);
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document === "undefined") return false;
    return !getInitialConsent();
  });
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => {
    if (typeof document === "undefined") return false;
    return getInitialConsent()?.analytics ?? false;
  });

  function save(analytics: boolean) {
    const next: ConsentState = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics,
      updatedAt: new Date().toISOString()
    };
    persistConsent(next);
    setAnalyticsEnabled(analytics);
    setIsVisible(false);
  }

  if (!isVisible) return null;

  const basePath = `/${resolvedLocale}`;
  const privacyHref = `${basePath}/privacy-policy`;
  const termsHref = `${basePath}/terms`;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-2">
          <div className="font-display text-body font-semibold text-gray-100">{t("cookieConsent.title")}</div>
          <p className="max-w-2xl text-small text-gray-400">{t("cookieConsent.description")}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-small">
            <Link className="text-gray-200 underline-offset-4 hover:underline" href={privacyHref}>
              {t("cookieConsent.privacyPolicy")}
            </Link>
            <Link className="text-gray-200 underline-offset-4 hover:underline" href={termsHref}>
              {t("cookieConsent.terms")}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <Button variant="secondary" onClick={() => save(false)}>
            {t("cookieConsent.rejectNonEssential")}
          </Button>
          <Button onClick={() => save(true)}>{t("cookieConsent.acceptAll")}</Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">{t("cookieConsent.customize")}</Button>
            </DialogTrigger>
            <DialogContent className="border-gray-800 bg-gray-950 text-gray-100">
              <DialogHeader>
                <DialogTitle className="font-display">{t("cookieConsent.dialogTitle")}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  {t("cookieConsent.dialogDescription")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-100">{t("cookieConsent.necessaryLabel")}</div>
                    <div className="text-sm text-gray-400">{t("cookieConsent.necessaryDescription")}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      aria-label="Essential cookies"
                      type="checkbox"
                      checked
                      disabled
                      className="h-4 w-4 accent-gray-200"
                    />
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-100">{t("cookieConsent.analyticsLabel")}</div>
                    <div className="text-sm text-gray-400">{t("cookieConsent.analyticsDescription")}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      aria-label="Analytics cookies"
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(event) => setAnalyticsEnabled(event.currentTarget.checked)}
                      className="h-4 w-4 accent-gray-200"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-2">
                <Button variant="secondary" onClick={() => save(false)}>
                  {t("cookieConsent.rejectNonEssential")}
                </Button>
                <Button onClick={() => save(analyticsEnabled)}>{t("cookieConsent.savePreferences")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
