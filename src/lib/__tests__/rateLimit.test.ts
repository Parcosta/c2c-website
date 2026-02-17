import { describe, expect, it } from "vitest";

import { createFixedWindowRateLimiter } from "../rateLimit";

describe("createFixedWindowRateLimiter", () => {
  it("allows requests up to the limit and blocks after", () => {
    const limiter = createFixedWindowRateLimiter({ limit: 2, windowMs: 1000 });

    const r1 = limiter.check("1.2.3.4", 0);
    expect(r1.allowed).toBe(true);
    expect(r1.limit).toBe(2);
    expect(r1.remaining).toBe(1);

    const r2 = limiter.check("1.2.3.4", 10);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(0);

    const r3 = limiter.check("1.2.3.4", 20);
    expect(r3.allowed).toBe(false);
    expect(r3.remaining).toBe(0);
    expect(r3.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("resets after the window expires", () => {
    const limiter = createFixedWindowRateLimiter({ limit: 1, windowMs: 1000 });

    expect(limiter.check("ip", 0).allowed).toBe(true);
    expect(limiter.check("ip", 1).allowed).toBe(false);

    expect(limiter.check("ip", 1001).allowed).toBe(true);
  });
});

