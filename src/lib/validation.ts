import { z } from "zod";

function emptyStringToUndefined(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}

function optionalString(options: { max: number }) {
  return z.preprocess(emptyStringToUndefined, z.string().trim().min(1).max(options.max).optional());
}

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Email must be valid").max(254, "Email is too long"),
  message: z.string().trim().min(1, "Message is required").max(4000, "Message is too long"),
  phone: optionalString({ max: 30 }),
  company: optionalString({ max: 100 }),
  locale: z.enum(["en", "es"]).optional()
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
