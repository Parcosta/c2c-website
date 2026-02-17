import { Resend } from "resend";

import type { ContactFormInput } from "@/lib/validation";

export type SendContactEmailParams = Readonly<{
  data: ContactFormInput;
  clientIp: string | null;
  userAgent: string | null;
}>;

export async function sendContactEmail(params: SendContactEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO;
  const from = process.env.CONTACT_FORM_FROM;

  if (!apiKey || !to || !from) return;

  const { data, clientIp, userAgent } = params;

  const resend = new Resend(apiKey);

  const subject = `New contact form submission: ${data.name}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Company: ${data.company}` : null,
    data.locale ? `Locale: ${data.locale}` : null,
    clientIp ? `IP: ${clientIp}` : null,
    userAgent ? `User-Agent: ${userAgent}` : null,
    "",
    "Message:",
    data.message
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");

  const html = `
    <div>
      <h2>New contact form submission</h2>
      <ul>
        <li><strong>Name</strong>: ${escapeHtml(data.name)}</li>
        <li><strong>Email</strong>: ${escapeHtml(data.email)}</li>
        ${data.phone ? `<li><strong>Phone</strong>: ${escapeHtml(data.phone)}</li>` : ""}
        ${data.company ? `<li><strong>Company</strong>: ${escapeHtml(data.company)}</li>` : ""}
        ${data.locale ? `<li><strong>Locale</strong>: ${escapeHtml(data.locale)}</li>` : ""}
        ${clientIp ? `<li><strong>IP</strong>: ${escapeHtml(clientIp)}</li>` : ""}
        ${userAgent ? `<li><strong>User-Agent</strong>: ${escapeHtml(userAgent)}</li>` : ""}
      </ul>
      <p><strong>Message</strong>:</p>
      <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(
        data.message
      )}</pre>
    </div>
  `.trim();

  return await resend.emails.send({
    from,
    to,
    subject,
    text,
    html,
    replyTo: data.email
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
