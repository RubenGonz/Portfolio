type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

/**
 * Minimal in-memory fixed-window rate limiter. Returns `true` when the call is
 * allowed, `false` when the limit for `key` is exceeded within `windowMs`.
 *
 * Note: on serverless the state lives per-instance and resets on cold start, so
 * this mitigates bursts rather than enforcing a hard global limit. For strict
 * cross-instance limits back it with a shared store (e.g. Upstash Redis).
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow unbounded.
  if (buckets.size > 5000) {
    for (const [k, e] of buckets) if (now > e.resetAt) buckets.delete(k);
  }

  const entry = buckets.get(key);
  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

/** First IP from the x-forwarded-for header, or "unknown". */
export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
