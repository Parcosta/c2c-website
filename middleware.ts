import { NextResponse, type NextRequest } from "next/server";
import { createInMemoryRateLimiter } from "./src/lib/rateLimit";

const apiRateLimiter = createInMemoryRateLimiter({
  name: "api",
  limit: 60,
  windowMs: 60_000
});

const locales = ["en", "es"] as const;
const defaultLocale = "en";

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();
  return request.ip ?? firstForwardedIp ?? request.headers.get("cf-connecting-ip") ?? "unknown";
}

function getLocaleFromRequest(request: NextRequest): string {
  // Detect browser language from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(",")[0].split("-")[0];
    if (locales.includes(browserLocale as (typeof locales)[number])) {
      return browserLocale;
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and special routes
  if (pathname.startsWith("/_next")) return NextResponse.next();
  if (pathname.startsWith("/studio")) return NextResponse.next();
  if (pathname === "/favicon.ico") return NextResponse.next();
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return NextResponse.next();

  // API rate limiting
  if (pathname.startsWith("/api")) {
    const ip = getClientIp(request);
    const result = apiRateLimiter.check(ip);

    if (!result.allowed) {
      return NextResponse.json(
        { error: "Too Many Requests" },
        {
          status: 429,
          headers: {
            "Retry-After": String(result.retryAfterSeconds),
            "X-RateLimit-Limit": String(result.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(result.resetAtMs / 1000))
          }
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", String(result.limit));
    response.headers.set("X-RateLimit-Remaining", String(result.remaining));
    response.headers.set("X-RateLimit-Reset", String(Math.ceil(result.resetAtMs / 1000)));
    return response;
  }

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to locale-prefixed URL
  const locale = getLocaleFromRequest(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|studio|api|favicon.ico).*)"]
};
