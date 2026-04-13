import type { Locale } from "@/lib/i18n";

export type NavItem = {
  label: string;
  href: (locale: Locale) => string;
};

export const navItems: NavItem[] = [
  { label: "nav.home", href: (locale) => `/${locale}` },
  { label: "nav.services", href: (locale) => `/${locale}/services` },
  { label: "nav.about", href: (locale) => `/${locale}/about` },
  { label: "nav.store", href: (locale) => `/${locale}/store` }
];

export const navItemsFull: NavItem[] = [
  { label: "nav.home", href: (locale) => `/${locale}` },
  { label: "nav.portfolio", href: (locale) => `/${locale}/portfolio` },
  { label: "nav.services", href: (locale) => `/${locale}/services` },
  { label: "nav.press", href: (locale) => `/${locale}/press` },
  { label: "nav.about", href: (locale) => `/${locale}/about` },
  { label: "nav.contact", href: (locale) => `/${locale}/contact` }
];
