/**
 * Fixture-backed Sanity fetches for E2E and local smoke tests.
 *
 * Activated by `SANITY_USE_FIXTURES=1`. `sanityFetch` routes to the resolver
 * below instead of hitting the real Sanity API, so the app renders without a
 * network round-trip or a seeded dataset. Fixture shapes mirror the locale-
 * flattened output the GROQ projections produce — keep the two in sync when
 * adding new query fields.
 */

import type { Locale } from "@/lib/locale";
import type {
  AboutPageValue,
  EventValue,
  LegalPageValue,
  PageValue,
  PortfolioItemValue,
  PressEpkValue,
  PressItemValue,
  QueryDefinition,
  QueryName,
  ServiceValue,
  SiteLabelsValue,
  SiteSettingsValue
} from "@/sanity/queries";

type AnyQueryDef = QueryDefinition<Record<string, unknown>, unknown>;

type LocaleParams = { locale: Locale };
type SlugParams = LocaleParams & { slug: string };

type ResolverMap = {
  homepage: (p: LocaleParams & { id: string }) => PageValue | null;
  siteLabels: (p: LocaleParams) => SiteLabelsValue | null;
  siteSettings: (p: LocaleParams) => SiteSettingsValue | null;
  portfolioItems: (p: LocaleParams) => PortfolioItemValue[];
  portfolioItem: (p: SlugParams) => PortfolioItemValue | null;
  events: (p: LocaleParams) => EventValue[];
  upcomingEvents: (p: LocaleParams) => EventValue[];
  services: (p: LocaleParams) => ServiceValue[];
  pressItems: (p: LocaleParams) => PressItemValue[];
  pressEpk: (p: LocaleParams) => PressEpkValue;
  aboutPage: (p: LocaleParams) => AboutPageValue | null;
  legalPage: (p: SlugParams) => LegalPageValue | null;
};

/** Pick the locale-appropriate value from a bilingual source. */
function t<T>(locale: Locale, en: T, es: T): T {
  return locale === "es" ? es : en;
}

