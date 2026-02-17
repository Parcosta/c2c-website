import type { QueryParams } from "next-sanity";

import { client } from "@/sanity/client";

export const sanityCacheTag = "sanity";

export async function sanityFetch<TResult>(query: string, params: QueryParams = {}, options?: { tags?: string[] }) {
  const tags = options?.tags ?? [sanityCacheTag];
  return client.fetch<TResult>(query, params, { next: { tags } });
}

