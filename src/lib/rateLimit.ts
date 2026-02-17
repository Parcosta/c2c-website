export type RateLimitResult =
  | {
      allowed: true;
      limit: number;
      remaining: number;
      resetAt: number;
    }
  | {
      allowed: false;
      limit: number;
      remaining: 0;
      resetAt: number;
      retryAfterSeconds: number;
    };

type FixedWindowOptions = {
  limit: number;
  windowMs: number;
  maxEntries?: number;
};

type Entry = {
  count: number;
  resetAt: number;
  lastSeenAt: number;
};

export function createFixedWindowRateLimiter(options: FixedWindowOptions) {
  const { limit, windowMs, maxEntries = 10_000 } = options;
  const store = new Map<string, Entry>();

  function prune(now: number) {
    if (store.size <= maxEntries) return;
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) store.delete(key);
    }
    if (store.size <= maxEntries) return;
    const entries = Array.from(store.entries()).sort((a, b) => a[1].lastSeenAt - b[1].lastSeenAt);
    for (const [key] of entries.slice(0, Math.max(1, store.size - maxEntries))) {
      store.delete(key);
    }
  }

  function check(key: string, now = Date.now()): RateLimitResult {
    const safeKey = key.trim() || "unknown";
    prune(now);

    const existing = store.get(safeKey);
    if (existing == null || now > existing.resetAt) {
      const resetAt = now + windowMs;
      store.set(safeKey, { count: 1, resetAt, lastSeenAt: now });
      return { allowed: true, limit, remaining: Math.max(0, limit - 1), resetAt };
    }

    existing.lastSeenAt = now;
    existing.count += 1;

    const remaining = Math.max(0, limit - existing.count);
    if (existing.count <= limit) {
      return { allowed: true, limit, remaining, resetAt: existing.resetAt };
    }

    const retryAfterSeconds = Math.max(0, Math.ceil((existing.resetAt - now) / 1000));
    return { allowed: false, limit, remaining: 0, resetAt: existing.resetAt, retryAfterSeconds };
  }

  function clear() {
    store.clear();
  }

  return { check, clear };
}

