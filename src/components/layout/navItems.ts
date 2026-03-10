export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Press", href: "/press" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];
