import { NextResponse, type NextRequest } from "next/server";
import { createFixedWindowRateLimiter } from "./src/lib/rateLimit";

const locales = ["en", "es"] as const;
const defaultLocale = "en";

const apiRateLimiter = createFixedWindowRateLimiter({
  limit: 60,
  windowMs: 60_000
});

function hasLocalePrefix(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment != null && (locales as readonly string[]).includes(segment);
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();
  return request.ip ?? firstForwardedIp ?? request.headers.get("cf-connecting-ip") ?? "unknown";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next")) return NextResponse.next();
  if (pathname.startsWith("/studio")) return NextResponse.next();
  if (pathname === "/favicon.ico") return NextResponse.next();
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return NextResponse.next();

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
            "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000))
          }
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", String(result.limit));
    response.headers.set("X-RateLimit-Remaining", String(result.remaining));
    response.headers.set("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));
    return response;
  }

  if (hasLocalePrefix(pathname)) {
    const segment = pathname.split("/").filter(Boolean)[0] ?? defaultLocale;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", segment);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("x-locale", defaultLocale);
  return response;
}

export const config = {
  matcher: ["/((?!_next|studio).*)"]
};

