import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/email/sendContactEmail";
import { createInMemoryRateLimiter } from "@/lib/rateLimit";
import { contactFormSchema } from "@/lib/validation";

export const runtime = "nodejs";

export const __contactRateLimiter = createInMemoryRateLimiter({
  name: "api:contact",
  limit: 5,
  windowMs: 10 * 60 * 1000
});

function getClientIp(request: Request): string | null {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) return xForwardedFor.split(",")[0]?.trim() ?? null;
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();
  return null;
}

function rateLimitHeaders(result: ReturnType<typeof __contactRateLimiter.check>) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.floor(result.resetAtMs / 1000))
  };
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request) ?? "unknown";
  const rate = __contactRateLimiter.check(clientIp);

  if (!rate.allowed) {
    const retryAfter = rate.retryAfterSeconds ?? 0;
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "RATE_LIMITED",
          message: "Too many requests. Please try again later."
        }
      },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(rate),
          "Retry-After": String(retryAfter)
        }
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_JSON",
          message: "Request body must be valid JSON."
        }
      },
      { status: 400, headers: rateLimitHeaders(rate) }
    );
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid form submission.",
          fieldErrors: flattened.fieldErrors,
          formErrors: flattened.formErrors
        }
      },
      { status: 400, headers: rateLimitHeaders(rate) }
    );
  }

  try {
    await sendContactEmail({
      data: parsed.data,
      clientIp: clientIp === "unknown" ? null : clientIp,
      userAgent: request.headers.get("user-agent")
    });
    return NextResponse.json(
      { ok: true },
      {
        status: 200,
        headers: rateLimitHeaders(rate)
      }
    );
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "EMAIL_FAILED",
          message: "Failed to send message. Please try again later."
        }
      },
      { status: 500, headers: rateLimitHeaders(rate) }
    );
  }
}

