import {
  CONFIRMED,
  client,
  dryLog,
  imageRef,
  paragraphsToBlocks,
  replaceCollectionOfType,
  shortKey,
  uploadLocalImage
} from "../shared";

type FilterCategory = "musica" | "sonoro" | "video" | "mixes" | "dev";

interface PortfolioSeed {
  id: string;
  filename: string;
  filterCategory: FilterCategory;
  slug: { en: string; es: string };
  title: { en: string; es: string };
  /** Free-form display label shown on portfolio pages. */
  category: { en: string; es: string };
  description: { en: string; es: string };
  date: string;
  tags: string[];
}

// Mirrors the eight Figma-aligned projects that used to live as a hardcoded
// array in `ProjectsBlock`. Content is authored here (rather than in the
// Studio) so a fresh `SEED_CONFIRM=1 tsx scripts/seed-home.ts` always ends
// with the home page fully populated.
const PORTFOLIO_SEED: PortfolioSeed[] = [
  {
    id: "portfolioItem-fauna-reve",
    filename: "project-1.jpg",
    filterCategory: "musica",
    slug: { en: "fauna-reve", es: "fauna-reve" },
    title: { en: "Fauna Reve", es: "Fauna Reve" },
    category: { en: "Music", es: "Música" },
    description: {
      en: "A dreamlike release weaving modular textures with field recordings from the Mexican coast — a slow, hypnotic study of place and memory.",
      es: "Un lanzamiento onírico que entrelaza texturas modulares con grabaciones de campo de la costa mexicana — un estudio lento e hipnótico del lugar y la memoria."
    },
    date: "2026-02-10T12:00:00.000Z",
    tags: ["modular", "ambient", "techno"]
  },
  {
    id: "portfolioItem-modular-sessions",
    filename: "project-2.jpg",
    filterCategory: "sonoro",
    slug: { en: "modular-sessions", es: "sesiones-modulares" },
    title: { en: "Modular Sessions", es: "Sesiones Modulares" },
    category: { en: "Sound", es: "Sonoro" },
    description: {
      en: "Live modular synthesis performances exploring the edges of electronic music and improvisation.",
      es: "Performances de síntesis modular en vivo que exploran los límites de la música electrónica y la improvisación."
    },
    date: "2026-01-22T12:00:00.000Z",
    tags: ["modular", "live", "improvisation"]
  },
  {
    id: "portfolioItem-visual-landscapes",
    filename: "project-3.jpg",
    filterCategory: "video",
    slug: { en: "visual-landscapes", es: "paisajes-visuales" },
    title: { en: "Visual Landscapes", es: "Paisajes Visuales" },
    category: { en: "Video", es: "Video" },
    description: {
      en: "Audio-reactive visual installations combining generative art with live electronic music.",
      es: "Instalaciones visuales audio-reactivas que combinan arte generativo con música electrónica en vivo."
    },
    date: "2025-12-05T12:00:00.000Z",
    tags: ["video", "installation", "generative"]
  },
  {
    id: "portfolioItem-underground-mix",
    filename: "project-4.jpg",
    filterCategory: "mixes",
    slug: { en: "underground-mix", es: "underground-mix" },
    title: { en: "Underground Mix", es: "Underground Mix" },
    category: { en: "Mixes", es: "Mixes" },
    description: {
      en: "A curated selection of deep techno and ambient tracks for late-night listening sessions.",
      es: "Una selección curada de techno profundo y pistas ambient para sesiones de escucha nocturnas."
    },
    date: "2025-11-18T12:00:00.000Z",
    tags: ["mix", "techno", "ambient"]
  },
  {
    id: "portfolioItem-synth-toolkit",
    filename: "project-5.jpg",
    filterCategory: "dev",
    slug: { en: "synth-toolkit", es: "synth-toolkit" },
    title: { en: "Synth Toolkit", es: "Synth Toolkit" },
    category: { en: "Dev", es: "Dev" },
    description: {
      en: "Open-source Max/MSP patches and Ableton Live devices for electronic music production.",
      es: "Parches Max/MSP y dispositivos Ableton Live de código abierto para producción de música electrónica."
    },
    date: "2025-10-02T12:00:00.000Z",
    tags: ["dev", "max-msp", "ableton"]
  },
  {
    id: "portfolioItem-echoes-of-berlin",
    filename: "project-6.jpg",
    filterCategory: "musica",
    slug: { en: "echoes-of-berlin", es: "ecos-de-berlin" },
    title: { en: "Echoes of Berlin", es: "Ecos de Berlín" },
    category: { en: "Music", es: "Música" },
    description: {
      en: "Field recordings and sonic explorations from the streets and clubs of Berlin.",
      es: "Grabaciones de campo y exploraciones sonoras de las calles y clubes de Berlín."
    },
    date: "2025-08-14T12:00:00.000Z",
    tags: ["field-recording", "berlin", "ambient"]
  },
  {
    id: "portfolioItem-spatial-audio",
    filename: "project-7.jpg",
    filterCategory: "sonoro",
    slug: { en: "spatial-audio", es: "audio-espacial" },
    title: { en: "Spatial Audio", es: "Audio Espacial" },
    category: { en: "Sound", es: "Sonoro" },
    description: {
      en: "Immersive 8-channel sound design for installations and live performances.",
      es: "Diseño sonoro inmersivo de 8 canales para instalaciones y performances en vivo."
    },
    date: "2025-06-30T12:00:00.000Z",
    tags: ["spatial-audio", "installation", "sound-design"]
  },
  {
    id: "portfolioItem-code-and-sound",
    filename: "project-8.jpg",
    filterCategory: "dev",
    slug: { en: "code-and-sound", es: "codigo-y-sonido" },
    title: { en: "Code & Sound", es: "Código y Sonido" },
    category: { en: "Dev", es: "Dev" },
    description: {
      en: "Interactive web-based audio experiments using the Web Audio API and React.",
      es: "Experimentos de audio interactivos en la web usando la Web Audio API y React."
    },
    date: "2025-04-12T12:00:00.000Z",
    tags: ["dev", "web-audio", "react"]
  }
];

export async function replacePortfolioItems(): Promise<void> {
  const keepIds = new Set<string>();

  for (const item of PORTFOLIO_SEED) {
    const assetId = await uploadLocalImage(`public/images/${item.filename}`, item.filename);

    const doc = {
      _id: item.id,
      _type: "portfolioItem" as const,
      title: { _type: "localeString" as const, en: item.title.en, es: item.title.es },
      slug: {
        _type: "localeSlug" as const,
        en: { _type: "slug" as const, current: item.slug.en },
        es: { _type: "slug" as const, current: item.slug.es }
      },
      category: { _type: "localeString" as const, en: item.category.en, es: item.category.es },
      filterCategory: item.filterCategory,
      images: [{ _key: shortKey(), ...imageRef(assetId) }],
      description: {
        _type: "localeBlockContent" as const,
        en: paragraphsToBlocks(item.description.en),
        es: paragraphsToBlocks(item.description.es)
      },
      date: item.date,
      tags: item.tags
    };

    dryLog(`createOrReplace portfolioItem "${item.title.en}"`, { _id: doc._id });
    if (CONFIRMED) await client.createOrReplace(doc);
    keepIds.add(item.id);
  }

  await replaceCollectionOfType("portfolioItem", keepIds, "portfolio item");
}
