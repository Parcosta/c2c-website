import { describe, expect, it, vi, beforeEach } from "vitest";

import { sanityFetch, SANITY_CACHE_TAG } from "@/sanity/fetch";
import type { QueryDefinition } from "@/sanity/queries";

const fetchMock = vi.fn();
vi.mock("@/sanity/client", () => ({
  getClient: () => ({ fetch: fetchMock })
}));

function makeDef<T>(): QueryDefinition<{ locale: string; id: string }, T> {
  return {
    name: "homepage",
    query: "*[_id == $id][0]",
    params: { locale: "en", id: "some-doc" }
  };
}

describe("sanityFetch", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({ ok: true });
  });

  it("passes query and params through to the client fetch", async () => {
    const def = makeDef<{ ok: boolean }>();
    await sanityFetch(def);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [q, p] = fetchMock.mock.calls[0];
    expect(q).toBe(def.query);
    expect(p).toEqual(def.params);
  });

  it("always applies the 'sanity' cache tag", async () => {
    const def = makeDef<{ ok: boolean }>();
    await sanityFetch(def);

    const opts = fetchMock.mock.calls[0][2] as { next?: { tags?: readonly string[] } };
    expect(opts.next?.tags).toEqual([SANITY_CACHE_TAG]);
  });

  it("merges caller-provided tags after the default tag", async () => {
    const def = makeDef<{ ok: boolean }>();
    await sanityFetch(def, { tags: ["homepage", "press"] });

    const opts = fetchMock.mock.calls[0][2] as { next?: { tags?: readonly string[] } };
    expect(opts.next?.tags).toEqual([SANITY_CACHE_TAG, "homepage", "press"]);
  });

  it("forwards revalidate interval when provided", async () => {
    const def = makeDef<{ ok: boolean }>();
    await sanityFetch(def, { revalidate: 60 });

    const opts = fetchMock.mock.calls[0][2] as {
      next?: { revalidate?: number; tags?: readonly string[] };
    };
    expect(opts.next?.revalidate).toBe(60);
    expect(opts.next?.tags).toEqual([SANITY_CACHE_TAG]);
  });

  it("returns the fetched value", async () => {
    fetchMock.mockResolvedValue({ value: 42 });
    const result = await sanityFetch(makeDef<{ value: number }>());
    expect(result).toEqual({ value: 42 });
  });
});
