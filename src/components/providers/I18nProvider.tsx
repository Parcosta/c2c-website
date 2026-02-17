"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import type { ReactNode } from "react";

import i18n from "@/i18n";
import type { Locale } from "@/lib/i18n";

interface I18nProviderProps {
  children: ReactNode;
  locale: string;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  // Set the language when the locale changes
  useEffect(() => {
    const resolvedLocale = locale as Locale;
    if (i18n.language !== resolvedLocale) {
      i18n.changeLanguage(resolvedLocale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
