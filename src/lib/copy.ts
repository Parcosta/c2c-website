import type { Locale } from "@/lib/i18n";

export type SiteCopy = {
  brand: string;
  nav: {
    home: string;
    portfolio: string;
    contact: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    sections: {
      about: { title: string; body: string };
      music: { title: string; body: string };
      shows: { title: string; body: string };
      portfolio: { title: string; body: string; cta: string };
      contact: { title: string; body: string; cta: string };
    };
  };
  portfolio: {
    title: string;
    subtitle: string;
    filters: { all: string; live: string; dj: string; studio: string };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  notFound: { title: string; body: string; backHome: string };
};

const en: SiteCopy = {
  brand: "Coast2Coast",
  nav: { home: "Home", portfolio: "Portfolio", contact: "Contact" },
  home: {
    heroTitle: "Live modular techno & DJ sets",
    heroSubtitle: "Coast2Coast (C2C) — bold sound, dark visuals, clean interface.",
    sections: {
      about: {
        title: "About",
        body: "Modular techno performances with a focus on groove, texture, and energy."
      },
      music: {
        title: "Music",
        body: "Mixes, live recordings, and releases—curated and always evolving."
      },
      shows: {
        title: "Shows",
        body: "Upcoming dates, venues, and links—kept lightweight and fast."
      },
      portfolio: {
        title: "Portfolio",
        body: "Highlights across live sets, DJ gigs, and studio work.",
        cta: "View portfolio"
      },
      contact: {
        title: "Contact",
        body: "Bookings, collaborations, and press inquiries.",
        cta: "Send a message"
      }
    }
  },
  portfolio: {
    title: "Portfolio",
    subtitle: "Filter by category to explore selected work.",
    filters: { all: "All", live: "Live", dj: "DJ", studio: "Studio" }
  },
  contact: {
    title: "Contact",
    subtitle: "Send a quick message—no account required.",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Submit",
      sending: "Sending…",
      success: "Message sent. Thanks!",
      error: "Something went wrong. Please try again."
    }
  },
  notFound: {
    title: "Page not found",
    body: "That route doesn’t exist.",
    backHome: "Back to home"
  }
};

const es: SiteCopy = {
  brand: "Coast2Coast",
  nav: { home: "Inicio", portfolio: "Portafolio", contact: "Contacto" },
  home: {
    heroTitle: "Techno modular en vivo y sets de DJ",
    heroSubtitle: "Coast2Coast (C2C) — sonido audaz, visuales oscuros, interfaz limpia.",
    sections: {
      about: {
        title: "Acerca de",
        body: "Presentaciones de techno modular con foco en groove, textura y energía."
      },
      music: {
        title: "Música",
        body: "Mixes, grabaciones en vivo y lanzamientos—siempre en evolución."
      },
      shows: {
        title: "Fechas",
        body: "Próximos shows, venues y links—rápido y liviano."
      },
      portfolio: {
        title: "Portafolio",
        body: "Destacados de sets en vivo, gigs de DJ y trabajo de estudio.",
        cta: "Ver portafolio"
      },
      contact: {
        title: "Contacto",
        body: "Reservas, colaboraciones y prensa.",
        cta: "Enviar mensaje"
      }
    }
  },
  portfolio: {
    title: "Portafolio",
    subtitle: "Filtra por categoría para explorar trabajos seleccionados.",
    filters: { all: "Todos", live: "En vivo", dj: "DJ", studio: "Estudio" }
  },
  contact: {
    title: "Contacto",
    subtitle: "Envía un mensaje rápido—sin cuenta.",
    form: {
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      submit: "Enviar",
      sending: "Enviando…",
      success: "Mensaje enviado. ¡Gracias!",
      error: "Algo salió mal. Intenta de nuevo."
    }
  },
  notFound: {
    title: "Página no encontrada",
    body: "Esa ruta no existe.",
    backHome: "Volver al inicio"
  }
};

export function getCopy(locale: Locale): SiteCopy {
  return locale === "es" ? es : en;
}
