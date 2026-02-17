import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CookieConsent } from "./CookieConsent";

const CONSENT_COOKIE_NAME = "c2c_cookie_consent";
const CONSENT_STORAGE_KEY = "c2c_cookie_consent";

function clearConsent() {
  document.cookie = `${CONSENT_COOKIE_NAME}=; Max-Age=0; Path=/`;
  window.localStorage.removeItem(CONSENT_STORAGE_KEY);
}

function getConsentFromStorage(): unknown {
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(decodeURIComponent(raw));
}

describe("CookieConsent", () => {
  it("shows banner when no prior consent exists", async () => {
    clearConsent();
    render(<CookieConsent locale="en" />);
    expect(await screen.findByText("Cookies & privacy")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept all" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject non-essential" })).toBeInTheDocument();
  });

  it("accepts all and persists consent", async () => {
    clearConsent();
    render(<CookieConsent locale="en" />);

    const accept = await screen.findByRole("button", { name: "Accept all" });
    fireEvent.click(accept);

    expect(screen.queryByText("Cookies & privacy")).not.toBeInTheDocument();
    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=`);

    const stored = getConsentFromStorage() as { analytics?: boolean; necessary?: boolean };
    expect(stored.necessary).toBe(true);
    expect(stored.analytics).toBe(true);
  });

  it("rejects non-essential and persists consent", async () => {
    clearConsent();
    render(<CookieConsent locale="en" />);

    const reject = await screen.findByRole("button", { name: "Reject non-essential" });
    fireEvent.click(reject);

    expect(screen.queryByText("Cookies & privacy")).not.toBeInTheDocument();
    const stored = getConsentFromStorage() as { analytics?: boolean; necessary?: boolean };
    expect(stored.necessary).toBe(true);
    expect(stored.analytics).toBe(false);
  });

  it("allows saving preferences from the dialog", async () => {
    clearConsent();
    render(<CookieConsent locale="en" />);

    const preferences = await screen.findByRole("button", { name: "Preferences" });
    fireEvent.click(preferences);

    expect(await screen.findByText("Cookie preferences")).toBeInTheDocument();

    const analyticsToggle = screen.getByRole("checkbox", { name: "Analytics cookies" });
    expect(analyticsToggle).not.toBeChecked();
    fireEvent.click(analyticsToggle);
    expect(analyticsToggle).toBeChecked();

    const save = screen.getByRole("button", { name: "Save preferences" });
    fireEvent.click(save);

    expect(screen.queryByText("Cookies & privacy")).not.toBeInTheDocument();
    const stored = getConsentFromStorage() as { analytics?: boolean; necessary?: boolean };
    expect(stored.necessary).toBe(true);
    expect(stored.analytics).toBe(true);
  });
});

