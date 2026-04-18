#!/usr/bin/env node
/**
 * Thin orchestrator for the Coast2c Sanity seed. The module-per-domain
 * implementations live under `scripts/sanity/seed/`; this file only wires
 * them together.
 *
 *   # Preview what will change (DRY RUN — no writes)
 *   npx tsx scripts/seed-home.ts
 *
 *   # Commit for real
 *   SEED_CONFIRM=1 npx tsx scripts/seed-home.ts
 *
 * Optional flags:
 *   SEED_SERVICES=1   Replace all service documents (off by default — they
 *                     may carry richer canonical copy that the seed
 *                     doesn't know about).
 *   SEED_EVENTS=0     Skip the events re-seed (events are replaced by
 *                     default to keep demo dates fresh).
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local. Uploaded assets are
 * idempotent — re-running doesn't create duplicates.
 */

import {
  CONFIRMED,
  DATASET,
  PROJECT_ID,
  SEED_EVENTS,
  SEED_SERVICES,
  uploadLocalImage
} from "./sanity/shared";
import { upsertAboutPage } from "./sanity/seed/about-page";
import { replaceEvents } from "./sanity/seed/events";
import { uploadGalleryImages, upsertHomePage } from "./sanity/seed/home-page";
import { replaceServices } from "./sanity/seed/services";
import { patchSiteLabels } from "./sanity/seed/site-labels";
import { patchSiteSettings } from "./sanity/seed/site-settings";

async function main() {
  console.log("");
  console.log("════════════════════════════════════════════════════════════");
  console.log(`  Project:  ${PROJECT_ID}`);
  console.log(`  Dataset:  ${DATASET}`);
  console.log(`  Mode:     ${CONFIRMED ? "LIVE (will commit)" : "DRY RUN (no writes)"}`);
  console.log(`  Services: ${SEED_SERVICES ? "REPLACE with 5 PRD shells" : "skip (preserve existing)"}`);
  console.log(`  Events:   ${SEED_EVENTS ? "REPLACE with 4 Figma events" : "skip"}`);
  console.log("════════════════════════════════════════════════════════════");
  console.log("");

  try {
    console.log("── Uploading assets ─────────────────────────────────────────");
    const heroId = await uploadLocalImage("public/images/hero-image.jpg", "hero.jpg");
    const logoId = await uploadLocalImage(
      "public/images/logo-coast2c.svg",
      "logo-coast2c.svg"
    );
    const galleryIds = await uploadGalleryImages();

    console.log("\n── Home page ────────────────────────────────────────────────");
    await upsertHomePage(heroId, galleryIds);

    console.log("\n── About page ───────────────────────────────────────────────");
    await upsertAboutPage();

    console.log("\n── Site settings ────────────────────────────────────────────");
    await patchSiteSettings(logoId);

    console.log("\n── Site labels ──────────────────────────────────────────────");
    await patchSiteLabels();

    console.log("\n── Services ─────────────────────────────────────────────────");
    if (SEED_SERVICES) {
      await replaceServices();
    } else {
      console.log(
        "⏭  Skipped (pass SEED_SERVICES=1 to replace existing with the 5 PRD name-only shells)"
      );
    }

    console.log("\n── Events ───────────────────────────────────────────────────");
    if (SEED_EVENTS) {
      await replaceEvents();
    } else {
      console.log("⏭  Skipped (SEED_EVENTS=0)");
    }

    console.log("");
    if (!CONFIRMED) {
      console.log("✅ Dry run complete. Re-run with SEED_CONFIRM=1 to commit for real.");
    } else {
      console.log("✅ Seeded.");
      console.log(
        "   If a Sanity webhook is configured to hit /api/revalidate, the live site will refresh automatically."
      );
      console.log("   Otherwise, restart `npm run dev` to pick up changes locally.");
    }
  } catch (err) {
    console.error("\n❌ Seed failed:", err);
    process.exit(1);
  }
}

main();
