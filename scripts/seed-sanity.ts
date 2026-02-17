#!/usr/bin/env node
/**
 * Sanity Seed Script
 * 
 * Seeds initial data for C2C website development and E2E testing.
 * Run with: npx tsx scripts/seed-sanity.ts
 * 
 * Requires SANITY_API_WRITE_TOKEN environment variable.
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u2aaya1a";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!TOKEN) {
  console.error("❌ Error: SANITY_API_WRITE_TOKEN environment variable is required");
  console.error("\nGet your token from: https://www.sanity.io/manage/personal/project/" + PROJECT_ID + "/api#tokens");
  console.error("\nThen run:");
  console.error("  SANITY_API_WRITE_TOKEN=your-token npx tsx scripts/seed-sanity.ts");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2026-02-17",
  token: TOKEN,
  useCdn: false,
});

// Sample image URLs (using placeholder images)
const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1571266028243-37160d7fec39?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
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
    contentType,
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
      images: imageRefs.slice(0, 2).map(ref => ({
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
      images: imageRefs.slice(2, 4).map(ref => ({
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
      { _type: "socialLink", platform: "spotify", url: "https://open.spotify.com/artist/coast2coast" },
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
      _id: "service-live-performance",
      title: {
        _type: "localeString",
        en: "Live Performance",
        es: "Performance en Vivo"
      },
      description: {
        _type: "localeString",
        en: "Modular techno live set with Eurorack synthesizers and drum machines.",
        es: "Set de techno modular en vivo con sintetizadores Eurorack y cajas de ritmos."
      },
      icon: "Zap",
      features: [
        { _type: "localeString", en: "2+ hour performance", es: "Performance de 2+ horas" },
        { _type: "localeString", en: "Custom visual setup", es: "Setup visual personalizado" },
        { _type: "localeString", en: "Sound system consultation", es: "Consulta de sistema de sonido" }
      ]
    },
    {
      _type: "service",
      _id: "service-dj-set",
      title: {
        _type: "localeString",
        en: "DJ Set",
        es: "Set de DJ"
      },
      description: {
        _type: "localeString",
        en: "Deep house and techno DJ set, tailored to your venue and crowd.",
        es: "Set de DJ de deep house y techno, adaptado a tu venue y público."
      },
      icon: "Music",
      features: [
        { _type: "localeString", en: "4+ hour set", es: "Set de 4+ horas" },
        { _type: "localeString", en: "Genre flexibility", es: "Flexibilidad de género" },
        { _type: "localeString", en: "High-quality equipment", es: "Equipo de alta calidad" }
      ]
    },
    {
      _type: "service",
      _id: "service-studio-production",
      title: {
        _type: "localeString",
        en: "Studio Production",
        es: "Producción en Estudio"
      },
      description: {
        _type: "localeString",
        en: "Original tracks, remixes, and sound design for your project.",
        es: "Pistas originales, remixes y diseño de sonido para tu proyecto."
      },
      icon: "Mic",
      features: [
        { _type: "localeString", en: "Original composition", es: "Composición original" },
        { _type: "localeString", en: "Remix services", es: "Servicios de remix" },
        { _type: "localeString", en: "Sound design", es: "Diseño de sonido" }
      ]
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
    // Upload sample images
    console.log("📸 Uploading sample images...");
    const imageRefs: string[] = [];
    for (let i = 0; i < SAMPLE_IMAGES.length; i++) {
      const ref = await uploadImage(SAMPLE_IMAGES[i], `sample-${i + 1}.jpg`);
      imageRefs.push(ref);
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
    
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
