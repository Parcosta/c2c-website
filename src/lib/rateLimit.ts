export type RateLimitCheckResult = Readonly<{
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAtMs: number;
  retryAfterSeconds: number | null;
}>;

export type InMemoryRateLimiter = Readonly<{
  check: (key: string) => RateLimitCheckResult;
  reset: () => void;
}>;

export type FixedWindowRateLimiter = Readonly<{
  check: (key: string, nowMs: number) => RateLimitCheckResult;
  reset: () => void;
}>;

type CreateInMemoryRateLimiterOptions = Readonly<{
  name: string;
  limit: number;
  windowMs: number;
}>;

type CreateFixedWindowRateLimiterOptions = Readonly<{
  limit: number;
  windowMs: number;
}>;

type RateLimitEntry = { count: number; resetAtMs: number };

function getStore(name: string): Map<string, RateLimitEntry> {
  const globalKey = `__c2cRateLimitStore:${name}`;
  const globalObj = globalThis as unknown as Record<string, unknown>;
  const existing = globalObj[globalKey];
  if (existing instanceof Map) return existing as Map<string, RateLimitEntry>;
  const created = new Map<string, RateLimitEntry>();
  globalObj[globalKey] = created;
  return created;
}

export function createInMemoryRateLimiter(
  options: CreateInMemoryRateLimiterOptions
): InMemoryRateLimiter {
  const store = getStore(options.name);

  function check(key: string): RateLimitCheckResult {
    const now = Date.now();
    const existing = store.get(key);

    if (!existing || now >= existing.resetAtMs) {
      const resetAtMs = now + options.windowMs;
      store.set(key, { count: 1, resetAtMs });
      return {
        allowed: true,
        limit: options.limit,
        remaining: Math.max(0, options.limit - 1),
        resetAtMs,
        retryAfterSeconds: null
      };
    }

    if (existing.count >= options.limit) {
      const retryAfterSeconds = Math.max(
        0,
        Math.ceil((existing.resetAtMs - now) / 1000)
      );
      return {
        allowed: false,
        limit: options.limit,
        remaining: 0,
        resetAtMs: existing.resetAtMs,
        retryAfterSeconds
      };
    }

    existing.count += 1;
    store.set(key, existing);
    return {
      allowed: true,
      limit: options.limit,
      remaining: Math.max(0, options.limit - existing.count),
      resetAtMs: existing.resetAtMs,
      retryAfterSeconds: null
    };
  }

  function reset() {
    store.clear();
  }

  return { check, reset };
}

export function createFixedWindowRateLimiter(
  options: CreateFixedWindowRateLimiterOptions
): FixedWindowRateLimiter {
  const store = new Map<string, RateLimitEntry>();

  function check(key: string, nowMs: number): RateLimitCheckResult {
    const existing = store.get(key);

    if (!existing || nowMs >= existing.resetAtMs) {
      const resetAtMs = nowMs + options.windowMs;
      store.set(key, { count: 1, resetAtMs });
      return {
        allowed: true,
        limit: options.limit,
        remaining: Math.max(0, options.limit - 1),
        resetAtMs,
        retryAfterSeconds: null
      };
    }

    if (existing.count >= options.limit) {
      const retryAfterSeconds = Math.max(0, Math.ceil((existing.resetAtMs - nowMs) / 1000));
      return {
        allowed: false,
        limit: options.limit,
        remaining: 0,
        resetAtMs: existing.resetAtMs,
        retryAfterSeconds
      };
    }

    existing.count += 1;
    store.set(key, existing);
    return {
      allowed: true,
      limit: options.limit,
      remaining: Math.max(0, options.limit - existing.count),
      resetAtMs: existing.resetAtMs,
      retryAfterSeconds: null
    };
  }

  function reset() {
    store.clear();
  }

  return { check, reset };
}

