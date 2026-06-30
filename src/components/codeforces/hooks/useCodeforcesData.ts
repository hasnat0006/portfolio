"use client";

import { useEffect, useRef, useState } from "react";
import type { CFApiResponse } from "../types";

const CACHE_KEY = "cf_dashboard_v4";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface CacheEntry {
  data: CFApiResponse;
  timestamp: number;
}

function readCache(): CFApiResponse | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(data: CFApiResponse): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() }),
    );
  } catch {
    // Quota exceeded or private browsing — silently skip
  }
}

export interface CodeforcesDataState {
  loading: boolean;
  error: string | null;
  data: CFApiResponse | null;
}

export function useCodeforcesData(): CodeforcesDataState {
  const [state, setState] = useState<CodeforcesDataState>({
    loading: true,
    error: null,
    data: null,
  });

  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    // Try localStorage cache first
    const cached = readCache();
    if (cached) {
      setState({ loading: false, error: null, data: cached });
      return;
    }

    fetch("/api/codeforces")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: CFApiResponse & { error?: string }) => {
        if (json.error) throw new Error(json.error);
        writeCache(json);
        setState({ loading: false, error: null, data: json });
      })
      .catch((err: Error) => {
        setState({
          loading: false,
          error: err.message || "Failed to load Codeforces data",
          data: null,
        });
      });
  }, []);

  return state;
}
