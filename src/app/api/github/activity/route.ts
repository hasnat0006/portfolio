import { parseGitHubEvents } from "@/utils/github-events";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const USERNAME = "hasnat0006";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

// ── In-memory cache (fast fallback) ──────────────────────────────────────────
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const STALE_TTL_MS = 60 * 60 * 1000; // serve stale up to 1 hour

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

let memoryCache: CacheEntry | null = null;

function getCached(): { data: unknown; stale: boolean } | null {
  if (!memoryCache) return null;
  const age = Date.now() - memoryCache.timestamp;
  if (age < CACHE_TTL_MS) return { data: memoryCache.data, stale: false };
  if (age < STALE_TTL_MS) return { data: memoryCache.data, stale: true };
  return null;
}

function setCache(data: unknown): void {
  memoryCache = { data, timestamp: Date.now() };
}

function isRateLimitError(res: Response): boolean {
  return res.status === 403 || res.status === 429;
}

const REST_HEADERS: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "portfolio-app",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

// ── GET handler ───────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = Math.min(parseInt(searchParams.get("per_page") ?? "30", 10), 100);

  // ── Check cache for page 1 ──────────────────────────────────────
  if (page === 1) {
    const cached = getCached();
    if (cached && !cached.stale) {
      return NextResponse.json(cached.data, {
        headers: { "X-Cache": "HIT" },
      });
    }
  }

  try {
    const url = `https://api.github.com/users/${USERNAME}/events/public?per_page=${perPage}&page=${page}`;

    const eventsRes = await fetch(url, {
      headers: REST_HEADERS,
      // Next.js data cache — ISR-compatible
      next: { revalidate: 600 }, // 10 minutes
    });

    // Handle rate limiting gracefully
    if (isRateLimitError(eventsRes)) {
      if (page === 1) {
        const cached = getCached();
        if (cached) {
          return NextResponse.json(cached.data, {
            headers: {
              "X-Cache": "STALE",
              "X-Cache-Warning": "GitHub API rate limited",
            },
          });
        }
      }

      const rateLimitRemaining = eventsRes.headers.get("X-RateLimit-Remaining");
      const rateLimitReset = eventsRes.headers.get("X-RateLimit-Reset");

      return NextResponse.json(
        {
          events: [],
          count: 0,
          hasMore: false,
          fetchedAt: new Date().toISOString(),
          error: `GitHub API rate limit exceeded. ${
            rateLimitReset
              ? `Resets at ${new Date(
                  parseInt(rateLimitReset) * 1000,
                ).toLocaleTimeString()}.`
              : "Please try again later."
          }`,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": rateLimitRemaining ?? "0",
            "X-RateLimit-Reset": rateLimitReset ?? "",
          },
        },
      );
    }

    if (!eventsRes.ok) {
      throw new Error(`GitHub API returned ${eventsRes.status}`);
    }

    const events = await eventsRes.json();

    // Check for pagination: GitHub includes Link header for next pages
    const linkHeader = eventsRes.headers.get("Link") ?? "";
    const hasMore = linkHeader.includes('rel="next"');

    const parsed = parseGitHubEvents(events);

    const responseBody = {
      events: parsed,
      count: parsed.length,
      hasMore,
      fetchedAt: new Date().toISOString(),
    };

    // Cache page 1
    if (page === 1) {
      setCache(responseBody);
    }

    return NextResponse.json(responseBody, {
      headers: {
        "Cache-Control": "public, max-age=600, s-maxage=600, stale-while-revalidate=3600",
        "X-Cache": "MISS",
      },
    });
  } catch (err) {
    console.error("GitHub activity error:", err);

    // Serve stale cache on errors
    if (page === 1) {
      const cached = getCached();
      if (cached) {
        return NextResponse.json(cached.data, {
          headers: {
            "X-Cache": "STALE",
            "X-Cache-Warning": "Server error, serving stale data",
          },
        });
      }
    }

    return NextResponse.json(
      {
        events: [],
        count: 0,
        hasMore: false,
        fetchedAt: new Date().toISOString(),
        error: "Failed to fetch GitHub activity. Please try again later.",
      },
      { status: 500 },
    );
  }
}
