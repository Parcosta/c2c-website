import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { Container } from "@/components/layout/Container";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import { buildSiteLabelsQuery, buildSiteSettingsQuery } from "@/sanity/queries";

interface FooterWrapperProps {
  locale: Locale;
}

export async function FooterWrapper({ locale }: FooterWrapperProps) {
  const [labels, settings] = isSanityConfigured()
    ? await Promise.all([
        sanityFetch(buildSiteLabelsQuery(locale)),
        sanityFetch(buildSiteSettingsQuery(locale))
      ])
    : [null, null];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 py-10">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-sm text-gray-400" data-testid="site-footer">
            © {currentYear} {settings?.siteName ?? labels?.brand ?? ""}
          </p>

          {/* Footer Navigation */}
          <nav
            className="flex flex-wrap items-center gap-4 text-sm"
            aria-label={labels?.navigation?.footerAriaLabel}
          >
            <Link
              href={`/${locale}/booking`}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {labels?.navigation?.booking}
            </Link>
            <Link
              href={`/${locale}/privacy-policy`}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {labels?.navigation?.privacyPolicy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {labels?.navigation?.terms}
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
