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
  const tags = [SANITY_CACHE_TAG, ...(next.tags ?? [])];
  return getClient().fetch<TResult>(def.query, def.params, {
    next: { ...next, tags }
  });
}
