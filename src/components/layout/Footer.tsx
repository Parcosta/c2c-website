"use client";

import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import {
  defaultLocale,
  getLocaleFromPathname,
  type Locale
} from "@/lib/i18n";

type FooterProps = ComponentPropsWithoutRef<"footer"> & {
  contactEmail?: string;
};

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/c2c" },
  { label: "Facebook", href: "https://facebook.com/c2c" },
  { label: "Twitter", href: "https://twitter.com/c2c" },
  { label: "YouTube", href: "https://youtube.com/c2c" },
  { label: "Bandcamp", href: "https://c2c.bandcamp.com" },
  { label: "SoundCloud", href: "https://soundcloud.com/c2c" }
] as const;

export function Footer({ className, ...props }: FooterProps) {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const { t } = useTranslation();

  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-gray-800", className)} {...props}>
      <Container className="py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Tagline */}
          <p className="text-xs font-semibold text-gray-100">
            {t("footer.tagline")}
          </p>

          {/* Contact Link */}
          <Link
            href={`/${locale}/contact`}
            className="text-xs font-medium text-gray-100 hover:text-gray-300 transition-colors"
          >
            {t("nav.contact")}
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-4 h-4 text-gray-100 hover:text-gray-300 transition-colors"
                aria-label={label}
              >
                <SocialIcon name={label} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "Bandcamp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z" />
        </svg>
      );
    case "SoundCloud":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.09.094s.089-.037.099-.094l.21-1.319-.21-1.334c-.01-.057-.054-.094-.078-.094zm1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.104.106.104.061 0 .12-.045.12-.104l.24-2.474-.255-2.547c0-.06-.045-.104-.106-.104zm.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.138l.24-2.544-.24-2.635c-.015-.075-.06-.135-.166-.135zm.93-.069c-.09 0-.149.075-.165.165l-.18 2.7.195 2.52c.016.09.075.165.165.165.09 0 .165-.075.165-.165l.21-2.52-.21-2.685c0-.09-.075-.165-.18-.165zm.915-.06c-.105 0-.18.09-.195.18l-.165 2.76.18 2.46c.016.105.09.18.195.18.105 0 .18-.09.18-.18l.195-2.46-.195-2.745c-.015-.105-.09-.195-.195-.195zm.93-.015c-.12 0-.195.105-.21.21l-.15 2.79.165 2.385c.015.12.09.21.21.21.105 0 .195-.09.21-.21l.18-2.385-.18-2.79c-.015-.12-.09-.21-.225-.21zm.945-.015c-.135 0-.225.12-.24.24l-.135 2.82.15 2.31c.015.135.105.24.24.24.12 0 .225-.105.24-.24l.165-2.31-.165-2.82c-.015-.135-.105-.24-.255-.24zm.96 0c-.15 0-.255.135-.27.27l-.12 2.82.135 2.265c.015.15.12.27.27.27.135 0 .255-.12.27-.27l.15-2.265-.15-2.82c-.015-.15-.12-.27-.285-.27zm.975.015c-.165 0-.285.15-.3.315l-.105 2.805.12 2.22c.015.165.135.3.3.3.15 0 .285-.135.3-.3l.135-2.22-.135-2.805c-.015-.165-.135-.315-.315-.315zm.99.045c-.18 0-.315.165-.33.345l-.09 2.76.105 2.175c.015.18.15.33.33.33.165 0 .315-.15.33-.33l.12-2.175-.12-2.76c-.015-.18-.15-.345-.345-.345zm1.005.075c-.195 0-.345.18-.36.375l-.075 2.685.09 2.13c.015.195.165.36.36.36.18 0 .345-.165.36-.36l.105-2.13-.105-2.685c-.015-.195-.165-.375-.375-.375zm1.02.105c-.21 0-.375.195-.39.405l-.06 2.61.075 2.085c.015.21.18.375.39.375.195 0 .375-.165.39-.375l.09-2.085-.09-2.61c-.015-.21-.18-.405-.405-.405zm1.02.135c-.225 0-.405.21-.42.435l-.045 2.535.06 2.04c.015.225.195.405.42.405.21 0 .405-.18.42-.405l.075-2.04-.075-2.535c-.015-.225-.195-.435-.435-.435zm1.035.165c-.24 0-.435.225-.45.465l-.03 2.46.045 1.995c.015.24.21.435.45.435.225 0 .435-.195.45-.435l.06-1.995-.06-2.46c-.015-.24-.21-.465-.465-.465zm1.05.195c-.255 0-.465.24-.48.495l-.015 2.385.03 1.95c.015.255.225.465.48.465.24 0 .465-.21.48-.465l.045-1.95-.045-2.385c-.015-.255-.225-.495-.495-.495zm1.065.225c-.27 0-.495.255-.51.525l.015 2.31.015 1.905c.015.27.24.495.51.495.255 0 .495-.225.51-.495l.03-1.905-.03-2.31c-.015-.27-.24-.525-.525-.525zm1.08.255c-.285 0-.525.27-.54.555l.045 2.235.015 1.86c.015.285.255.525.54.525.27 0 .525-.24.54-.525l.015-1.86-.045-2.235c-.015-.285-.255-.555-.555-.555z" />
        </svg>
      );
    default:
      return null;
  }
}
