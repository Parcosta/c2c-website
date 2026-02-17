import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { isValidSanityWebhookSignature } from "@/sanity/webhook";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing SANITY_WEBHOOK_SECRET." }, { status: 500 });
  }

  const signature = req.headers.get("x-sanity-signature");
  const body = await req.text();

  const valid = isValidSanityWebhookSignature({ body, secret, signature });
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  revalidateTag("sanity", "default");

  return NextResponse.json({ revalidated: true, tag: "sanity" }, { status: 200 });
}

