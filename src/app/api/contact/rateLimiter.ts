import { createFixedWindowRateLimiter } from "@/lib/rateLimit";

export const contactRateLimiter = createFixedWindowRateLimiter({
  limit: 5,
  windowMs: 60_000
});
