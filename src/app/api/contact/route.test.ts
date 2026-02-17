import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/email/sendContactEmail", () => ({
  sendContactEmail: vi.fn().mockResolvedValue({ id: "email_123" })
}));

import { sendContactEmail } from "@/lib/email/sendContactEmail";

import { POST, __contactRateLimiter } from "./route";

describe("POST /api/contact", () => {
  beforeEach(() => {
    __contactRateLimiter.reset();
    vi.clearAllMocks();
  });

  it("returns 400 for invalid JSON", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "203.0.113.10"
      },
      body: "{"
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json).toMatchObject({ ok: false, error: { code: "INVALID_JSON" } });
  });

  it("returns 400 for validation errors", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "203.0.113.10"
      },
      body: JSON.stringify({ name: "Ada", email: "ada@example.com" })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json).toMatchObject({ ok: false, error: { code: "VALIDATION_ERROR" } });
  });

  it("sends email and returns 200 for valid submissions", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "203.0.113.10",
        "user-agent": "vitest"
      },
      body: JSON.stringify({
        name: "Ada Lovelace",
        email: "ada@example.com",
        message: "Hello!"
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ ok: true });
    expect(sendContactEmail).toHaveBeenCalledTimes(1);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    const makeRequest = () =>
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "203.0.113.10"
        },
        body: JSON.stringify({
          name: "Ada Lovelace",
          email: "ada@example.com",
          message: "Hello!"
        })
      });

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(makeRequest());
      expect(response.status).toBe(200);
    }

    const limited = await POST(makeRequest());
    expect(limited.status).toBe(429);
    const json = await limited.json();
    expect(json).toMatchObject({ ok: false, error: { code: "RATE_LIMITED" } });
  });
});

