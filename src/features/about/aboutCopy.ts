import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    pageTitleFallback: "About",
    introFallback: "Artist bio, releases, setup, and influences.",
    bioTitle: "Artist bio",
    bioEmpty: "Bio content will appear here once added in Sanity.",
    releasesTitle: "Discography / releases",
    releasesEmpty: "Releases will appear here once added in Sanity.",
    equipmentTitle: "Equipment / setup",
    equipmentEmpty: "Setup details will appear here once added in Sanity.",
    influencesTitle: "Influences",
    influencesEmpty: "Influences will appear here once added in Sanity.",
    photoAltFallback: "Artist photo"
  },
  es: {
    pageTitleFallback: "Sobre mí",
    introFallback: "Bio, lanzamientos, setup e influencias.",
    bioTitle: "Bio",
    bioEmpty: "La bio aparecerá aquí cuando se añada en Sanity.",
    releasesTitle: "Discografía / lanzamientos",
    releasesEmpty: "Los lanzamientos aparecerán aquí cuando se añadan en Sanity.",
    equipmentTitle: "Equipo / setup",
    equipmentEmpty: "Los detalles del setup aparecerán aquí cuando se añadan en Sanity.",
    influencesTitle: "Influencias",
    influencesEmpty: "Las influencias aparecerán aquí cuando se añadan en Sanity.",
    photoAltFallback: "Foto del artista"
  }
} as const satisfies Record<Locale, Record<string, string>>;

export function getAboutCopy(locale: Locale) {
  return copy[locale];
}

