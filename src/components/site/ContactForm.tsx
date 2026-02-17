"use client";

import { useState } from "react";

import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const [state, setState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, locale })
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  const isSending = state === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-4" data-testid="contact-form">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-200">
          {copy.contact.form.name}
        </label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          data-testid="contact-name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          {copy.contact.form.email}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="contact-email"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-slate-200">
          {copy.contact.form.message}
        </label>
        <Textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          data-testid="contact-message"
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-60"
        data-testid="contact-submit"
      >
        {isSending ? copy.contact.form.sending : copy.contact.form.submit}
      </button>

      {state === "success" ? (
        <p className="text-sm text-emerald-400" data-testid="contact-success">
          {copy.contact.form.success}
        </p>
      ) : null}

      {state === "error" ? (
        <p className="text-sm text-red-400" data-testid="contact-error">
          {copy.contact.form.error}
        </p>
      ) : null}
    </form>
  );
}
