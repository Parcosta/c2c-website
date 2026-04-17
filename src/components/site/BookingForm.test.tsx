import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { BookingForm } from "./BookingForm";

const content = {
  name: "Name",
  email: "Email",
  eventType: "Event Type",
  eventDate: "Event Date",
  location: "Location",
  locationPlaceholder: "City, Venue",
  message: "Additional Details",
  submit: "Submit Request",
  sending: "Sending...",
  success: "Request sent. We'll be in touch!",
  error: "Something went wrong. Please try again."
};

const eventTypesContent = {
  live: "Live Performance",
  dj: "DJ Set",
  corporate: "Corporate Event",
  private: "Private Event",
  other: "Other"
};

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("BookingForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<BookingForm locale="en" content={content} eventTypesContent={eventTypesContent} />);

    expect(screen.getByTestId("booking-name")).toBeInTheDocument();
    expect(screen.getByTestId("booking-email")).toBeInTheDocument();
    expect(screen.getByTestId("booking-event-type")).toBeInTheDocument();
    expect(screen.getByTestId("booking-event-date")).toBeInTheDocument();
    expect(screen.getByTestId("booking-location")).toBeInTheDocument();
    expect(screen.getByTestId("booking-message")).toBeInTheDocument();
    expect(screen.getByTestId("booking-submit")).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    render(<BookingForm locale="en" content={content} eventTypesContent={eventTypesContent} />);

    const nameInput = screen.getByTestId("booking-name") as HTMLInputElement;
    const emailInput = screen.getByTestId("booking-email") as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
  });

  it("submits form with correct data", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response);

    render(<BookingForm locale="en" content={content} eventTypesContent={eventTypesContent} />);

    // Fill in required fields
    fireEvent.change(screen.getByTestId("booking-name"), {
      target: { value: "John Doe" }
    });
    fireEvent.change(screen.getByTestId("booking-email"), {
      target: { value: "john@example.com" }
    });

    // Submit form
    fireEvent.submit(screen.getByTestId("booking-form"));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "content-type": "application/json" },
          body: expect.stringContaining("John Doe")
        })
      );
    });
  });

  it("shows success message after successful submission", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response);

    render(<BookingForm locale="en" content={content} eventTypesContent={eventTypesContent} />);

    fireEvent.change(screen.getByTestId("booking-name"), {
      target: { value: "John Doe" }
    });
    fireEvent.change(screen.getByTestId("booking-email"), {
      target: { value: "john@example.com" }
    });

    fireEvent.submit(screen.getByTestId("booking-form"));

    await waitFor(() => {
      expect(screen.getByTestId("booking-success")).toBeInTheDocument();
    });
  });

  it("shows error message after failed submission", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<BookingForm locale="en" content={content} eventTypesContent={eventTypesContent} />);

    fireEvent.change(screen.getByTestId("booking-name"), {
      target: { value: "John Doe" }
    });
    fireEvent.change(screen.getByTestId("booking-email"), {
      target: { value: "john@example.com" }
    });

    fireEvent.submit(screen.getByTestId("booking-form"));

    await waitFor(() => {
      expect(screen.getByTestId("booking-error")).toBeInTheDocument();
    });
  });

  it("disables submit button while sending", async () => {
    mockFetch.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true } as Response), 100))
    );

    render(<BookingForm locale="en" content={content} eventTypesContent={eventTypesContent} />);

    fireEvent.change(screen.getByTestId("booking-name"), {
      target: { value: "John Doe" }
    });
    fireEvent.change(screen.getByTestId("booking-email"), {
      target: { value: "john@example.com" }
    });

    fireEvent.submit(screen.getByTestId("booking-form"));

    expect(screen.getByTestId("booking-submit")).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByTestId("booking-success")).toBeInTheDocument();
    });
  });

  it("renders with Spanish locale", () => {
    render(<BookingForm locale="es" content={content} eventTypesContent={eventTypesContent} />);

    expect(screen.getByTestId("booking-form")).toBeInTheDocument();
    expect(screen.getByTestId("booking-name")).toBeInTheDocument();
  });
});
