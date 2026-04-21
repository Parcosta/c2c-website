import { CONFIRMED, client, dryLog } from "../shared";

const LABELS = {
  brand: { _type: "localeString", en: "Coast2c", es: "Coast2c" },
  navigation: {
    home: { _type: "localeString", en: "Home", es: "Inicio" },
    portfolio: { _type: "localeString", en: "Portfolio", es: "Portafolio" },
    services: { _type: "localeString", en: "Services", es: "Servicios" },
    press: { _type: "localeString", en: "Press / EPK", es: "Press / EPK" },
    about: { _type: "localeString", en: "About", es: "Acerca" },
    booking: { _type: "localeString", en: "Booking", es: "Booking" },
    contact: { _type: "localeString", en: "Contact", es: "Contacto" }
  },
  footer: {
    contact: { _type: "localeString", en: "Contact", es: "Contacto" },
    follow: { _type: "localeString", en: "Follow", es: "Redes sociales" },
    tagline: {
      _type: "localeString",
      en: "Mexico City · Modular synthesis · Sound design",
      es: "Ciudad de México · Síntesis modular · Diseño sonoro"
    }
  },
  projectsPage: {
    sectionLabel: {
      _type: "localeString",
      en: "Experimental electronic music & modular synthesis",
      es: "Música electrónica experimental y síntesis modular"
    },
    title: {
      _type: "localeString",
      en: "Projects & Releases",
      es: "Proyectos y Lanzamientos"
    },
    visitStore: {
      _type: "localeString",
      en: "Visit the store",
      es: "Visita la tienda"
    },
    filters: {
      all: { _type: "localeString", en: "All", es: "Todos" },
      music: { _type: "localeString", en: "Music", es: "Música" },
      sound: { _type: "localeString", en: "Sound", es: "Sonoro" },
      video: { _type: "localeString", en: "Video Remixes", es: "Videoremezclas" },
      dev: { _type: "localeString", en: "Dev", es: "Dev" }
    }
  }
};

export async function patchSiteLabels(): Promise<void> {
  const existing = await client.fetch<{ _id: string; brand?: { en?: string; es?: string } } | null>(
    `*[_id == "siteLabels"][0]{_id, brand}`
  );

  if (!existing) {
    dryLog("create siteLabels (did not exist)");
    if (CONFIRMED) {
      await client.createIfNotExists({
        _id: "siteLabels",
        _type: "siteLabels",
        ...LABELS
      });
    }
    return;
  }

  const patch = client.patch(existing._id);
  patch.setIfMissing(LABELS);

  const existingBrand = existing.brand ?? {};
  const correctedBrand = {
    _type: "localeString" as const,
    en: !existingBrand.en || /coast2coast/i.test(existingBrand.en) ? "Coast2c" : existingBrand.en,
    es: !existingBrand.es || /coast2coast/i.test(existingBrand.es) ? "Coast2c" : existingBrand.es
  };
  patch.set({ brand: correctedBrand });

  dryLog('patch siteLabels (setIfMissing nav/footer/projects + force-correct brand to "Coast2c")', {
    correctedBrand
  });
  if (CONFIRMED) {
    await patch.commit();
  }
}
