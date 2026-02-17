"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import {
  defaultLocale,
  getLocaleFromPathname,
  locales,
  switchLocaleInPathname,
  type Locale
} from "@/lib/i18n";

type FooterProps = ComponentPropsWithoutRef<"footer"> & {
  contactEmail?: string;
};

type FooterLink = {
  labelKey:
    | "nav.home"
    | "nav.portfolio"
    | "nav.services"
    | "nav.press"
    | "nav.about"
    | "nav.contact";
  href: (locale: Locale) => string;
};

const navLinks: FooterLink[] = [
  { labelKey: "nav.home", href: (locale) => `/${locale}` },
  { labelKey: "nav.portfolio", href: (locale) => `/${locale}/portfolio` },
  { labelKey: "nav.services", href: (locale) => `/${locale}/services` },
  { labelKey: "nav.press", href: (locale) => `/${locale}/press` },
  { labelKey: "nav.about", href: (locale) => `/${locale}/about` },
  { labelKey: "nav.contact", href: (locale) => `/${locale}/contact` }
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/c2c", Icon: InstagramIcon },
  { label: "SoundCloud", href: "https://soundcloud.com/c2c", Icon: SoundCloudIcon },
  { label: "Spotify", href: "https://open.spotify.com/artist/c2c", Icon: SpotifyIcon },
  { label: "YouTube", href: "https://youtube.com/c2c", Icon: YouTubeIcon }
] as const;

export function Footer({ className, contactEmail = "contact@c2c.com", ...props }: FooterProps) {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const { t } = useTranslation();

  const languageLinks = useMemo(
    () =>
      locales.map((targetLocale) => ({
        locale: targetLocale,
        href: switchLocaleInPathname(pathname, targetLocale)
      })),
    [pathname]
  );

  const year = new Date().getFullYear();

  return (
    <footer className={cn("bg-gray-950", className)} {...props}>
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand & Contact Column */}
          <div className="space-y-6 md:col-span-4">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-small font-semibold text-gray-950">
                C2C
              </span>
              <span className="font-display text-body font-semibold text-gray-100">
                Coast2Coast
              </span>
            </Link>

            <div className="space-y-2">
              <div className="text-small font-medium text-gray-200">{t("footer.contact")}</div>
              <a
                className="text-small text-gray-400 underline underline-offset-4 transition-colors hover:text-gray-200"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <nav aria-label="Footer" className="md:col-span-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.labelKey}
                  href={item.href(locale)}
                  className="text-small text-gray-400 underline underline-offset-4 transition-colors hover:text-gray-200"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          </nav>

          {/* Language & Social Column */}
          <div className="space-y-8 md:col-span-4">
            {/* Language Switcher */}
            <div className="space-y-3">
              <div className="text-small font-medium text-gray-200">{t("footer.language")}</div>
              <div className="flex items-center gap-3">
                {languageLinks.map((item) => {
                  const isActive = item.locale === locale;
                  return (
                    <Link
                      key={item.locale}
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-small font-medium transition-colors",
                        isActive
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-900 hover:text-gray-200"
                      )}
                    >
                      {item.locale.toUpperCase()}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <div className="text-small font-medium text-gray-200">{t("footer.follow")}</div>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 text-gray-400 transition-all hover:border-gray-600 hover:bg-gray-800 hover:text-gray-200"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-gray-800 pt-8 text-small text-gray-400 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <div>
            © {year} Coast2Coast. {t("footer.rights")}
          </div>
          <div className="text-gray-600">Modular techno & DJ sets</div>
        </div>
      </Container>
    </footer>
  );
}

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 4a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5Zm5.2-2.4a1.1 1.1 0 1 1-2.2 0a1.1 1.1 0 0 1 2.2 0Z"
      />
    </svg>
  );
}

function SoundCloudIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.2 12.4c-.4 0-.7.3-.7.7v4.2c0 .4.3.7.7.7s.7-.3.7-.7v-4.2c0-.4-.3-.7-.7-.7Zm2.4-2.6c-.4 0-.7.3-.7.7v6.8c0 .4.3.7.7.7s.7-.3.7-.7v-6.8c0-.4-.3-.7-.7-.7Zm2.5-1.5c-.4 0-.7.3-.7.7v8.3c0 .4.3.7.7.7s.7-.3.7-.7V9c0-.4-.3-.7-.7-.7Zm2.5 1.1c-.4 0-.7.3-.7.7v7.2c0 .4.3.7.7.7h4.8a3.6 3.6 0 0 0 .5-7.2a4.8 4.8 0 0 0-9.1-1.9c-.2.5 0 1 .5 1.1c.4.1.8-.1.9-.5a3.2 3.2 0 0 1 6.2 1c0 .4.3.7.7.7h.5a2.1 2.1 0 1 1 0 4.2h-4.8Z"
      />
    </svg>
  );
}

function SpotifyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20Zm4.6 14.4a.9.9 0 0 1-1.2.3c-2.7-1.6-6.1-2-10.1-1.1a.9.9 0 0 1-.4-1.8c4.4-1 8.2-.6 11.4 1.3c.4.2.5.8.3 1.3Zm.9-3a1 1 0 0 1-1.4.4c-3.1-1.9-7.8-2.4-11.4-1.3a1 1 0 1 1-.6-1.9c4.1-1.2 9.3-.6 12.9 1.6c.5.3.6.9.5 1.2Zm.1-3.2c-3.7-2.2-9.8-2.4-13.3-1.3a1.1 1.1 0 1 1-.7-2.1c4.1-1.3 11-1 15.4 1.6a1.1 1.1 0 0 1-1.4 1.8Z"
      />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5A3 3 0 0 0 2.4 7.2A31.3 31.3 0 0 0 2 12a31.3 31.3 0 0 0 .4 4.8a3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 22 12a31.3 31.3 0 0 0-.4-4.8ZM10.2 15.5V8.5L16 12l-5.8 3.5Z"
      />
    </svg>
  );
}
