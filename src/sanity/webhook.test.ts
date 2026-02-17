import { describe, expect, it } from "vitest";

import { computeSanityWebhookSignature, isValidSanityWebhookSignature } from "@/sanity/webhook";

describe("Sanity webhook signature validation", () => {
  it("accepts a valid signature", () => {
    const secret = "super-secret";
    const body = JSON.stringify({ _type: "page", _id: "abc123", operation: "update" });

    const signature = computeSanityWebhookSignature(body, secret);
    expect(isValidSanityWebhookSignature({ body, secret, signature })).toBe(true);
  });

  it("rejects an invalid signature", () => {
    const secret = "super-secret";
    const body = JSON.stringify({ hello: "world" });

    expect(isValidSanityWebhookSignature({ body, secret, signature: "not-a-real-signature" })).toBe(
      false
    );
  });

  it("accepts signatures with sha256= prefix", () => {
    const secret = "super-secret";
    const body = JSON.stringify({ _type: "event", _id: "evt1" });

    const signature = `sha256=${computeSanityWebhookSignature(body, secret)}`;
    expect(isValidSanityWebhookSignature({ body, secret, signature })).toBe(true);
  });

  it("rejects when signature is missing", () => {
    const secret = "super-secret";
    const body = "{}";

    expect(isValidSanityWebhookSignature({ body, secret, signature: null })).toBe(false);
  });
});
