/**
 * Shared helpers for seed scripts.
 *
 * Every seed module imports `client`, `dryLog`, and (optionally) the
 * reuse-by-filename asset helpers from here so configuration + token
 * handling stays in one place.
 */

import { config as loadEnv } from "dotenv";
import { createClient, type SanityClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

// Load .env.local first (if present), then .env. Earlier entries win.
loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv();

export const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u2aaya1a";
export const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

export const CONFIRMED = process.env.SEED_CONFIRM === "1";

/** Defaults that keep destructive operations off unless explicitly enabled. */
export const SEED_SERVICES = process.env.SEED_SERVICES === "1";
export const SEED_EVENTS = process.env.SEED_EVENTS !== "0";

if (!TOKEN) {
  console.error("❌ SANITY_API_WRITE_TOKEN not set in environment.");
  console.error(
    `   Generate one at https://www.sanity.io/manage/personal/project/${PROJECT_ID}/api#tokens`
  );
  console.error("   with Editor permissions, then add it to .env.local:");
  console.error("     SANITY_API_WRITE_TOKEN=sk…");
  process.exit(1);
}

export const client: SanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2026-02-17",
  token: TOKEN,
  useCdn: false
});

export const shortKey = (): string => randomUUID().replace(/-/g, "").slice(0, 12);

export const dryLog = (action: string, detail?: unknown): void => {
  const prefix = CONFIRMED ? "▶️ " : "🟡 DRY-RUN";
  const suffix = detail ? `  ${JSON.stringify(detail).slice(0, 220)}` : "";
  console.log(`${prefix}  ${action}${suffix}`);
};

/* ---------------------------------------------------------------------- */
/*                              Asset helpers                             */
/* ---------------------------------------------------------------------- */

async function findAssetIdByFilename(filename: string): Promise<string | null> {
  const query = `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`;
  const id = await client.fetch<string | null>(query, { filename });
  return id ?? null;
}

/**
 * Upload a local image file to Sanity (or return the existing asset ID if
 * one with the same `originalFilename` already lives in the dataset).
 * Re-runs are idempotent — running the seed twice doesn't create duplicates.
 */
export async function uploadLocalImage(
  relPath: string,
  publishedFilename: string
): Promise<string> {
  const existing = await findAssetIdByFilename(publishedFilename);
  if (existing) {
    dryLog(`reuse asset "${publishedFilename}"`, { _id: existing });
    return existing;
  }

  const abs = path.resolve(relPath);
  const buf = await fs.readFile(abs);
  const ext = path.extname(relPath).slice(1).toLowerCase();
  const contentType =
    ext === "svg"
      ? "image/svg+xml"
      : ext === "png"
        ? "image/png"
        : ext === "webp"
          ? "image/webp"
          : "image/jpeg";

  if (!CONFIRMED) {
    dryLog(`upload "${publishedFilename}" (${contentType}, ${buf.length} bytes)`);
    return `image-PENDING-${publishedFilename}`;
  }

  const asset = await client.assets.upload("image", buf, {
    filename: publishedFilename,
    contentType
  });
  dryLog(`uploaded "${publishedFilename}"`, { _id: asset._id });
  return asset._id;
}

export function imageRef(assetId: string) {
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: assetId }
  };
}

export async function replaceCollectionOfType(
  type: string,
  keepIds: Set<string>,
  label: string
): Promise<void> {
  const existingIds = await client.fetch<string[]>(
    `*[_type == $type && !(_id in path("drafts.**"))]._id`,
    { type }
  );
  const toDelete = existingIds.filter((id) => !keepIds.has(id));
  dryLog(
    `delete ${toDelete.length} stale ${label} (of ${existingIds.length} existing)`,
    toDelete
  );
  if (!toDelete.length || !CONFIRMED) return;

  const tx = client.transaction();
  toDelete.forEach((id) => tx.delete(id));
  await tx.commit();
}

export function paragraphsToBlocks(text: string) {
  return text
    .trim()
    .split(/\n\n+/)
    .filter(Boolean)
    .map((para) => ({
      _key: shortKey(),
      _type: "block" as const,
      style: "normal" as const,
      markDefs: [],
      children: [
        {
          _key: shortKey(),
          _type: "span" as const,
          text: para.replace(/\s+/g, " ").trim(),
          marks: [] as string[]
        }
      ]
    }));
}
