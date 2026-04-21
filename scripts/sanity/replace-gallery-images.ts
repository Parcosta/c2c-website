import "dotenv/config";

import { CONFIRMED, client, dryLog, imageRef, uploadLocalImage } from "./shared";

const GALLERY_FILENAMES = [
  "gallery-1.jpg",
  "gallery-2.jpg",
  "gallery-3.jpg",
  "gallery-4.jpg",
  "gallery-5.jpg",
  "gallery-6.jpg"
];

async function main() {
  console.log("\n── Replacing home page gallery images ──────────────────────────");
  const ids: string[] = [];
  for (const filename of GALLERY_FILENAMES) {
    const id = await uploadLocalImage(`public/images/${filename}`, filename);
    ids.push(id);
  }

  const images = ids.map((id, index) => ({
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

  dryLog("patch home-page.homeSections.gallerySection.images", { count: images.length });
  if (!CONFIRMED) return;

  await client.patch("home-page").set({ "homeSections.gallerySection.images": images }).commit();

  console.log("✅ Gallery images replaced.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
