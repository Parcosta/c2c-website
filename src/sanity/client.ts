import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/config";

let _client: SanityClient | null = null;

export function getClient(): SanityClient {
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published"
    });
  }
  return _client;
}
