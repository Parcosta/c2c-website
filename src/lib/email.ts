import { Resend } from "resend";

export type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

export type ContactFormReceiptEmailProps = {
  name: string;
  message: string;
};

export type BookingConfirmationEmailProps = {
  name: string;
  bookingReference: string;
  details?: string;
};

export type ContactFormNotificationEmailProps = {
  name: string;
  email: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeHtmlWithLineBreaks(value: string): string {
  return escapeHtml(value).replaceAll(/\r\n|\n|\r/g, "<br />");
}

function buildBaseHtml({ title, body }: { title: string; body: string }): string {
  const safeTitle = escapeHtml(title);
  return [
    '<div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #0f172a;">',
    `<h1 style="margin: 0 0 12px; font-size: 18px;">${safeTitle}</h1>`,
    `<div style="font-size: 14px;">${body}</div>`,
    '<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />',
    '<p style="margin: 0; font-size: 12px; color: #64748b;">This is an automated message.</p>',
    "</div>"
  ].join("");
}

export function buildContactFormReceiptEmail(props: ContactFormReceiptEmailProps): EmailTemplate {
  const subject = "We received your message";
  const body = [
    `<p style="margin: 0 0 12px;">Hi ${escapeHtml(props.name)},</p>`,
    "<p style=\"margin: 0 0 12px;\">Thanks for reaching out — we’ll get back to you soon.</p>",
    '<p style="margin: 0 0 6px; font-weight: 600;">Your message:</p>',
    `<p style="margin: 0;">${escapeHtmlWithLineBreaks(props.message)}</p>`
  ].join("");

  return {
    subject,
    html: buildBaseHtml({ title: subject, body }),
    text: `Hi ${props.name},\n\nThanks for reaching out — we’ll get back to you soon.\n\nYour message:\n${props.message}\n`
  };
}

export function buildBookingConfirmationEmail(props: BookingConfirmationEmailProps): EmailTemplate {
  const subject = `Booking confirmed: ${props.bookingReference}`;
  const details = props.details?.trim();

  const body = [
    `<p style="margin: 0 0 12px;">Hi ${escapeHtml(props.name)},</p>`,
    "<p style=\"margin: 0 0 12px;\">Your booking is confirmed.</p>",
    `<p style="margin: 0 0 12px;"><strong>Reference:</strong> ${escapeHtml(props.bookingReference)}</p>`,
    details
      ? `<p style="margin: 0 0 12px;"><strong>Details:</strong><br />${escapeHtmlWithLineBreaks(details)}</p>`
      : ""
  ].join("");

  return {
    subject,
    html: buildBaseHtml({ title: "Booking confirmation", body }),
    text: `Hi ${props.name},\n\nYour booking is confirmed.\nReference: ${props.bookingReference}\n${
      details ? `\nDetails:\n${details}\n` : ""
    }`
  };
}

export function buildContactFormNotificationEmail(props: ContactFormNotificationEmailProps): EmailTemplate {
  const subject = `New contact form message from ${props.name}`;
  const body = [
    `<p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(props.name)}</p>`,
    `<p style="margin: 0 0 12px;"><strong>Email:</strong> ${escapeHtml(props.email)}</p>`,
    '<p style="margin: 0 0 6px; font-weight: 600;">Message:</p>',
    `<p style="margin: 0;">${escapeHtmlWithLineBreaks(props.message)}</p>`
  ].join("");

  return {
    subject,
    html: buildBaseHtml({ title: subject, body }),
    text: `Name: ${props.name}\nEmail: ${props.email}\n\nMessage:\n${props.message}\n`
  };
}

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
};

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }
  return new Resend(apiKey);
}

export async function sendEmail(input: SendEmailInput) {
  const resend = getResendClient();
  const from = input.from ?? process.env.RESEND_FROM ?? "C2C <onboarding@resend.dev>";
  const { data, error } = await resend.emails.send({
    from,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
    replyTo: input.replyTo
  });

  if (error) {
    throw new Error(typeof error === "string" ? error : error.message);
  }

  return data;
}

