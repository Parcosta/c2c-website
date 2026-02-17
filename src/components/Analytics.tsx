import Script from "next/script";

function getAnalyticsConfig() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (gaId) return { provider: "ga" as const, gaId };
  if (plausibleDomain) return { provider: "plausible" as const, plausibleDomain };
  return { provider: null as const };
}

export function Analytics() {
  const config = getAnalyticsConfig();

  if (config.provider === "ga") {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${config.gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${config.gaId}', { send_page_view: false });
`}
        </Script>
      </>
    );
  }

  if (config.provider === "plausible") {
    return (
      <Script
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
        defer
        data-domain={config.plausibleDomain}
      />
    );
  }

  return null;
}

