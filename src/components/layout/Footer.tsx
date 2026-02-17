"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { defaultLocale, getLocaleFromPathname, locales, switchLocaleInPathname, type Locale } from "@/lib/i18n";

type FooterProps = ComponentPropsWithoutRef<"footer"> & {
  contactEmail?: string;
};

type FooterLink = {
  label: string;
  href: (locale: Locale) => string;
};

const navLinks: FooterLink[] = [
  { label: "Home", href: (locale) => `/${locale}` },
  { label: "Portfolio", href: (locale) => `/${locale}/portfolio` },
  { label: "Services", href: (locale) => `/${locale}/services` },
  { label: "Press", href: (locale) => `/${locale}/press` },
  { label: "About", href: (locale) => `/${locale}/about` },
  { label: "Contact", href: (locale) => `/${locale}/contact` }
];

const socialLinks = [
  { label: "Instagram", href: "https://example.com/instagram", Icon: InstagramIcon },
  { label: "SoundCloud", href: "https://example.com/soundcloud", Icon: SoundCloudIcon },
  { label: "Spotify", href: "https://example.com/spotify", Icon: SpotifyIcon },
  { label: "YouTube", href: "https://example.com/youtube", Icon: YouTubeIcon }
] as const;

export function Footer({ className, contactEmail = "contact@c2c.com", ...props }: FooterProps) {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;

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
    <footer
      className={cn("border-t border-slate-800 bg-slate-950/60 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40", className)}
      {...props}
    >
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-4">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-accent text-sm font-semibold text-slate-950">
                C2C
              </span>
              <span className="font-display text-base font-semibold tracking-tight text-slate-50">C2C</span>
            </Link>

            <div className="space-y-1 text-sm text-slate-300">
              <div className="font-medium text-slate-200">Contact</div>
              <a
                className="inline-flex items-center gap-2 underline-offset-4 hover:text-slate-50 hover:underline"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-5">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href(locale)}
                  className="text-sm text-slate-300 underline-offset-4 hover:text-slate-50 hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="space-y-5 md:col-span-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-200">Language</div>
              <div className="flex items-center gap-2">
                {languageLinks.map((item) => {
                  const isActive = item.locale === locale;
                  return (
                    <Link
                      key={item.locale}
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "rounded-md px-2 py-1 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-slate-800 text-slate-50"
                          : "text-slate-300 hover:bg-slate-900 hover:text-slate-50"
                      )}
                    >
                      {item.locale.toUpperCase()}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-200">Follow</div>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 bg-slate-900/30 text-slate-200 transition-colors hover:border-slate-700 hover:bg-slate-900/60 hover:text-slate-50"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© {year} C2C. All rights reserved.</div>
          <div className="text-slate-500">Built with a dark-first design system.</div>
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
