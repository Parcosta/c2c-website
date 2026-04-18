#!/usr/bin/env node
/**
 * Replace the home-page hero image with a local file.
 *
 *   npx tsx scripts/sanity/replace-hero-image.ts /absolute/or/relative/path/to/hero.jpg
 *
 *   # By default this is a DRY RUN. Set SEED_CONFIRM=1 to commit.
 *   SEED_CONFIRM=1 npx tsx scripts/sanity/replace-hero-image.ts ~/Downloads/figma-hero.jpg
 *
 * Why this is a separate script:
 *   - The main seed reuses Sanity image assets by `originalFilename`, which
 *     means swapping in a *new* hero image requires a fresh upload with a
 *     different filename. This script appends a timestamp to guarantee that.
 *   - It patches only the `hero.backgroundImage` field on the home page doc,
 *     so it doesn't touch anything else.
 */

import fs from "node:fs/promises";
import path from "node:path";

import { CONFIRMED, client, dryLog, imageRef } from "./shared";

async function main() {
  const srcArg = process.argv[2];
  if (!srcArg) {
    console.error(
      "❌ Usage: npx tsx scripts/sanity/replace-hero-image.ts <local-image-path>"
    );
    console.error(
      "   Example: npx tsx scripts/sanity/replace-hero-image.ts public/images/hero-figma.jpg"
    );
    process.exit(1);
  }

  const abs = path.resolve(srcArg);
  const buf = await fs.readFile(abs);
  const ext = path.extname(abs).slice(1).toLowerCase();
  const contentType =
    ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
  const stamped = `hero-${Date.now()}.${ext || "jpg"}`;

  console.log(
    `${CONFIRMED ? "▶️ " : "🟡 DRY-RUN"}  Upload ${abs} as "${stamped}" (${contentType}, ${buf.length} bytes)`
  );

  let assetId: string;
  if (!CONFIRMED) {
    assetId = `image-PENDING-${stamped}`;
  } else {
    const asset = await client.assets.upload("image", buf, {
      filename: stamped,
      contentType
    });
    assetId = asset._id;
    console.log(`▶️   Uploaded asset ${assetId}`);
  }

  dryLog("patch home-page.hero.backgroundImage", { assetId });
  if (CONFIRMED) {
    await client
      .patch("home-page")
      .set({ "hero.backgroundImage": imageRef(assetId) })
      .commit();
    console.log("✅ Hero image replaced.");
    console.log("   Restart the dev server (or let the webhook fire) to see it.");
  } else {
    console.log("✅ Dry run complete. Re-run with SEED_CONFIRM=1 to commit.");
  }
}

main().catch((err) => {
  console.error("❌ replace-hero-image failed:", err);
  process.exit(1);
});
