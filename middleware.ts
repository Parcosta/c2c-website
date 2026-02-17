import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "es"] as const;
const defaultLocale = "en";

function hasLocalePrefix(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment != null && (locales as readonly string[]).includes(segment);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next")) return NextResponse.next();
  if (pathname.startsWith("/api")) return NextResponse.next();
  if (pathname.startsWith("/studio")) return NextResponse.next();
  if (pathname === "/favicon.ico") return NextResponse.next();
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return NextResponse.next();

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
  matcher: ["/((?!_next|api|studio).*)"]
};

