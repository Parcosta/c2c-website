export type AnalyticsEventProps = Record<string, string | number | boolean | null | undefined>;

type PlausibleEventOptions = {
  props?: Record<string, string>;
  u?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: PlausibleEventOptions) => void;
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

function getProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (gaId) return { provider: "ga" as const, gaId };
  if (plausibleDomain) return { provider: "plausible" as const };
  return { provider: null } as { provider: null };
}

function toUrlParts(input?: string) {
  if (!isBrowser()) return null;
  if (!input) {
    return {
      absolute: window.location.href,
      path: `${window.location.pathname}${window.location.search}`
    };
  }

  const resolved = new URL(input, window.location.href);
  return {
    absolute: resolved.toString(),
    path: `${resolved.pathname}${resolved.search}`
  };
}

function normalizeProps(props?: AnalyticsEventProps) {
  if (!props) return undefined;

  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;
    cleaned[key] = value;
  }

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

function plausibleProps(props?: AnalyticsEventProps) {
  if (!props) return undefined;
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;
    cleaned[key] = String(value);
  }
  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

export function pageView(url?: string) {
  if (!isBrowser()) return;

  const provider = getProvider();
  const parts = toUrlParts(url);
  if (!parts) return;

  if (provider.provider === "ga") {
    window.gtag?.("config", provider.gaId, { page_path: parts.path });
    return;
  }

  if (provider.provider === "plausible") {
    window.plausible?.("pageview", { u: parts.absolute });
  }
}

export function trackEvent(eventName: string, props?: AnalyticsEventProps) {
  if (!isBrowser()) return;

  const provider = getProvider();

  if (provider.provider === "ga") {
    window.gtag?.("event", eventName, normalizeProps(props));
    return;
  }

  if (provider.provider === "plausible") {
    const pProps = plausibleProps(props);
    window.plausible?.(eventName, pProps ? { props: pProps } : undefined);
  }
}

