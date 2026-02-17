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
    expect(cards.map((node) => node.getAttribute("data-testid"))).toEqual(["event-card-event-a", "event-card-event-b"]);

    const time = screen.getByTestId("event-date-event-a");
    expect(time).toHaveAttribute("dateTime", "2026-02-10");
    expect(time.textContent?.length).toBeGreaterThan(0);

    expect(screen.getByText("Venue A")).toBeInTheDocument();
    expect(screen.getByText("Austin, United States")).toBeInTheDocument();

    const links = screen.getAllByRole("link", { name: "Tickets" });
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["https://example.com/a", "https://example.com/b"]);
  });

  it("renders nothing when there are no visible events", () => {
    const { container } = render(<EventsBlockView locale="en" events={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

