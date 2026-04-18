import { CONFIRMED, client, dryLog, replaceCollectionOfType } from "../shared";

const EVENTS = [
  {
    _id: "event-c2c-oct25-festival-cine",
    title: { en: "Film Festival", es: "Festival de Cine" },
    date: "2026-10-25T19:00:00.000Z",
    venue: { en: "Cineteca Nacional", es: "Cineteca Nacional" },
    city: { en: "Mexico City", es: "Ciudad de México" },
    country: { en: "Mexico", es: "México" },
    ticketUrl: "https://example.com/tickets/festival-cine"
  },
  {
    _id: "event-c2c-oct26-jazz",
    title: { en: "Jazz Concert", es: "Concierto de Jazz" },
    date: "2026-10-26T18:00:00.000Z",
    venue: { en: "Pabellón M", es: "Pabellón M" },
    city: { en: "Monterrey", es: "Monterrey" },
    country: { en: "Mexico", es: "México" },
    ticketUrl: "https://example.com/tickets/concierto-jazz"
  },
  {
    _id: "event-c2c-oct27-charla-arte",
    title: { en: "Art Talk", es: "Charla de Arte" },
    date: "2026-10-27T17:00:00.000Z",
    venue: { en: "MUAC", es: "MUAC" },
    city: { en: "Puebla", es: "Puebla" },
    country: { en: "Mexico", es: "México" },
    ticketUrl: "https://example.com/tickets/charla-arte"
  },
  {
    _id: "event-c2c-oct28-taller-cocina",
    title: { en: "Sound Cooking Workshop", es: "Taller de Cocina Sonora" },
    date: "2026-10-28T16:00:00.000Z",
    venue: { en: "Casa del Lago", es: "Casa del Lago" },
    city: { en: "Querétaro", es: "Querétaro" },
    country: { en: "Mexico", es: "México" },
    ticketUrl: "https://example.com/tickets/taller-cocina"
  }
];

export async function replaceEvents(): Promise<void> {
  const keep = new Set(EVENTS.map((e) => e._id));
  await replaceCollectionOfType("event", keep, "event");

  for (const e of EVENTS) {
    const doc = {
      _id: e._id,
      _type: "event",
      title: { _type: "localeString", ...e.title },
      date: e.date,
      venue: { _type: "localeString", ...e.venue },
      city: { _type: "localeString", ...e.city },
      country: { _type: "localeString", ...e.country },
      ticketUrl: e.ticketUrl
    };
    dryLog(`createOrReplace event "${e.title.en}"`, { _id: e._id, date: e.date });
    if (CONFIRMED) await client.createOrReplace(doc);
  }
}
