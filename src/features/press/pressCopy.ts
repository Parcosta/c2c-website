import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    pageTitleFallback: "Press / EPK",
    intro: "Everything you need for press and bookings.",
    bioTitle: "Bio",
    bioEmpty: "Bio content will appear here once added in Sanity.",
    pressPhotosTitle: "Press photos",
    pressPhotosEmpty: "Press photos will appear here once added in Sanity.",
    pressMentionsTitle: "Press mentions",
    pressMentionsEmpty: "No press mentions yet.",
    pressKitTitle: "Press kit downloads",
    pressKitEmpty: "Downloadable assets will appear here once added in Sanity.",
    techRiderTitle: "Tech rider",
    techRiderEmpty: "Available upon request.",
    stagePlotTitle: "Stage plot",
    stagePlotPlaceholder: "Placeholder — available upon request.",
    bookingsTitle: "Bookings",
    bookingsEmpty: "Contact details will appear here once configured.",
    downloadLabel: "Download",
    viewLabel: "View"
  },
  es: {
    pageTitleFallback: "Prensa / EPK",
    intro: "Todo lo que necesitas para prensa y contrataciones.",
    bioTitle: "Bio",
    bioEmpty: "La bio aparecerá aquí cuando se añada en Sanity.",
    pressPhotosTitle: "Fotos de prensa",
    pressPhotosEmpty: "Las fotos de prensa aparecerán aquí cuando se añadan en Sanity.",
    pressMentionsTitle: "Menciones en prensa",
    pressMentionsEmpty: "Aún no hay menciones en prensa.",
    pressKitTitle: "Descargas del press kit",
    pressKitEmpty: "Los recursos descargables aparecerán aquí cuando se añadan en Sanity.",
    techRiderTitle: "Rider técnico",
    techRiderEmpty: "Disponible bajo solicitud.",
    stagePlotTitle: "Plano de escenario",
    stagePlotPlaceholder: "Marcador de posición — disponible bajo solicitud.",
    bookingsTitle: "Contrataciones",
    bookingsEmpty: "Los datos de contacto aparecerán aquí cuando se configuren.",
    downloadLabel: "Descargar",
    viewLabel: "Ver"
  }
} as const satisfies Record<Locale, Record<string, string>>;

export function getPressCopy(locale: Locale) {
  return copy[locale];
}

