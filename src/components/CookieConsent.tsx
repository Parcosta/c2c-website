"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

type CookieConsentCopy = {
  title: string;
  description: string;
  acceptAll: string;
  rejectNonEssential: string;
  customize: string;
  dialogTitle: string;
  dialogDescription: string;
  necessaryLabel: string;
  necessaryDescription: string;
  analyticsLabel: string;
  analyticsDescription: string;
  savePreferences: string;
  privacyPolicy: string;
  terms: string;
};

function getCopy(locale: Locale): CookieConsentCopy {
  if (locale === "es") {
    return {
      title: "Cookies y privacidad",
      description:
        "Usamos cookies esenciales para que el sitio funcione y, con tu permiso, cookies de analítica para entender el uso y mejorar la experiencia.",
      acceptAll: "Aceptar todo",
      rejectNonEssential: "Rechazar no esenciales",
      customize: "Preferencias",
      dialogTitle: "Preferencias de cookies",
      dialogDescription: "Puedes cambiar tus preferencias en cualquier momento eliminando las cookies del navegador.",
      necessaryLabel: "Esenciales (siempre activas)",
      necessaryDescription: "Necesarias para la seguridad, la navegación y funciones básicas del sitio.",
      analyticsLabel: "Analítica",
      analyticsDescription: "Ayudan a medir el uso del sitio para mejorar rendimiento y contenido.",
      savePreferences: "Guardar preferencias",
      privacyPolicy: "Política de privacidad",
      terms: "Términos"
    };
  }

  return {
    title: "Cookies & privacy",
    description:
      "We use essential cookies to make the site work and, with your permission, analytics cookies to understand usage and improve the experience.",
    acceptAll: "Accept all",
    rejectNonEssential: "Reject non-essential",
    customize: "Preferences",
    dialogTitle: "Cookie preferences",
    dialogDescription: "You can change your preferences at any time by clearing your browser cookies.",
    necessaryLabel: "Essential (always on)",
    necessaryDescription: "Required for security, navigation, and basic site functionality.",
    analyticsLabel: "Analytics",
    analyticsDescription: "Helps us measure site usage to improve performance and content.",
    savePreferences: "Save preferences",
    privacyPolicy: "Privacy Policy",
    terms: "Terms"
  };
}

export function CookieConsent({ locale }: { locale: string }) {
  const resolvedLocale = useMemo<Locale>(() => (isLocale(locale) ? locale : "en"), [locale]);
  const copy = useMemo(() => getCopy(resolvedLocale), [resolvedLocale]);

  const [isVisible, setIsVisible] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const existing = getInitialConsent();
    if (!existing) {
      setIsVisible(true);
      setAnalyticsEnabled(false);
      return;
    }
    setIsVisible(false);
    setAnalyticsEnabled(existing.analytics);
  }, []);

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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-2">
          <div className="font-display text-base font-semibold text-slate-50">{copy.title}</div>
          <p className="max-w-2xl text-sm text-slate-300">{copy.description}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Link className="text-slate-200 underline-offset-4 hover:underline" href={privacyHref}>
              {copy.privacyPolicy}
            </Link>
            <Link className="text-slate-200 underline-offset-4 hover:underline" href={termsHref}>
              {copy.terms}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <Button variant="secondary" onClick={() => save(false)}>
            {copy.rejectNonEssential}
          </Button>
          <Button onClick={() => save(true)}>{copy.acceptAll}</Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">{copy.customize}</Button>
            </DialogTrigger>
            <DialogContent className="border-slate-800 bg-slate-950 text-slate-50">
              <DialogHeader>
                <DialogTitle className="font-display">{copy.dialogTitle}</DialogTitle>
                <DialogDescription className="text-slate-300">{copy.dialogDescription}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-slate-100">{copy.necessaryLabel}</div>
                    <div className="text-sm text-slate-300">{copy.necessaryDescription}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      aria-label="Essential cookies"
                      type="checkbox"
                      checked
                      disabled
                      className="h-4 w-4 accent-slate-200"
                    />
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-slate-100">{copy.analyticsLabel}</div>
                    <div className="text-sm text-slate-300">{copy.analyticsDescription}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      aria-label="Analytics cookies"
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(event) => setAnalyticsEnabled(event.currentTarget.checked)}
                      className="h-4 w-4 accent-slate-200"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-2">
                <Button variant="secondary" onClick={() => save(false)}>
                  {copy.rejectNonEssential}
                </Button>
                <Button onClick={() => save(analyticsEnabled)}>{copy.savePreferences}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

