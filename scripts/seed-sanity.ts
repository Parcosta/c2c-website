#!/usr/bin/env node
/**
 * Sanity Seed Script
 *
 * Seeds initial data for C2C website development and E2E testing.
 * Run with: npx tsx scripts/seed-sanity.ts
 *
 * Requires SANITY_API_WRITE_TOKEN environment variable.
 */

import "dotenv/config";
import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u2aaya1a";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!TOKEN) {
  console.error("❌ Error: SANITY_API_WRITE_TOKEN environment variable is required");
  console.error(
    "\nGet your token from: https://www.sanity.io/manage/personal/project/" +
      PROJECT_ID +
      "/api#tokens"
  );
  console.error("\nThen run:");
  console.error("  SANITY_API_WRITE_TOKEN=your-token npx tsx scripts/seed-sanity.ts");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2026-02-17",
  token: TOKEN,
  useCdn: false
});

// Sample image URLs (using reliable placeholder service)
const SAMPLE_IMAGES = [
  "https://placehold.co/800x600/1a1a2e/4a4a6a?text=Live+Performance",
  "https://placehold.co/800x600/16213e/4a4a6a?text=DJ+Set",
  "https://placehold.co/800x600/0f3460/4a4a6a?text=Studio",
  "https://placehold.co/800x600/533483/4a4a6a?text=Event"
];

