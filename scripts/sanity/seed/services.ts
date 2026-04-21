import { CONFIRMED, client, dryLog, replaceCollectionOfType } from "../shared";

/**
 * PRD-named services with Figma-derived descriptions as filler copy.
 * The "[Placeholder] …" prefix is intentional — it's a visible cue in the
 * Studio that the description hasn't been edited by the artist yet.
 */
const FILLER_PREFIX_EN = "[Placeholder] ";
const FILLER_PREFIX_ES = "[Texto provisional] ";

const SERVICES = [
  {
    _id: "service-c2c-produccion-musical",
    icon: "Music",
    title: { en: "Music Production", es: "Producción musical" },
    description: {
      en: "Complete production of electronic tracks using modular synthesis and experimental techniques.",
      es: "Producción completa de tracks electrónicos utilizando síntesis modular y técnicas experimentales."
    },
    features: {
      en: [
        "Original compositions in techno, ambient, and leftfield",
        "Full mixing and mastering",
        "Modular synthesis & analog workflow",
        "Remote or in-studio collaboration"
      ],
      es: [
        "Composiciones originales en techno, ambient y leftfield",
        "Mezcla y masterización completa",
        "Síntesis modular y workflow analógico",
        "Colaboración remota o en estudio"
      ]
    }
  },
  {
    _id: "service-c2c-diseno-sonoro",
    icon: "AudioWaveform",
    title: { en: "Sound Design", es: "Diseño sonoro" },
    description: {
      en: "Soundscapes for installations, performances, and audiovisual media.",
      es: "Creación de paisajes sonoros para instalaciones, performances y medios audiovisuales."
    },
    features: {
      en: [
        "Film, documentary, and commercial scoring",
        "Installation and spatial audio",
        "Custom sonic branding",
        "Modular synthesis for unique textures"
      ],
      es: [
        "Música para cine, documentales y comerciales",
        "Instalaciones y audio espacial",
        "Branding sónico personalizado",
        "Síntesis modular para texturas únicas"
      ]
    }
  },
  {
    _id: "service-c2c-talleres",
    icon: "Sliders",
    title: { en: "Workshops", es: "Talleres" },
    description: {
      en: "Hands-on modular synthesis classes — from your first patch to advanced techno production with hardware.",
      es: "Talleres prácticos sobre síntesis modular, desde conceptos básicos hasta técnicas avanzadas."
    },
    features: {
      en: [
        '"First Patch" 3-hour intro (max 6 people)',
        '"Techno From Scratch" hardware production workshop',
        "One-on-one private lessons available",
        "Subtractive synthesis & signal flow"
      ],
      es: [
        'Taller introductorio "Primer Patch" (3h, máx 6 personas)',
        '"Techno desde cero" taller de producción con hardware',
        "Clases privadas 1-on-1 disponibles",
        "Síntesis sustractiva y flujo de señal"
      ]
    }
  },
  {
    _id: "service-c2c-colaboracion-artistica",
    icon: "Handshake",
    title: { en: "Artistic Collaboration", es: "Colaboración artística" },
    description: {
      en: "Multidisciplinary projects across music, visual art, fashion, and technology.",
      es: "Colaboraciones para proyectos experimentales, instalaciones y performances multidisciplinarias."
    },
    features: {
      en: [
        "Multidisciplinary art projects",
        "Fashion-show scoring",
        "Custom synthesizer programming",
        "Multimedia and installation art"
      ],
      es: [
        "Proyectos de arte multidisciplinario",
        "Música para desfiles de moda",
        "Programación de sintetizadores personalizados",
        "Arte multimedia e instalaciones"
      ]
    }
  },
  {
    _id: "service-c2c-consulta-tecnica",
    icon: "Settings",
    title: { en: "Technical Consultation", es: "Consulta técnica" },
    description: {
      en: "Studio setup, modular system planning, signal routing, and workflow optimization for electronic music production.",
      es: "Asesoramiento en configuración de estudios, selección de equipo modular y workflows creativos."
    },
    features: {
      en: [
        "Studio & acoustic consultation",
        "Eurorack system planning",
        "Signal routing and patchbay design",
        "Creative workflow optimization"
      ],
      es: [
        "Configuración de estudio y acústica",
        "Planificación de sistemas Eurorack",
        "Enrutamiento de señal y patchbay",
        "Optimización de flujo de trabajo creativo"
      ]
    }
  }
];

export async function replaceServices(): Promise<void> {
  const keep = new Set(SERVICES.map((s) => s._id));
  await replaceCollectionOfType("service", keep, "service");

  for (const s of SERVICES) {
    const doc = {
      _id: s._id,
      _type: "service",
      title: { _type: "localeString", ...s.title },
      description: {
        _type: "localeText",
        en: FILLER_PREFIX_EN + s.description.en,
        es: FILLER_PREFIX_ES + s.description.es
      },
      icon: s.icon,
      features: s.features.en.map((en, i) => ({
        _type: "localeString",
        en,
        es: s.features.es[i]
      })),
      pricing: {
        _type: "localeString",
        en: "Contact for quote",
        es: "Contactar para cotización"
      }
    };
    dryLog(
      `createOrReplace service "${s.title.en}" (name confirmed; description is placeholder filler)`,
      { _id: s._id }
    );
    if (CONFIRMED) await client.createOrReplace(doc);
  }
}
