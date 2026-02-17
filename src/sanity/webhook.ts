import { createHmac, timingSafeEqual } from "node:crypto";

function normalizeSignature(signature: string): string {
  const trimmed = signature.trim();
  const withoutPrefix = trimmed.toLowerCase().startsWith("sha256=")
    ? trimmed.slice("sha256=".length)
    : trimmed;
  return withoutPrefix.trim().toLowerCase();
}

export function computeSanityWebhookSignature(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body, "utf8").digest("hex");
}

export function isValidSanityWebhookSignature(input: {
  body: string;
  secret: string;
  signature: string | null;
}): boolean {
  if (!input.signature) return false;

  const expected = computeSanityWebhookSignature(input.body, input.secret);
  const actual = normalizeSignature(input.signature);

  const expectedBuf = Buffer.from(expected, "utf8");
  const actualBuf = Buffer.from(actual, "utf8");

  if (expectedBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(expectedBuf, actualBuf);
}
