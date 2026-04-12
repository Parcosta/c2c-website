// Navigation items use translation keys instead of hardcoded labels
// The actual labels are sourced from Sanity via the uiContent document type
export type NavItem = {
  labelKey: string;
  href: string;
};

export const navItems: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.portfolio", href: "/portfolio" },
  { labelKey: "nav.services", href: "/services" },
  { labelKey: "nav.press", href: "/press" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.contact", href: "/contact" }
];
