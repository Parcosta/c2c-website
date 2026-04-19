import { getClient } from "@/sanity/client";
import type { QueryDefinition } from "@/sanity/queries";

/**
 * Next.js cache tag applied to every Sanity response. The `/api/revalidate`
 * webhook invalidates this tag on Sanity publish, so tagged fetches are
 * refreshed on the next request.
 */
export const SANITY_CACHE_TAG = "sanity";

type NextFetchOptions = {
  tags?: readonly string[];
  revalidate?: number | false;
};

/**
 * Tagged Sanity fetch. Always applies the "sanity" cache tag so
 * `revalidateTag("sanity")` in the webhook handler invalidates every
 * cached response we serve.
 *
 * Callers can merge additional tags or a revalidate interval via `next`.
 * The generic preserves the query-definition's param/result types end-to-end.
 */
export async function sanityFetch<TParams extends Record<string, unknown>, TResult>(
  def: QueryDefinition<TParams, TResult>,
  next: NextFetchOptions = {}
): Promise<TResult> {
  // E2E / local smoke tests can opt into fixture-backed fetches via this
  // flag. Dynamic import keeps the fixture module out of production bundles
  // when the flag isn't set.
  if (process.env.SANITY_USE_FIXTURES === "1") {
    const { resolveFixture } = await import("@/sanity/fixtures");
    return resolveFixture(def);
  }

  const tags = [SANITY_CACHE_TAG, ...(next.tags ?? [])];
  return getClient().fetch<TResult>(def.query, def.params, {
    next: { ...next, tags }
  });
}