const resolvers: ResolverMap = {
  homepage: ({ locale }) => ({
    _id: "home-page",
    title: t(locale, "Home", "Inicio"),
    hero: {
      heading: t(
        locale,
        "Live Modular Techno Artist & DJ for Festivals and Clubs",
        "Artista de Techno Modular en Vivo y DJ para Festivales y Clubes"
      ),
      subheading: t(
        locale,
        "Immersive live performances rooted in experimental sound design and analog modular hardware.",
        "Performances inmersivos en vivo con raíces en el diseño sonoro experimental y el hardware modular analógico."
      ),
      backgroundImage: {
        _type: "image",
        asset: {
          _ref: "image-e2efixturehero0000000000000000000000000-1200x800-jpg",
          _type: "reference"
        }
      },
      cta: {
        label: t(locale, "Book Live Performance", "Reservar Presentación en Vivo"),
        href: "/booking"
      }
    },
    homeSections: {
      heroEyebrows: [
        t(locale, "Mexico City", "Ciudad de México"),
        t(locale, "Modular synthesis · Sound design", "Síntesis modular · Diseño sonoro")
      ],
      heroSecondaryCta: {
        label: t(locale, "Watch Live", "Ver en Vivo"),
        href: "/portfolio"
      },
      heroAudioTrackLabel: t(locale, "Featured track", "Tema destacado"),
      servicesSection: {
        eyebrow: t(locale, "Work with Coast2c", "Trabaja con Coast2c"),
        title: t(locale, "Services", "Servicios"),
        description: t(
          locale,
          "Sound design and music production for multimedia projects.",
          "Diseño sonoro y producción musical para proyectos multimedia."
        ),
        ctaLabel: t(locale, "Start a Project", "Trabaja conmigo"),
        ctaHref: "/booking",
        imageAlt: t(
          locale,
          "Coast2c working in the studio",
          "Coast2c trabajando en el estudio"
        )
      },
      eventsSection: {
        eyebrow: t(
          locale,
          "Experimental electronic music production",
          "Producción de música electrónica experimental"
        ),
        title: t(locale, "Live Events", "Eventos en Vivo"),
        moreInfoLabel: t(locale, "More Info", "Más info"),
        ticketsLabel: t(locale, "Tickets", "Entradas")
      },
      newsSection: {
        eyebrow: t(locale, "Press & features", "Prensa y reseñas"),
        title: t(locale, "News", "Noticias"),
        ctaLabel: t(locale, "Read More", "Más info")
      },
      multimediaCtaSection: {
        title: t(
          locale,
          "Music Production & Sound Design for Multimedia",
          "Producción Musical y Diseño Sonoro para Multimedia"
        ),
        description: t(
          locale,
          "Developing integrated sound-design projects for experimental performance pieces.",
          "Desarrollando proyectos integrales de diseño sonoro para piezas de performance experimental."
        ),
        ctaLabel: t(locale, "Start a Project", "Trabajemos juntos"),
        ctaHref: "/booking"
      },
      gallerySection: {
        eyebrow: t(
          locale,
          "High-resolution imagery for media and promotion",
          "Imágenes de alta resolución disponibles para medios y promoción"
        ),
        title: t(locale, "Gallery", "Galería"),
        images: []
      }
    },
    seo: {
      title: t(
        locale,
        "Coast2c · Live Modular Techno & Sound Design",
        "Coast2c · Techno Modular en Vivo y Diseño Sonoro"
      ),
      description: t(
        locale,
        "Live modular techno, DJ sets, and sound design from Mexico City.",
        "Techno modular en vivo, sets de DJ y diseño sonoro desde la Ciudad de México."
      )
    }
  }),

  siteLabels: ({ locale }) => ({
    _id: "siteLabels",
    brand: "Coast2c",
    navigation: {
      primaryAriaLabel: t(locale, "Primary navigation", "Navegación principal"),
      mobileAriaLabel: t(locale, "Mobile navigation", "Navegación móvil"),
      footerAriaLabel: t(locale, "Footer navigation", "Navegación del pie"),
      home: t(locale, "Home", "Inicio"),
      portfolio: t(locale, "Portfolio", "Portafolio"),
      services: t(locale, "Services", "Servicios"),
      press: t(locale, "Press / EPK", "Press / EPK"),
      about: t(locale, "About", "Acerca"),
      contact: t(locale, "Contact", "Contacto"),
      booking: t(locale, "Booking", "Booking"),
      privacyPolicy: t(locale, "Privacy Policy", "Política de privacidad"),
      terms: t(locale, "Terms", "Términos"),
      mobileMenu: t(locale, "Menu", "Menú"),
      close: t(locale, "Close", "Cerrar")
    },
    language: {
      switchToEnglish: "EN",
      switchToSpanish: "ES"
    },
    footer: {
      contact: t(locale, "Contact", "Contacto"),
      language: t(locale, "Language", "Idioma"),
      follow: t(locale, "Follow", "Redes sociales"),
      rights: t(locale, "All rights reserved.", "Todos los derechos reservados."),
      tagline: t(
        locale,
        "Mexico City · Modular synthesis · Sound design",
        "Ciudad de México · Síntesis modular · Diseño sonoro"
      )
    },
    portfolioPage: {
      title: t(locale, "Portfolio", "Portafolio"),
      subtitle: t(locale, "Selected work and releases.", "Trabajo seleccionado y lanzamientos."),
      filtersLabel: t(locale, "Filter", "Filtrar"),
      allFilter: t(locale, "All", "Todos"),
      liveFilter: t(locale, "Live", "En vivo"),
      djFilter: "DJ",
      studioFilter: t(locale, "Studio", "Estudio"),
      itemsCountLabel: t(locale, "items", "elementos")
    },
    projectsPage: {
      sectionLabel: t(
        locale,
        "Experimental electronic music & modular synthesis",
        "Música electrónica experimental y síntesis modular"
      ),
      title: t(locale, "Projects & Releases", "Proyectos y Lanzamientos"),
      visitStore: t(locale, "Visit the store", "Visita la tienda"),
      filters: {
        all: t(locale, "All", "Todos"),
        music: t(locale, "Music", "Música"),
        sound: t(locale, "Sound", "Sonoro"),
        video: t(locale, "Video", "Video"),
        mixes: t(locale, "Mixes", "Mixes"),
        dev: "Dev"
      }
    },
    contactPage: {
      title: t(locale, "Contact", "Contacto"),
      subtitle: t(locale, "Send a message.", "Envía un mensaje."),
      form: {
        name: t(locale, "Name", "Nombre"),
        email: t(locale, "Email", "Correo"),
        message: t(locale, "Message", "Mensaje"),
        submit: t(locale, "Send", "Enviar"),
        sending: t(locale, "Sending…", "Enviando…"),
        success: t(locale, "Message sent.", "Mensaje enviado."),
        error: t(locale, "Something went wrong.", "Algo salió mal.")
      }
    },
    bookingPage: {
      title: t(locale, "Book Coast2c", "Contratar a Coast2c"),
      subtitle: t(
        locale,
        "Request a live performance, DJ set, or production collaboration.",
        "Solicita una presentación en vivo, set de DJ o colaboración de producción."
      ),
      seoTitle: t(locale, "Book Coast2c", "Contratar a Coast2c"),
      seoDescription: t(locale, "Book a performance.", "Reserva una presentación."),
      form: {
        name: t(locale, "Name", "Nombre"),
        email: t(locale, "Email", "Correo"),
        eventType: t(locale, "Event type", "Tipo de evento"),
        eventDate: t(locale, "Event date", "Fecha del evento"),
        location: t(locale, "Location", "Ubicación"),
        locationPlaceholder: t(locale, "City, country", "Ciudad, país"),
        message: t(locale, "Message", "Mensaje"),
        submit: t(locale, "Send request", "Enviar solicitud"),
        sending: t(locale, "Sending…", "Enviando…"),
        success: t(locale, "Request sent.", "Solicitud enviada."),
        error: t(locale, "Something went wrong.", "Algo salió mal.")
      },
      eventTypes: {
        live: t(locale, "Live performance", "Presentación en vivo"),
        dj: "DJ Set",
        corporate: t(locale, "Corporate", "Corporativo"),
        private: t(locale, "Private event", "Evento privado"),
        other: t(locale, "Other", "Otro")
      }
    },
    aboutPage: {
      pageTitleFallback: t(locale, "About", "Acerca"),
      introFallback: t(locale, "About Coast2c.", "Acerca de Coast2c."),
      bioTitle: t(locale, "Biography", "Biografía"),
      bioEmpty: t(locale, "Biography coming soon.", "Biografía próximamente."),
      releasesTitle: t(locale, "Releases", "Lanzamientos"),
      releasesEmpty: t(locale, "No releases yet.", "Sin lanzamientos."),
      equipmentTitle: t(locale, "Equipment", "Equipo"),
      equipmentEmpty: t(locale, "No equipment listed.", "Sin equipo listado."),
      influencesTitle: t(locale, "Influences", "Influencias"),
      influencesEmpty: t(locale, "No influences listed.", "Sin influencias listadas."),
      photoAltFallback: t(locale, "Coast2c portrait", "Retrato de Coast2c")
    },
    servicesPage: {
      seoTitle: t(locale, "Services · Coast2c", "Servicios · Coast2c"),
      seoDescription: t(
        locale,
        "Sound design, modular synthesis, and live performance services.",
        "Diseño sonoro, síntesis modular y servicios de performance en vivo."
      ),
      heading: t(locale, "Services", "Servicios"),
      subheading: t(
        locale,
        "What Coast2c can do for your project.",
        "Qué puede hacer Coast2c por tu proyecto."
      ),
      jsonLdName: "Coast2c",
      emptyMessage: t(locale, "No services listed yet.", "Sin servicios listados."),
      pricingLabel: t(locale, "Pricing", "Precios"),
      serviceFallbackTitle: t(locale, "Service", "Servicio")
    },
    pressPage: {
      pageTitleFallback: t(locale, "Press / EPK", "Press / EPK"),
      intro: t(locale, "Press kit, bio, and downloads.", "Kit de prensa, biografía y descargas."),
      bioTitle: t(locale, "Biography", "Biografía"),
      bioEmpty: t(locale, "Biography coming soon.", "Biografía próximamente."),
      pressPhotosTitle: t(locale, "Press Photos", "Fotos de prensa"),
      pressPhotosEmpty: t(locale, "No press photos.", "Sin fotos de prensa."),
      pressMentionsTitle: t(locale, "Press Mentions", "Menciones de prensa"),
      pressMentionsEmpty: t(locale, "No press mentions.", "Sin menciones."),
      pressKitTitle: t(locale, "Press Kit", "Kit de prensa"),
      pressKitEmpty: t(locale, "No press kit assets.", "Sin recursos de prensa."),
      techRiderTitle: t(locale, "Tech Rider", "Tech Rider"),
      techRiderEmpty: t(locale, "No tech rider.", "Sin tech rider."),
      stagePlotTitle: t(locale, "Stage Plot", "Plano de escenario"),
      stagePlotPlaceholder: t(locale, "No stage plot.", "Sin plano de escenario."),
      bookingsTitle: t(locale, "Bookings", "Reservas"),
      bookingsEmpty: t(locale, "No bookings contact.", "Sin contacto de reservas."),
      downloadLabel: t(locale, "Download", "Descargar")
    },
    notFoundPage: {
      title: t(locale, "Page not found", "Página no encontrada"),
      body: t(
        locale,
        "The page you were looking for does not exist.",
        "La página que buscas no existe."
      ),
      backHome: t(locale, "Back to home", "Volver al inicio")
    },
    cookieConsent: {
      dialogAriaLabel: t(locale, "Cookie preferences", "Preferencias de cookies"),
      title: t(locale, "Cookies", "Cookies"),
      description: t(
        locale,
        "We use cookies to improve your experience.",
        "Usamos cookies para mejorar tu experiencia."
      ),
      acceptAll: t(locale, "Accept all", "Aceptar todas"),
      rejectNonEssential: t(locale, "Reject non-essential", "Rechazar no esenciales"),
      customize: t(locale, "Customize", "Personalizar"),
      dialogTitle: t(locale, "Cookie settings", "Configuración de cookies"),
      dialogDescription: t(locale, "Choose which cookies to allow.", "Elige qué cookies permitir."),
      necessaryLabel: t(locale, "Necessary", "Necesarias"),
      necessaryDescription: t(
        locale,
        "Required for the site to function.",
        "Requeridas para el funcionamiento del sitio."
      ),
      analyticsLabel: t(locale, "Analytics", "Analítica"),
      analyticsDescription: t(
        locale,
        "Helps us improve the site.",
        "Nos ayuda a mejorar el sitio."
      ),
      savePreferences: t(locale, "Save preferences", "Guardar preferencias"),
      privacyPolicy: t(locale, "Privacy Policy", "Política de privacidad"),
      terms: t(locale, "Terms", "Términos")
    }
  }),

  siteSettings: () => ({
    _id: "siteSettings",
    siteName: "Coast2c",
    logo: undefined,
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/coast2c" },
      { platform: "SoundCloud", url: "https://soundcloud.com/coast2c" }
    ],
    contactEmail: "hello@coast2c.test"
  }),

  portfolioItems: ({ locale }) => [
    {
      _id: "portfolio-1",
      title: t(locale, "Modular Session 01", "Sesión Modular 01"),
      slug: "modular-session-01",
      category: t(locale, "Music", "Música"),
      filterCategory: "musica",
      images: [
        {
          _type: "image",
          asset: {
            _ref: "image-e2efixtureproject10000000000000000000000-800x800-jpg",
            _type: "reference"
          }
        }
      ],
      description: [],
      date: "2025-01-15",
      tags: ["modular", "techno"]
    },
    {
      _id: "portfolio-2",
      title: t(locale, "Sound for Film", "Sonido para Cine"),
      slug: "sound-for-film",
      category: t(locale, "Sound", "Sonoro"),
      filterCategory: "sonoro",
      images: [
        {
          _type: "image",
          asset: {
            _ref: "image-e2efixtureproject20000000000000000000000-800x800-jpg",
            _type: "reference"
          }
        }
      ],
      description: [],
      date: "2024-11-02",
      tags: ["sound-design"]
    },
    {
      _id: "portfolio-3",
      title: t(locale, "Video Remix", "Videoremezcla"),
      slug: "video-remix",
      category: t(locale, "Video", "Video"),
      filterCategory: "video",
      images: [
        {
          _type: "image",
          asset: {
            _ref: "image-e2efixtureproject30000000000000000000000-800x800-jpg",
            _type: "reference"
          }
        }
      ],
      description: [],
      date: "2024-08-20",
      tags: ["video", "remix"]
    }
  ],

  portfolioItem: ({ locale, slug }) =>
    resolvers.portfolioItems({ locale }).find((item) => item.slug === slug) ?? null,

  events: () => [],
  upcomingEvents: () => [],

  services: ({ locale }) => {
    const titles: Array<[string, string]> = [
      ["Live Performance", "Presentación en vivo"],
      ["DJ Set", "DJ Set"],
      ["Sound Design", "Diseño sonoro"],
      ["Music Production", "Producción musical"],
      ["Mixing", "Mezcla"],
      ["Mastering", "Masterización"],
      ["Studio Collaboration", "Colaboración de estudio"]
    ];
    return titles.map(([en, es], index) => ({
      _id: `service-${index + 1}`,
      title: t(locale, en, es),
      description: t(
        locale,
        "Professional service tailored to your project.",
        "Servicio profesional adaptado a tu proyecto."
      ),
      pricing: t(locale, "On request", "Bajo consulta"),
      icon: "disc",
      features: [
        t(locale, "Bespoke approach", "Enfoque a medida"),
        t(locale, "Professional delivery", "Entrega profesional")
      ]
    }));
  },

  pressItems: () => [],

  pressEpk: ({ locale }) => ({
    pressPage: {
      _id: "pressPage",
      title: t(locale, "Press / EPK", "Press / EPK"),
      bio: [],
      pressPhotos: [],
      pressKitAssets: [],
      techRider: null,
      stagePlot: null,
      bookingsEmail: "bookings@coast2c.test",
      bookingsPhone: undefined,
      seo: {
        title: t(locale, "Press · Coast2c", "Prensa · Coast2c"),
        description: t(locale, "Press kit and EPK.", "Kit de prensa y EPK.")
      }
    },
    pressMentions: [],
    siteSettings: resolvers.siteSettings({ locale })
  }),

  aboutPage: ({ locale }) => ({
    _id: "aboutPage",
    title: t(locale, "About", "Acerca"),
    intro: t(
      locale,
      "Coast2c is a live modular techno project from Mexico City.",
      "Coast2c es un proyecto de techno modular en vivo desde la Ciudad de México."
    ),
    photo: undefined,
    photoAlt: t(locale, "Coast2c portrait", "Retrato de Coast2c"),
    bio: [],
    releases: [],
    equipmentGroups: [],
    influences: [],
    seo: {
      title: t(locale, "About · Coast2c", "Acerca · Coast2c"),
      description: t(
        locale,
        "Live modular techno, DJ sets, and sound design.",
        "Techno modular en vivo, sets de DJ y diseño sonoro."
      )
    }
  }),

  legalPage: ({ locale, slug }) => ({
    _id: `legal-${slug}`,
    title:
      slug === "privacy-policy"
        ? t(locale, "Privacy Policy", "Política de privacidad")
        : t(locale, "Terms", "Términos"),
    slug,
    subtitle: t(locale, "Last updated", "Última actualización"),
    lastUpdatedLabel: t(locale, "Last updated", "Última actualización"),
    lastUpdated: "2025-01-01",
    intro: t(
      locale,
      "Placeholder legal content for E2E fixtures.",
      "Contenido legal de muestra para fixtures de E2E."
    ),
    sections: [],
    seo: {
      title:
        slug === "privacy-policy"
          ? t(locale, "Privacy Policy · Coast2c", "Política de privacidad · Coast2c")
          : t(locale, "Terms · Coast2c", "Términos · Coast2c"),
      description: t(locale, "Legal information.", "Información legal.")
    }
  })
};

export function resolveFixture<TParams extends Record<string, unknown>, TResult>(
  def: QueryDefinition<TParams, TResult>
): TResult {
  const name: QueryName = def.name;
  const resolver = resolvers[name] as unknown as (p: AnyQueryDef["params"]) => TResult;
  if (!resolver) {
    throw new Error(`[sanity/fixtures] No fixture resolver registered for query "${name}"`);
  }
  return resolver(def.params);
}
