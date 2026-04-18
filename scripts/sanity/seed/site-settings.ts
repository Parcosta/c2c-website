import { CONFIRMED, client, dryLog, imageRef, shortKey } from "../shared";

const FIGMA_SOCIALS = [
  { platform: "instagram", url: "https://www.instagram.com/coast2c/" },
  { platform: "spotify", url: "https://open.spotify.com/artist/coast2c" },
  { platform: "soundcloud", url: "https://soundcloud.com/coast2c" },
  { platform: "bandcamp", url: "https://coast2c.bandcamp.com/" },
  { platform: "youtube", url: "https://www.youtube.com/@coast2c" },
  { platform: "x", url: "https://x.com/coast2c" },
  { platform: "facebook", url: "https://www.facebook.com/coast2c" }
];

export async function patchSiteSettings(logoAssetId: string): Promise<void> {
  const existing = await client.fetch<
    | { _id: string; logo?: unknown; siteName?: { en?: string; es?: string } }
    | null
  >(`*[_id == "siteSettings"][0]{_id, logo, siteName}`);

  const socialLinks = FIGMA_SOCIALS.map((item) => ({
    _key: shortKey(),
    _type: "socialLink" as const,
    platform: item.platform,
    url: item.url
  }));

  if (!existing) {
    dryLog("create siteSettings (did not exist)");
    if (CONFIRMED) {
      await client.createIfNotExists({
        _id: "siteSettings",
        _type: "siteSettings",
        siteName: { _type: "localeString", en: "Coast2c", es: "Coast2c" },
        logo: imageRef(logoAssetId),
        socialLinks,
        contactEmail: "hello@coast2c.com"
      });
    }
    return;
  }

  // Correct the artist moniker: anything set to "Coast2Coast" is stale and
  // must be replaced with "Coast2c" (the canonical name).
  const existingSiteName = existing.siteName ?? {};
  const correctedSiteName = {
    _type: "localeString" as const,
    en:
      !existingSiteName.en || /coast2coast/i.test(existingSiteName.en)
        ? "Coast2c"
        : existingSiteName.en,
    es:
      !existingSiteName.es || /coast2coast/i.test(existingSiteName.es)
        ? "Coast2c"
        : existingSiteName.es
  };

  const patch = client.patch(existing._id);
  patch.setIfMissing({ logo: imageRef(logoAssetId) });
  patch.set({ socialLinks, siteName: correctedSiteName });
  dryLog(
    'patch siteSettings (siteName → Coast2c, add logo if missing, replace socialLinks with 7 confirmed links)',
    { siteName: correctedSiteName }
  );
  if (CONFIRMED) {
    await patch.commit();
  }
}
