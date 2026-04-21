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

  const footerLinkClass =
    "font-display text-small font-medium uppercase tracking-wide text-gray-400 transition-colors hover:text-gray-50";

  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-6 border border-gray-900 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-small text-gray-400" data-testid="site-footer">
            © {currentYear} {settings?.siteName ?? labels?.brand ?? ""}
          </p>

          <nav
            className="flex flex-wrap items-center gap-6"
            aria-label={labels?.navigation?.footerAriaLabel}
          >
            <Link href={`/${locale}/booking`} className={footerLinkClass}>
              {labels?.navigation?.booking}
            </Link>
            <Link href={`/${locale}/privacy-policy`} className={footerLinkClass}>
              {labels?.navigation?.privacyPolicy}
            </Link>
            <Link href={`/${locale}/terms`} className={footerLinkClass}>
              {labels?.navigation?.terms}
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
