"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import type { ReactNode } from "react";

import i18n from "@/i18n";
import type { Locale } from "@/lib/i18n";

interface I18nProviderProps {
  children: ReactNode;
  locale: string;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const resolvedLocale = locale as Locale;

    // Change language and wait for resources to load
    const changeLanguage = async () => {
      if (i18n.language !== resolvedLocale) {
        await i18n.changeLanguage(resolvedLocale);
      }
      // Mark as ready once language is set
      setIsReady(true);
    };

    changeLanguage();
  }, [locale]);

  // During SSR and initial client render, show children without translations
  // They will hydrate and then useEffect will trigger re-render with translations
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
