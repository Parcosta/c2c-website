import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventsBlockView } from "./EventsBlock";

const baseProps = {
  locale: "en" as const,
  title: "Events",
  subtitle: "Upcoming shows",
  ticketsLabel: "More info"
};

describe("EventsBlock", () => {
  it("renders upcoming events sorted by date with the title, eyebrow, and tickets links", () => {
    render(
      <EventsBlockView
        {...baseProps}
        events={[
          {
            _id: "event-b",
            title: "Late show",
            date: "2026-02-12T00:00:00.000Z",
            city: "Berlin",
            country: "Germany",
            ticketUrl: "https://example.com/b"
          },
          {
            _id: "event-a",
            title: "Early show",
            date: "2026-02-10T00:00:00.000Z",
            city: "Austin",
            country: "United States",
            ticketUrl: "https://example.com/a"
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Events" })).toBeInTheDocument();
    expect(screen.getByText("Upcoming shows")).toBeInTheDocument();

    const rows = screen.getAllByTestId(/event-row-/);
    expect(rows.map((node) => node.getAttribute("data-testid"))).toEqual([
      "event-row-event-a",
      "event-row-event-b"
    ]);

    expect(within(rows[0]).getByText("Early show")).toBeInTheDocument();
    expect(within(rows[0]).getByText("UNITED STATES, AUSTIN")).toBeInTheDocument();
    expect(within(rows[1]).getByText("GERMANY, BERLIN")).toBeInTheDocument();

    const links = screen.getAllByRole("link", { name: /Early show|Late show/ });
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "https://example.com/a",
      "https://example.com/b"
    ]);
  });

  it("renders nothing when there are no events", () => {
    const { container } = render(<EventsBlockView {...baseProps} events={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("drops events with invalid dates", () => {
    const { container } = render(
      <EventsBlockView
        {...baseProps}
        events={[{ _id: "bad", title: "Invalid", date: "not-a-date" }]}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("omits the tickets link when no ticketUrl is provided", () => {
    render(
      <EventsBlockView
        {...baseProps}
        events={[
          {
            _id: "event-free",
            title: "Free show",
            date: "2026-03-15T00:00:00.000Z",
            city: "Paris",
            country: "France"
          }
        ]}
      />
    );

    expect(screen.getByText("Free show")).toBeInTheDocument();
    expect(screen.getByText("FRANCE, PARIS")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Free show/ })).not.toBeInTheDocument();
  });

  it("renders the localized title and eyebrow", () => {
    render(
      <EventsBlockView
        {...baseProps}
        locale="es"
        title="Eventos"
        subtitle="Próximos shows y presentaciones."
        ticketsLabel="Más info"
        events={[
          {
            _id: "event-es",
            title: "Concierto",
            date: "2026-04-20T00:00:00.000Z",
            city: "Madrid",
            country: "España",
            ticketUrl: "https://example.com/es"
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Eventos" })).toBeInTheDocument();
    expect(screen.getByText("Próximos shows y presentaciones.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Concierto/ })).toBeInTheDocument();
  });

  it("handles events missing city, country, and tickets", () => {
    render(
      <EventsBlockView
        {...baseProps}
        events={[{ _id: "event-minimal", title: "Minimal", date: "2026-05-01T00:00:00.000Z" }]}
      />
    );

    expect(screen.getByText("Minimal")).toBeInTheDocument();
    expect(screen.queryByText(/,/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Minimal/ })).not.toBeInTheDocument();
  });

  it("renders the city even when country is absent", () => {
    render(
      <EventsBlockView
        {...baseProps}
        events={[
          {
            _id: "event-city",
            title: "City only",
            date: "2026-06-10T00:00:00.000Z",
            city: "Tokyo"
          }
        ]}
      />
    );
    expect(screen.getByText("TOKYO")).toBeInTheDocument();
  });

  it("sets a machine-readable dateTime on the date column", () => {
    render(
      <EventsBlockView
        {...baseProps}
        events={[{ _id: "event-dt", title: "Show", date: "2026-10-15T00:00:00.000Z" }]}
      />
    );

    const row = screen.getByTestId("event-row-event-dt");
    expect(within(row).getByRole("time")).toHaveAttribute("datetime", "2026-10-15");
  });

  it("treats whitespace-only city/country as empty", () => {
    render(
      <EventsBlockView
        {...baseProps}
        events={[
          {
            _id: "event-ws",
            title: "Whitespace",
            date: "2026-12-01T00:00:00.000Z",
            city: "   ",
            country: "   "
          }
        ]}
      />
    );
    expect(screen.queryByText(/,/)).not.toBeInTheDocument();
  });

  it("applies custom className to the section element", () => {
    const { container } = render(
      <EventsBlockView
        {...baseProps}
        className="custom-class"
        events={[{ _id: "event-class", title: "Class", date: "2027-01-01T00:00:00.000Z" }]}
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
