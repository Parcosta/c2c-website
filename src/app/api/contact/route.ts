import { NextResponse } from "next/server";

import { buildSiteSettingsQuery } from "@/sanity/queries";
import { client } from "@/sanity/client";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import {
  buildContactFormNotificationEmail,
  buildContactFormReceiptEmail,
  sendEmail
} from "@/lib/email";

export const runtime = "nodejs";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  locale?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function getContactToEmail(locale: Locale): Promise<string | null> {
  try {
    const definition = buildSiteSettingsQuery(locale);
    const settings = await client.fetch(definition.query, definition.params);
    if (settings?.contactEmail && isNonEmptyString(settings.contactEmail)) return settings.contactEmail.trim();
  } catch {
    // Ignore and fallback to env.
  }

  const fallback = process.env.CONTACT_TO_EMAIL;
  return isNonEmptyString(fallback) ? fallback.trim() : null;
}

export async function POST(req: Request) {
  let json: ContactRequestBody;
  try {
    json = (await req.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = isNonEmptyString(json.name) ? json.name.trim() : null;
  const email = isNonEmptyString(json.email) ? json.email.trim() : null;
  const message = isNonEmptyString(json.message) ? json.message.trim() : null;

  const localeRaw = isNonEmptyString(json.locale) ? json.locale.trim() : null;
  const locale = localeRaw && isLocale(localeRaw) ? localeRaw : defaultLocale;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, message." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const contactToEmail = await getContactToEmail(locale);
  if (!contactToEmail) {
    return NextResponse.json(
      { error: "Contact destination email is not configured." },
      { status: 500 }
    );
  }

  try {
    const notification = buildContactFormNotificationEmail({ name, email, message });
    await sendEmail({
      to: contactToEmail,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      replyTo: email
    });

    const receipt = buildContactFormReceiptEmail({ name, message });
    await sendEmail({
      to: email,
      subject: receipt.subject,
      html: receipt.html,
      text: receipt.text,
      replyTo: contactToEmail
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email. Please try again later.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

