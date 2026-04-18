"use client";

import { useState } from "react";

import type { Locale } from "@/lib/locale";
import type { BookingEventTypesValue, BookingFormContentValue } from "@/sanity/queries";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type FormState = "idle" | "sending" | "success" | "error";

type EventType = "live" | "dj" | "corporate" | "private" | "other";

export function BookingForm({
  locale,
  content,
  eventTypesContent
}: {
  locale: Locale;
  content?: BookingFormContentValue;
  eventTypesContent?: BookingEventTypesValue;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState<EventType | "">("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          eventType,
          eventDate,
          location,
          message,
          locale,
          subject: `Booking Request: ${eventType || "General"}`
        })
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  const isSending = state === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-4" data-testid="booking-form">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-200">
          {content?.name}
        </label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          data-testid="booking-name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-200">
          {content?.email}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="booking-email"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="eventType" className="text-sm font-medium text-gray-200">
          {content?.eventType}
        </label>
        <Select
          value={eventType}
          onValueChange={(value) => setEventType(value as EventType)}
          required
        >
          <SelectTrigger data-testid="booking-event-type">
            <SelectValue placeholder={content?.eventType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="live">{eventTypesContent?.live}</SelectItem>
            <SelectItem value="dj">{eventTypesContent?.dj}</SelectItem>
            <SelectItem value="corporate">{eventTypesContent?.corporate}</SelectItem>
            <SelectItem value="private">{eventTypesContent?.private}</SelectItem>
            <SelectItem value="other">{eventTypesContent?.other}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="eventDate" className="text-sm font-medium text-gray-200">
          {content?.eventDate}
        </label>
        <Input
          id="eventDate"
          name="eventDate"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          data-testid="booking-event-date"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium text-gray-200">
          {content?.location}
        </label>
        <Input
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={content?.locationPlaceholder}
          data-testid="booking-location"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-200">
          {content?.message}
        </label>
        <Textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          data-testid="booking-message"
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-4 text-sm font-medium text-gray-950 shadow hover:bg-gray-200 disabled:opacity-60"
        data-testid="booking-submit"
      >
        {isSending ? content?.sending : content?.submit}
      </button>

      {state === "success" ? (
        <p className="text-sm text-emerald-400" data-testid="booking-success">
          {content?.success}
        </p>
      ) : null}

      {state === "error" ? (
        <p className="text-sm text-red-400" data-testid="booking-error">
          {content?.error}
        </p>
      ) : null}
    </form>
  );
}
