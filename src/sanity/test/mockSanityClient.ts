export type SanityFetch = <T>(query: string, params?: Record<string, unknown>) => Promise<T>;

export type MockSanityClient = {
  fetch: SanityFetch;
};

export function createMockSanityClient(fetchImpl: SanityFetch): MockSanityClient {
  return { fetch: fetchImpl };
}
