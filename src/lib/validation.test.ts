import { describe, expect, it } from "vitest";

import { contactFormSchema } from "@/lib/validation";

describe("contactFormSchema", () => {
  it("accepts a valid payload", () => {
    const parsed = contactFormSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hello!",
      phone: "  ",
      company: "",
      locale: "en"
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(parsed.data.phone).toBeUndefined();
    expect(parsed.data.company).toBeUndefined();
  });

  it("rejects invalid email", () => {
    const parsed = contactFormSchema.safeParse({
      name: "Ada",
      email: "not-an-email",
      message: "Hello!"
    });
    expect(parsed.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const parsed = contactFormSchema.safeParse({ email: "a@b.com" });
    expect(parsed.success).toBe(false);
  });
});

