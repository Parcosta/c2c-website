import {
  CONFIRMED,
  client,
  dryLog,
  imageRef,
  shortKey,
  uploadLocalImage
} from "../shared";

export async function uploadGalleryImages(): Promise<string[]> {
  const filenames = [
    "project-1.jpg",
    "project-2.jpg",
    "project-3.jpg",
    "project-4.jpg",
    "project-5.jpg",
    "project-6.jpg"
  ];
  const ids: string[] = [];
  for (const filename of filenames) {
    const id = await uploadLocalImage(`public/images/${filename}`, filename);
    ids.push(id);
  }
  return ids;
}

export async function upsertHomePage(
  heroImageId: string,
  galleryImageIds: string[]
): Promise<string> {
  const galleryImages = galleryImageIds.map((id, index) => ({
    _key: `home-gallery-${index + 1}`,
    _type: "homeGalleryImage" as const,
    image: imageRef(id),
    alt: {
      _type: "localeString" as const,
      en: `Coast2c live performance ${index + 1}`,
      es: `Coast2c en vivo ${index + 1}`
    },
    caption: { _type: "localeString" as const, en: "", es: "" }
  }));

  const doc = {
    _id: "home-page",
    _type: "page",
    title: { _type: "localeString", en: "Home", es: "Inicio" },
    slug: {
      _type: "localeSlug",
      en: { _type: "slug", current: "home" },
      es: { _type: "slug", current: "home" }
    },
    hero: {
      _type: "hero",
      heading: {
        _type: "localeString",
        en: "Live Modular Techno Artist & DJ for Festivals and Clubs",
        es: "Artista de Techno Modular en Vivo y DJ para Festivales y Clubes"
      },
      subheading: {
        _type: "localeString",
        en: "Immersive live performances rooted in experimental sound design and analog modular hardware — for festivals, clubs, and interdisciplinary collaborations.",
        es: "Performances inmersivos en vivo con raíces en el diseño sonoro experimental y el hardware modular analógico — para festivales, clubes y colaboraciones interdisciplinarias."
      },
      backgroundImage: imageRef(heroImageId),
      cta: {
        _type: "cta",
        label: {
          _type: "localeString",
          en: "Book Live Performance",
          es: "Reservar Presentación en Vivo"
        },
        href: "/booking"
      }
    },
    homeSections: {
      _type: "homeSections",
      heroEyebrows: [
        {
          _key: shortKey(),
          _type: "localeString",
          en: "Mexico City",
          es: "Ciudad de México"
        },
        {
          _key: shortKey(),
          _type: "localeString",
          en: "Modular synthesis · Sound design",
          es: "Síntesis modular · Diseño sonoro"
        }
      ],
      heroSecondaryCta: {
        _type: "cta",
        label: { _type: "localeString", en: "Watch Live", es: "Ver en Vivo" },
        href: "/portfolio"
      },
      heroAudioTrackLabel: {
        _type: "localeString",
        en: "Featured track",
        es: "Tema destacado"
      },
      servicesSection: {
        eyebrow: {
          _type: "localeString",
          en: "Work with Coast2c",
          es: "Trabaja con Coast2c"
        },
        title: { _type: "localeString", en: "Services", es: "Servicios" },
        description: {
          _type: "localeText",
          en: "Coast2c's practice extends beyond live performance into sound design and music production for multimedia projects.",
          es: "El trabajo de Coast2c se extiende más allá de la performance en vivo hacia el ámbito del diseño sonoro y producción musical para proyectos multimedia."
        },
        ctaLabel: {
          _type: "localeString",
          en: "Start a Project",
          es: "Trabaja conmigo"
        },
        ctaHref: "/booking"
      },
      eventsSection: {
        eyebrow: {
          _type: "localeString",
          en: "Experimental electronic music production",
          es: "Producción de música electrónica experimental"
        },
        title: { _type: "localeString", en: "Live Events", es: "Eventos en Vivo" },
        moreInfoLabel: { _type: "localeString", en: "More Info", es: "Más info" },
        ticketsLabel: { _type: "localeString", en: "Tickets", es: "Entradas" }
      },
      newsSection: {
        eyebrow: {
          _type: "localeString",
          en: "Press & features",
          es: "Prensa y reseñas"
        },
        title: { _type: "localeString", en: "News", es: "Noticias" },
        ctaLabel: { _type: "localeString", en: "Read More", es: "Más info" }
      },
      multimediaCtaSection: {
        title: {
          _type: "localeString",
          en: "Music Production & Sound Design for Multimedia",
          es: "Producción Musical y Diseño Sonoro para Multimedia"
        },
        description: {
          _type: "localeText",
          en: "Currently developing an integrated sound-design project for an experimental performance piece — exploring the intersection of modular synthesis, spatial audio, and visual art.",
          es: "Actualmente desarrollando un proyecto integral de diseño sonoro para una pieza de performance experimental, explorando la intersección entre síntesis modular, audio espacial y artes visuales."
        },
        ctaLabel: {
          _type: "localeString",
          en: "Start a Project",
          es: "Trabajemos juntos"
        },
        ctaHref: "/booking"
      },
      gallerySection: {
        eyebrow: {
          _type: "localeString",
          en: "High-resolution imagery for media and promotion",
          es: "Imágenes de alta resolución disponibles para medios y promoción"
        },
        title: { _type: "localeString", en: "Gallery", es: "Galería" },
        images: galleryImages
      }
    },
    seo: {
      _type: "seo",
      title: {
        _type: "localeString",
        en: "Coast2c · Live Modular Techno & Sound Design",
        es: "Coast2c · Techno Modular en Vivo y Diseño Sonoro"
      },
      description: {
        _type: "localeString",
        en: "Live modular techno, DJ sets, and sound design from Mexico City. Immersive performances for festivals, clubs, and interdisciplinary collaborations.",
        es: "Techno modular en vivo, sets de DJ y diseño sonoro desde la Ciudad de México. Performances inmersivos para festivales, clubes y colaboraciones interdisciplinarias."
      }
    }
  };

  dryLog("createOrReplace home page with homeSections (hero + 6 sections + gallery)", {
    _id: doc._id,
    galleryImages: galleryImages.length
  });
  if (!CONFIRMED) return doc._id;
  await client.createOrReplace(doc);
  return doc._id;
}
