import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventsBlockView } from "./EventsBlock";

describe("EventsBlock", () => {
  it("renders upcoming events sorted by date with ticket links", () => {
    render(
      <EventsBlockView
        locale="en"
        title="Events"
        subtitle="Upcoming shows"
        events={[
          {
            _id: "event-b",
            title: "Late show",
            date: "2026-02-12T00:00:00.000Z",
            venue: "Venue B",
            city: "Berlin",
            country: "Germany",
            ticketUrl: "https://example.com/b"
          },
          {
            _id: "event-a",
            title: "Early show",
            date: "2026-02-10T00:00:00.000Z",
            venue: "Venue A",
            city: "Austin",
            country: "United States",
            ticketUrl: "https://example.com/a"
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Events" })).toBeInTheDocument();
    expect(screen.getByText("Upcoming shows")).toBeInTheDocument();

    const cards = screen.getAllByTestId(/event-card-/);
    expect(cards.map((node) => node.getAttribute("data-testid"))).toEqual([
      "event-card-event-a",
      "event-card-event-b"
    ]);

    // Check for visually hidden date element for accessibility
    const time = screen.getByTestId("event-date-event-a");
    expect(time).toHaveAttribute("dateTime", "2026-02-10");
    expect(time).toHaveClass("sr-only");
    expect(time.textContent?.length).toBeGreaterThan(0);

    // Check venue display
    expect(screen.getByText("Venue A")).toBeInTheDocument();
    expect(screen.getByText("Venue B")).toBeInTheDocument();

    // Check location display
    expect(screen.getByText("Austin, United States")).toBeInTheDocument();
    expect(screen.getByText("Berlin, Germany")).toBeInTheDocument();

    // Check ticket links with icon
    const links = screen.getAllByRole("link", { name: /Tickets/ });
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "https://example.com/a",
      "https://example.com/b"
    ]);
  });

  it("renders nothing when there are no visible events", () => {
    const { container } = render(<EventsBlockView locale="en" events={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when all events have invalid dates", () => {
    const { container } = render(
      <EventsBlockView
        locale="en"
        events={[
          {
            _id: "event-invalid",
            title: "Invalid Date Show",
            date: "invalid-date",
            venue: "Venue",
            city: "City",
            country: "Country"
          }
        ]}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders events without ticketUrl without button", () => {
    render(
      <EventsBlockView
        locale="en"
        title="Events"
        events={[
          {
            _id: "event-no-tickets",
            title: "Free Show",
            date: "2026-03-15T00:00:00.000Z",
            venue: "Free Venue",
            city: "Paris",
            country: "France"
            // No ticketUrl
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Events" })).toBeInTheDocument();
    expect(screen.getByText("Free Show")).toBeInTheDocument();
    expect(screen.getByText("Free Venue")).toBeInTheDocument();
    expect(screen.getByText("Paris, France")).toBeInTheDocument();

    // Should not have ticket link
    expect(screen.queryByRole("link", { name: /Tickets/ })).not.toBeInTheDocument();
  });

  it("renders Spanish copy when locale is es", () => {
    render(
      <EventsBlockView
        locale="es"
        events={[
          {
            _id: "event-es",
            title: "Concierto",
            date: "2026-04-20T00:00:00.000Z",
            venue: "Sala",
            city: "Madrid",
            country: "España",
            ticketUrl: "https://example.com/es"
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Eventos" })).toBeInTheDocument();
    expect(screen.getByText("Próximos shows y presentaciones.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Entradas/ })).toBeInTheDocument();
  });

  it("renders event without venue or location", () => {
    render(
      <EventsBlockView
        locale="en"
        events={[
          {
            _id: "event-minimal",
            title: "Minimal Event",
            date: "2026-05-01T00:00:00.000Z"
            // No venue, city, country, or ticketUrl
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Events" })).toBeInTheDocument();
    expect(screen.getByText("Minimal Event")).toBeInTheDocument();

    // Should not have venue or location elements
    expect(screen.queryByText("Venue")).not.toBeInTheDocument();
  });

  it("renders event with only city (no country)", () => {
    render(
      <EventsBlockView
        locale="en"
        events={[
          {
            _id: "event-city-only",
            title: "City Only Event",
            date: "2026-06-10T00:00:00.000Z",
            venue: "Cool Venue",
            city: "Tokyo"
            // No country
          }
        ]}
      />
    );

    expect(screen.getByText("Tokyo")).toBeInTheDocument();
  });

  it("renders event with only country (no city)", () => {
    render(
      <EventsBlockView
        locale="en"
        events={[
          {
            _id: "event-country-only",
            title: "Country Only Event",
            date: "2026-07-20T00:00:00.000Z",
            venue: "Cool Venue",
            country: "Japan"
            // No city
          }
        ]}
      />
    );

    expect(screen.getByText("Japan")).toBeInTheDocument();
  });

  it("filters out events without dates", () => {
    render(
      <EventsBlockView
        locale="en"
        events={[
          {
            _id: "event-with-date",
            title: "Has Date",
            date: "2026-08-01T00:00:00.000Z",
            venue: "Venue"
          },
          {
            _id: "event-no-date",
            title: "No Date",
            // No date field
            venue: "Venue"
          }
        ]}
      />
    );

    // Only the event with a date should be rendered
    expect(screen.getByTestId("event-card-event-with-date")).toBeInTheDocument();
    expect(screen.queryByTestId("event-card-event-no-date")).not.toBeInTheDocument();
  });

  it("uses custom title and subtitle when provided", () => {
    render(
      <EventsBlockView
        locale="en"
        title="Custom Title"
        subtitle="Custom subtitle text"
        events={[
          {
            _id: "event-1",
            title: "Show",
            date: "2026-09-01T00:00:00.000Z"
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Custom Title" })).toBeInTheDocument();
    expect(screen.getByText("Custom subtitle text")).toBeInTheDocument();
  });

  it("formats dates correctly for different locales", () => {
    render(
      <EventsBlockView
        locale="es"
        events={[
          {
            _id: "event-date-format",
            title: "Spanish Date Show",
            date: "2026-10-15T00:00:00.000Z",
            venue: "Sala"
          }
        ]}
      />
    );

    // The date should be formatted in Spanish
    const time = screen.getByTestId("event-date-event-date-format");
    expect(time).toHaveAttribute("dateTime", "2026-10-15");
    // The formatted date should contain Spanish month/day names
    expect(time.textContent).toMatch(/oct|mié|jue|vie|lun|mar|sáb|dom/i);
  });

  it("trims whitespace from city and country", () => {
    render(
      <EventsBlockView
        locale="en"
        events={[
          {
            _id: "event-trim",
            title: "Trim Test",
            date: "2026-11-01T00:00:00.000Z",
            venue: "Venue",
            city: "  London  ",
            country: "  UK  "
          }
        ]}
      />
    );

    // The location should be properly formatted with trimmed values
    expect(screen.getByText("London, UK")).toBeInTheDocument();
  });

  it("handles events with whitespace-only city/country", () => {
    render(
      <EventsBlockView
        locale="en"
        events={[
          {
            _id: "event-whitespace",
            title: "Whitespace Test",
            date: "2026-12-01T00:00:00.000Z",
            venue: "Venue",
            city: "   ",
            country: "   "
          }
        ]}
      />
    );

    // Should not render location when city/country are whitespace-only
    expect(screen.queryByText(", ")).not.toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(
      <EventsBlockView
        locale="en"
        className="custom-class"
        events={[
          {
            _id: "event-class",
            title: "Class Test",
            date: "2027-01-01T00:00:00.000Z"
          }
        ]}
      />
    );

    // The section should have the custom class
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
