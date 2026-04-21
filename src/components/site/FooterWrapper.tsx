import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SocialIconLink, type SocialNetwork } from "@/components/site/SocialIconLink";
import type { Locale } from "@/lib/locale";
import { isSanityConfigured } from "@/sanity/config";
import { sanityFetch } from "@/sanity/fetch";
import { buildSiteLabelsQuery, buildSiteSettingsQuery } from "@/sanity/queries";

interface FooterWrapperProps {
  locale: Locale;
}

const SUPPORTED_NETWORKS: ReadonlySet<string> = new Set<SocialNetwork>([
  "x", "facebook", "spotify", "instagram", "youtube", "bandcamp", "soundcloud"
]);

const PLATFORM_LABELS: Record<SocialNetwork, string> = {
  x: "X (Twitter)",
  facebook: "Facebook",
  spotify: "Spotify",
  instagram: "Instagram",
  youtube: "YouTube",
  bandcamp: "Bandcamp",
  soundcloud: "SoundCloud"
};

export async function FooterWrapper({ locale }: FooterWrapperProps) {
  const [labels, settings] = isSanityConfigured()
    ? await Promise.all([
        sanityFetch(buildSiteLabelsQuery(locale)),
        sanityFetch(buildSiteSettingsQuery(locale))
      ])
    : [null, null];

  const socialLinks = (settings?.socialLinks ?? [])
    .filter(
      (link): link is { platform: string; url: string } =>
        typeof link.platform === "string" &&
        SUPPORTED_NETWORKS.has(link.platform) &&
        typeof link.url === "string" &&
        link.url.length > 0
    )
    .map((link) => ({
      network: link.platform as SocialNetwork,
      label: PLATFORM_LABELS[link.platform as SocialNetwork] ?? link.platform,
      href: link.url
    }));

  const currentYear = new Date().getFullYear();
  const legalLinkClass =
    "font-display text-xs font-medium uppercase tracking-wide text-gray-500 transition-colors hover:text-gray-100";

  return (
    <footer>
      <Container>
        <div data-block="content" className="flex flex-col border border-gray-900">
          <div className="flex flex-col items-start justify-between gap-4 px-6 py-4 md:flex-row md:items-center">
            <p
              className="font-display text-xs font-semibold tracking-wide text-gray-100"
              data-testid="site-footer"
            >
              {labels?.footer?.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="font-display text-xs font-medium uppercase tracking-wide text-gray-100 transition-colors hover:text-gray-50"
              >
                {labels?.footer?.contact ?? labels?.navigation?.contact}
              </Link>
              {socialLinks.length > 0 && (
              <ul
                className="flex items-center gap-4"
                aria-label={labels?.footer?.follow ?? "Social media"}
              >
                {socialLinks.map(({ network, label, href }) => (
                  <li key={network}>
                    <SocialIconLink network={network} href={href} label={label} />
                  </li>
                ))}
              </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-900 px-6 py-3 text-xs md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-gray-500">
              © {currentYear} {settings?.siteName ?? labels?.brand ?? ""}
            </p>
            <nav
              className="flex flex-wrap items-center gap-5"
              aria-label={labels?.navigation?.footerAriaLabel}
            >
              <Link href={`/${locale}/booking`} className={legalLinkClass}>
                {labels?.navigation?.booking}
              </Link>
              <Link href={`/${locale}/privacy-policy`} className={legalLinkClass}>
                {labels?.navigation?.privacyPolicy}
              </Link>
              <Link href={`/${locale}/terms`} className={legalLinkClass}>
                {labels?.navigation?.terms}
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}
