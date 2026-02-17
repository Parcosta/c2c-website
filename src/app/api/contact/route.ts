import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/email/sendContactEmail";
import { createFixedWindowRateLimiter } from "@/lib/rateLimit";
import { contactFormSchema } from "@/lib/validation";

export const __contactRateLimiter = createFixedWindowRateLimiter({
  limit: 5,
  windowMs: 60_000
});

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const rateCheck = __contactRateLimiter.check(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { ok: false, error: { code: "RATE_LIMITED" } },
      { status: 429 }
    );
  }

  const raw = await request.json().catch(() => null);
  if (!raw) {
    return NextResponse.json(
      { ok: false, error: { code: "INVALID_JSON" } },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: { code: "VALIDATION_ERROR", issues: parsed.error.issues } },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail({
      data: parsed.data,
      clientIp: ip,
      userAgent: request.headers.get("user-agent")
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "EMAIL_SEND_FAILED" } },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
