"use client";

import { LOCAL_CACHE_TTL_MS } from "@/constants";
import type { ActivityItem, GitHubActivityResponse } from "@/types/github";
import { useEffect, useRef, useState } from "react";

const CACHE_KEY = "gh_activity_v1";

interface CacheEntry {
  data: ActivityItem[];
  timestamp: number;
}

function readCache(): ActivityItem[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > LOCAL_CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(data: ActivityItem[]): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() }),
    );
  } catch {
    // quota exceeded — skip
  }
}

export interface GitHubActivityState {
  loading: boolean;
  error: string | null;
  events: ActivityItem[];
  hasMore: boolean;
  /** Load the next page of events. */
  loadMore: () => void;
  /** Refetch from scratch. */
  refresh: () => void;
}

export function useGitHubActivity(): GitHubActivityState {
  const [events, setEvents] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetched = useRef(false);

  const fetchPage = async (pageNum: number, append = false) => {
    try {
      const res = await fetch(
        `/api/github/activity?page=${pageNum}&per_page=30`,
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const json: GitHubActivityResponse = await res.json();
      return json;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (fetched.current && refreshKey === 0) return;
    fetched.current = true;

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      // Try cache for page 1
      if (page === 1 && refreshKey === 0) {
        const cached = readCache();
        if (cached) {
          setEvents(cached);
          setLoading(false);
          return;
        }
      }

      try {
        const json = await fetchPage(page);

        if (cancelled) return;

        setEvents((prev) =>
          page === 1 ? json.events : [...prev, ...json.events],
        );
        setHasMore(json.hasMore);
        setError(json.error ?? null);

        // Cache page 1 results
        if (page === 1) {
          writeCache(json.events);
        }
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Failed to load GitHub activity",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [page, refreshKey]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  };

  const refresh = () => {
    setPage(1);
    setEvents([]);
    setRefreshKey((k) => k + 1);
    fetched.current = false;
  };

  return { loading, error, events, hasMore, loadMore, refresh };
}
