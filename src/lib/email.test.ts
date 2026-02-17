import { beforeEach, describe, expect, it, vi } from "vitest";

const resendMocks = vi.hoisted(() => ({
  send: vi.fn(),
  Resend: vi.fn()
}));

vi.mock("resend", () => ({
  Resend: class {
    constructor(...args: unknown[]) {
      resendMocks.Resend(...args);
    }
    emails = { send: resendMocks.send };
  }
}));

import {
  buildBookingConfirmationEmail,
  buildContactFormNotificationEmail,
  buildContactFormReceiptEmail,
  sendEmail
} from "@/lib/email";

describe("email templates", () => {
  it("buildContactFormReceiptEmail escapes HTML and preserves line breaks", () => {
    const receipt = buildContactFormReceiptEmail({
      name: "A <b>name</b>",
      message: "Hello\n<script>alert(1)</script>"
    });

    expect(receipt.subject).toBe("We received your message");
    expect(receipt.html).toContain("A &lt;b&gt;name&lt;/b&gt;");
    expect(receipt.html).toContain("Hello<br />&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(receipt.text).toContain("Hello");
  });

  it("buildBookingConfirmationEmail includes reference and optional details", () => {
    const email = buildBookingConfirmationEmail({
      name: "Sam",
      bookingReference: "BK-123",
      details: "Date: 2026-02-17\nTime: 19:00"
    });

    expect(email.subject).toContain("BK-123");
    expect(email.html).toContain("BK-123");
    expect(email.html).toContain("Date: 2026-02-17<br />Time: 19:00");
    expect(email.text).toContain("Reference: BK-123");
  });

  it("buildContactFormNotificationEmail includes sender info", () => {
    const email = buildContactFormNotificationEmail({
      name: "Taylor",
      email: "taylor@example.com",
      message: "Hey there"
    });

    expect(email.subject).toContain("Taylor");
    expect(email.html).toContain("taylor@example.com");
    expect(email.text).toContain("Message:");
  });
});

describe("sendEmail", () => {
  beforeEach(() => {
    resendMocks.send.mockReset();
    resendMocks.Resend.mockClear();
    process.env.RESEND_API_KEY = "re_test_key";
    delete process.env.RESEND_FROM;
  });

  it("calls Resend with expected payload", async () => {
    resendMocks.send.mockResolvedValue({ data: { id: "email_123" }, error: null });

    const data = await sendEmail({
      to: "user@example.com",
      subject: "Hello",
      html: "<p>Test</p>",
      text: "Test",
      replyTo: "reply@example.com"
    });

    expect(resendMocks.Resend).toHaveBeenCalledWith("re_test_key");
    expect(resendMocks.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "user@example.com",
        subject: "Hello",
        replyTo: "reply@example.com"
      })
    );
    expect(data).toEqual({ id: "email_123" });
  });

  it("throws when Resend returns an error", async () => {
    resendMocks.send.mockResolvedValue({ data: null, error: { message: "nope" } });

    await expect(
      sendEmail({
        to: "user@example.com",
        subject: "Hello",
        html: "<p>Test</p>"
      })
    ).rejects.toThrow("nope");
  });
});
