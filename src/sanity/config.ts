export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your-project-id";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const apiVersion = "2026-02-17";
export const studioUrl = "/studio";

export function hasSanityConfig() {
  return Boolean(projectId && projectId !== "your-project-id" && dataset);
}

export function assertSanityConfig() {
  if (!projectId || projectId === "your-project-id") {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }
  if (!dataset) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
  }
}

