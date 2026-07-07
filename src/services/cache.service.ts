import { CACHE_TTL_MS, STALE_TTL_MS } from "@/constants";

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

interface CacheResult {
  data: unknown;
  stale: boolean;
}

/**
 * Creates an in-memory cache for API route handlers.
 * Supports fresh hits, stale-but-available, and expired eviction.
 */
export function createMemoryCache() {
  let memoryCache: CacheEntry | null = null;

  function getCached(): CacheResult | null {
    if (!memoryCache) return null;

    const age = Date.now() - memoryCache.timestamp;
    if (age < CACHE_TTL_MS) return { data: memoryCache.data, stale: false };
    if (age < STALE_TTL_MS) return { data: memoryCache.data, stale: true };
    return null;
  }

  function setCache(data: unknown): void {
    memoryCache = { data, timestamp: Date.now() };
  }

  function invalidate(): void {
    memoryCache = null;
  }

  return { getCached, setCache, invalidate };
}