async function uploadImage(url: string, filename: string): Promise<string> {
  console.log(`📤 Uploading image: ${filename}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") || "image/jpeg";

  const asset = await client.assets.upload("image", Buffer.from(buffer), {
    filename,
    contentType
  });

  console.log(`✅ Uploaded: ${asset._id}`);
  return asset._id;
}

async function seedPortfolioItems(imageRefs: string[]) {
  console.log("\n🎨 Creating portfolio items...");

  const items = [
    {
      _type: "portfolioItem",
      _id: "portfolio-live-set-warehouse",
      title: {
        _type: "localeString",
        en: "Live Set at Warehouse",
        es: "Set en Vivo en Warehouse"
      },
      slug: {
        _type: "localeSlug",
        en: { _type: "slug", current: "live-set-warehouse" },
        es: { _type: "slug", current: "set-en-vivo-warehouse" }
      },
      category: {
        _type: "localeString",
        en: "Live Performance",
        es: "Performance en Vivo"
      },
      images: imageRefs.slice(0, 2).map((ref) => ({
        _type: "image",
        asset: { _type: "reference", _ref: ref }
      })),
      date: "2026-01-15T20:00:00Z",
      tags: ["live", "modular", "techno"]
    },
    {
      _type: "portfolioItem",
      _id: "portfolio-dj-set-festival",
      title: {
        _type: "localeString",
        en: "DJ Set at Spring Festival",
        es: "DJ Set en Festival de Primavera"
      },
      slug: {
        _type: "localeSlug",
        en: { _type: "slug", current: "dj-set-spring-festival" },
        es: { _type: "slug", current: "dj-set-festival-primavera" }
      },
      category: {
        _type: "localeString",
        en: "DJ Set",
        es: "Set de DJ"
      },
      images: imageRefs.slice(2, 4).map((ref) => ({
        _type: "image",
        asset: { _type: "reference", _ref: ref }
      })),
      date: "2025-12-20T22:00:00Z",
      tags: ["dj", "festival", "outdoor"]
    }
  ];

  for (const item of items) {
    await client.createOrReplace(item);
    console.log(`✅ Portfolio item: ${item.title.en}`);
  }
}

async function seedEvents() {
  console.log("\n📅 Creating events...");

  const events = [
    {
      _type: "event",
      _id: "event-spring-festival-2026",
      title: {
        _type: "localeString",
        en: "Spring Festival 2026",
        es: "Festival de Primavera 2026"
      },
      date: "2026-03-21T18:00:00Z",
      venue: {
        _type: "localeString",
        en: "The Underground",
        es: "The Underground"
      },
      city: {
        _type: "localeString",
        en: "Mexico City",
        es: "Ciudad de México"
      },
      country: {
        _type: "localeString",
        en: "Mexico",
        es: "México"
      },
      ticketUrl: "https://example.com/tickets/spring-festival"
    },
    {
      _type: "event",
      _id: "event-warehouse-session-march",
      title: {
        _type: "localeString",
        en: "Warehouse Session",
        es: "Sesión en Warehouse"
      },
      date: "2026-02-28T21:00:00Z",
      venue: {
        _type: "localeString",
        en: "Industrial Warehouse",
        es: "Bodega Industrial"
      },
      city: {
        _type: "localeString",
        en: "Guadalajara",
        es: "Guadalajara"
      },
      country: {
        _type: "localeString",
        en: "Mexico",
        es: "México"
      },
      ticketUrl: "https://example.com/tickets/warehouse-session"
    }
  ];

  for (const event of events) {
    await client.createOrReplace(event);
    console.log(`✅ Event: ${event.title.en}`);
  }
}

async function seedSiteSettings() {
  console.log("\n⚙️ Creating site settings...");

  const settings = {
    _type: "siteSettings",
    _id: "siteSettings",
    siteName: "Coast2Coast",
    socialLinks: [
      { _type: "socialLink", platform: "instagram", url: "https://instagram.com/coast2coast" },
      {
        _type: "socialLink",
        platform: "spotify",
        url: "https://open.spotify.com/artist/coast2coast"
      },
      { _type: "socialLink", platform: "soundcloud", url: "https://soundcloud.com/coast2coast" }
    ],
    seo: {
      _type: "seo",
      title: {
        _type: "localeString",
        en: "Coast2Coast | Live Modular Techno & DJ",
        es: "Coast2Coast | Techno Modular en Vivo & DJ"
      },
      description: {
        _type: "localeString",
        en: "Live modular techno & DJ sets. Bold sound, dark visuals, clean interface.",
        es: "Techno modular en vivo y sets de DJ. Sonido audaz, visuales oscuros, interfaz limpia."
      }
    }
  };

  await client.createOrReplace(settings);
  console.log("✅ Site settings created");
}

async function seedServices() {
  console.log("\n🎵 Creating services...");

  const services = [
    {
      _type: "service",
      _id: "service-live-hardware-techno",
      title: {
        _type: "localeString",
        en: "Live Hardware Techno Performance",
        es: "Performance de Techno Modular en Vivo"
      },
      description: {
        _type: "localeString",
        en: "100% hardware live techno sets with modular synthesizers and drum machines. No laptops—pure analog energy tailored to your venue.",
        es: "Sets de techno en vivo 100% hardware con sintetizadores modulares y cajas de ritmos. Sin laptops—energía puramente analógica adaptada a tu venue."
      },
      icon: "Zap",
      features: [
        { _type: "localeString", en: "100% hardware sets—no laptops", es: "Sets 100% hardware—sin laptops" },
        { _type: "localeString", en: "Original compositions tailored to venue", es: "Composiciones originales adaptadas al venue" },
        { _type: "localeString", en: "2+ hour performances", es: "Performances de 2+ horas" },
        { _type: "localeString", en: "Modular synth & analog drum machines", es: "Sintetizadores modulares y cajas de ritmos analógicas" }
      ],
      pricing: {
        _type: "localeString",
        en: "Contact for quote",
        es: "Contactar para cotización"
      }
    },
    {
      _type: "service",
      _id: "service-dj-hybrid",
      title: {
        _type: "localeString",
        en: "DJ Sets & Hybrid Live/DJ Performances",
        es: "Sets de DJ & Performances Híbridos Live/DJ"
      },
      description: {
        _type: "localeString",
        en: "Genre-fluid DJ sets spanning techno, electro, EBM, and leftfield. Hybrid performances blend live modular elements with curated selections.",
        es: "Sets de DJ fluidos de género que abarcan techno, electro, EBM y leftfield. Las performances híbridas mezclan elementos modulares en vivo con selecciones curadas."
      },
      icon: "Music",
      features: [
        { _type: "localeString", en: "Genre-fluid: techno, electro, EBM, leftfield", es: "Fluido de género: techno, electro, EBM, leftfield" },
        { _type: "localeString", en: "Hybrid sets with live modular elements", es: "Sets híbridos con elementos modulares en vivo" },
        { _type: "localeString", en: "Underground & experimental selections", es: "Selecciones underground y experimentales" },
        { _type: "localeString", en: "4+ hour extended sets available", es: "Sets extendidos de 4+ horas disponibles" }
      ],
      pricing: {
        _type: "localeString",
        en: "Contact for quote",
        es: "Contactar para cotización"
      }
    },
    {
      _type: "service",
      _id: "service-sound-design",
      title: {
        _type: "localeString",
        en: "Sound Design for Film, Video & Commercials",
        es: "Diseño de Sonido para Cine, Video y Comerciales"
      },
      description: {
        _type: "localeString",
        en: "Custom sound design and sonic branding for film, documentaries, commercials, and installations. From subtle ambiences to bold sonic signatures.",
        es: "Diseño de sonido y branding sónico personalizado para cine, documentales, comerciales e instalaciones. Desde ambientes sutiles hasta firmas sónicas audaces."
      },
      icon: "Film",
      features: [
        { _type: "localeString", en: "Film & documentary scoring", es: "Música para cine y documentales" },
        { _type: "localeString", en: "Commercial & advertising sonic branding", es: "Branding sónico para comerciales y publicidad" },
        { _type: "localeString", en: "Installation & spatial audio design", es: "Diseño de audio para instalaciones y audio espacial" },
        { _type: "localeString", en: "Modular synthesis for unique textures", es: "Síntesis modular para texturas únicas" }
      ],
      pricing: {
        _type: "localeString",
        en: "Contact for quote",
        es: "Contactar para cotización"
      }
    },
    {
      _type: "service",
      _id: "service-ableton-lessons",
      title: {
        _type: "localeString",
        en: "Ableton Live Lessons & Music Production Classes",
        es: "Clases de Ableton Live & Producción Musical"
      },
      description: {
        _type: "localeString",
        en: "Personalized 1-on-1 Ableton Live training for beginners and advanced producers. Learn electronic music production from an experienced artist.",
        es: "Entrenamiento personalizado 1-on-1 en Ableton Live para principiantes y productores avanzados. Aprende producción de música electrónica de un artista experimentado."
      },
      icon: "Laptop",
      features: [
        { _type: "localeString", en: "1-on-1 personalized training", es: "Entrenamiento personalizado 1-on-1" },
        { _type: "localeString", en: "Beginner & advanced tracks", es: "Niveles principiante y avanzado" },
        { _type: "localeString", en: "Arrangement, mixing & workflow", es: "Arreglos, mezcla y flujo de trabajo" },
        { _type: "localeString", en: "Online or in-person sessions", es: "Sesiones en línea o presenciales" }
      ],
      pricing: {
        _type: "localeString",
        en: "Contact for quote",
        es: "Contactar para cotización"
      }
    },
    {
      _type: "service",
      _id: "service-modular-workshops",
      title: {
        _type: "localeString",
        en: "Modular Synthesis Workshops & Eurorack Classes",
        es: "Talleres de Síntesis Modular & Clases de Eurorack"
      },
      description: {
        _type: "localeString",
        en: "Hands-on workshops for learning modular synthesis. From your first patch to advanced techno production techniques using hardware.",
        es: "Talleres prácticos para aprender síntesis modular. Desde tu primer patch hasta técnicas avanzadas de producción de techno usando hardware."
      },
      icon: "Sliders",
      features: [
        { _type: "localeString", en: '"First Patch" 3-hour intro workshop (max 6 people)', es: '"Primer Patch" taller introductorio de 3 horas (máx 6 personas)' },
        { _type: "localeString", en: '"Techno From Scratch" hardware production workshop', es: '"Techno Desde Cero" taller de producción con hardware' },
        { _type: "localeString", en: "One-on-one private lessons available", es: "Clases privadas 1-on-1 disponibles" },
        { _type: "localeString", en: "Subtractive synthesis & signal flow", es: "Síntesis substractiva y flujo de señal" }
      ],
      pricing: {
        _type: "localeString",
        en: "Contact for quote",
        es: "Contactar para cotización"
      }
    },
    {
      _type: "service",
      _id: "service-studio-consultation",
      title: {
        _type: "localeString",
        en: "Studio Consultation & Technical Services",
        es: "Consultoría de Estudio & Servicios Técnicos"
      },
      description: {
        _type: "localeString",
        en: "Expert guidance on studio setup, modular system planning, signal routing, and creative workflow optimization for electronic music production.",
        es: "Orientación experta en configuración de estudio, planificación de sistemas modulares, enrutamiento de señal y optimización de flujo de trabajo creativo para producción de música electrónica."
      },
      icon: "Settings",
      features: [
        { _type: "localeString", en: "Studio setup & acoustic consultation", es: "Configuración de estudio y consulta acústica" },
        { _type: "localeString", en: "Modular system planning & Eurorack consultation", es: "Planificación de sistemas modulares y consulta Eurorack" },
        { _type: "localeString", en: "Signal routing & patchbay design", es: "Enrutamiento de señal y diseño de patchbay" },
        { _type: "localeString", en: "Creative workflow optimization", es: "Optimización de flujo de trabajo creativo" }
      ],
      pricing: {
        _type: "localeString",
        en: "Contact for quote",
        es: "Contactar para cotización"
      }
    },
    {
      _type: "service",
      _id: "service-collaborations",
      title: {
        _type: "localeString",
        en: "Artistic Collaborations & Commissioned Work",
        es: "Colaboraciones Artísticas & Trabajos por Encargo"
      },
      description: {
        _type: "localeString",
        en: "Multidisciplinary collaborations spanning music, visual art, fashion, and technology. Custom synthesizer programming and experimental sound art commissions.",
        es: "Colaboraciones multidisciplinarias que abarcan música, arte visual, moda y tecnología. Programación de sintetizadores personalizados y comisiones de arte sonoro experimental."
      },
      icon: "Handshake",
      features: [
        { _type: "localeString", en: "Multidisciplinary art projects", es: "Proyectos de arte multidisciplinario" },
        { _type: "localeString", en: "Fashion show soundtracks & scoring", es: "Soundtracks y música para desfiles de moda" },
        { _type: "localeString", en: "Custom synthesizer programming", es: "Programación de sintetizadores personalizados" },
        { _type: "localeString", en: "Multimedia & installation art", es: "Arte multimedia e instalaciones" }
      ],
      pricing: {
        _type: "localeString",
        en: "Contact for quote",
        es: "Contactar para cotización"
      }
    }
  ];

  for (const service of services) {
    await client.createOrReplace(service);
    console.log(`✅ Service: ${service.title.en}`);
  }
}

async function main() {
  console.log("🌱 Seeding Sanity project...");
  console.log(`Project: ${PROJECT_ID}`);
  console.log(`Dataset: ${DATASET}\n`);

  try {
    // Upload sample images (with graceful fallback)
    console.log("📸 Uploading sample images...");
    const imageRefs: string[] = [];
    for (let i = 0; i < SAMPLE_IMAGES.length; i++) {
      try {
        const ref = await uploadImage(SAMPLE_IMAGES[i], `sample-${i + 1}.jpg`);
        imageRefs.push(ref);
      } catch (err) {
        console.warn(`⚠️ Failed to upload image ${i + 1}, skipping...`);
      }
    }

    if (imageRefs.length === 0) {
      console.warn("⚠️ No images uploaded. Portfolio items will be created without images.");
    }

    // Create documents
    await seedPortfolioItems(imageRefs);
    await seedEvents();
    await seedSiteSettings();
    await seedServices();

    console.log("\n✨ Seeding complete!");
    console.log("\nYou can now:");
    console.log("  • Run the dev server: npm run dev");
    console.log("  • Open Sanity Studio: npx sanity dev");
    console.log("  • Run E2E tests: npx playwright test");
    console.log("\n💡 Tip: Replace placeholder images with real photos in the Sanity Studio.");
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
