import type { Locale } from "@/lib/i18n";

export type NavItem = {
  label: string;
  href: (locale: Locale) => string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: (locale) => `/${locale}` },
  { label: "Portfolio", href: (locale) => `/${locale}/portfolio` },
  { label: "Services", href: (locale) => `/${locale}/services` },
  { label: "Press", href: (locale) => `/${locale}/press` },
  { label: "About", href: (locale) => `/${locale}/about` },
  { label: "Contact", href: (locale) => `/${locale}/contact` }
];

