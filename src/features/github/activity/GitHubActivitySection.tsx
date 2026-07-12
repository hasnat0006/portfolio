"use client";

import { useGitHubActivity } from "@/hooks/useGitHubActivity";
import type { ActivityFilter } from "@/types/github";
import { filterByType, groupByDate } from "@/utils/github-events";
import { useMemo, useState } from "react";
import { ActivityEmptyState } from "./components/ActivityEmptyState";
import { ActivityErrorState } from "./components/ActivityErrorState";
import { ActivityFilterBar } from "./components/ActivityFilterBar";
import { ActivitySkeleton } from "./components/ActivitySkeleton";
import { ActivityTimeline } from "./components/ActivityTimeline";

const MAX_VISIBLE = 7;

interface GitHubActivitySectionProps {
  compact?: boolean;
}

export default function GitHubActivitySection({
  compact = false,
}: GitHubActivitySectionProps) {
  const { loading, error, events, refresh } = useGitHubActivity();
  const [filter, setFilter] = useState<ActivityFilter>("all");

  const filtered = useMemo(
    () => filterByType(events, filter),
    [events, filter],
  );

  const visible = useMemo(() => filtered.slice(0, MAX_VISIBLE), [filtered]);

  const grouped = useMemo(() => {
    const groups = groupByDate(visible);
    return groups.map((g) => ({
      key: g.key,
      label: g.label,
      items: g.items,
    }));
  }, [visible]);

  // ── Shared content: filter bar + timeline ────────────────────────────────
  const content = (
    <>
      {/* Filter bar */}
      <ActivityFilterBar active={filter} onChange={setFilter} />

      {/* Content area */}
      {loading && events.length === 0 ? (
        <ActivitySkeleton />
      ) : error && events.length === 0 ? (
        <ActivityErrorState message={error} onRetry={refresh} />
      ) : visible.length === 0 ? (
        <ActivityEmptyState hasFilter={filter !== "all"} />
      ) : (
        <ActivityTimeline grouped={grouped} />
      )}

      {/* Metadata footer */}
      {events.length > 0 && (
        <div
          className="mt-6 pt-3 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border-primary)" }}
        >
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            Showing {visible.length} of {filtered.length} recent events
          </span>
          <button
            onClick={refresh}
            className="text-[10px] font-mono hover:underline transition-colors"
            style={{ color: "var(--text-accent)" }}
          >
            Refresh
          </button>
        </div>
      )}
    </>
  );

  // ── Compact mode: content in a contained card for grid layout ──────────
  if (compact) {
    return (
      <div
        className="rounded-xl p-3 md:p-4 overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      >
        {content}
      </div>
    );
  }

  // ── Standalone mode: full section with header ───────────────────────────
  return (
    <section
      id="activity"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
      aria-label="GitHub Activity"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-8">
          <h2
            className="text-heading text-2xl md:text-3xl mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            GitHub Activity
          </h2>
          <p
            className="text-body text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Recent public activity across all repositories
          </p>
        </div>

        {content}
      </div>
    </section>
  );
}
