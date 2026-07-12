"use client";

import { SectionDivider } from "@/components/shared/SectionDivider";
import { useGitHubActivity } from "@/hooks/useGitHubActivity";
import type { ActivityFilter, ActivityItem } from "@/types/github";
import { filterByType, groupByDate } from "@/utils/github-events";
import { useMemo, useState } from "react";
import { ActivityEmptyState } from "./components/ActivityEmptyState";
import { ActivityErrorState } from "./components/ActivityErrorState";
import { ActivityFilterBar } from "./components/ActivityFilterBar";
import { ActivitySkeleton } from "./components/ActivitySkeleton";
import { ActivityTimeline } from "./components/ActivityTimeline";

export default function GitHubActivitySection() {
  const { loading, error, events, hasMore, loadMore, refresh } =
    useGitHubActivity();
  const [filter, setFilter] = useState<ActivityFilter>("all");

  const filtered = useMemo(
    () => filterByType(events, filter),
    [events, filter],
  );

  const grouped = useMemo(() => {
    const groups = groupByDate(filtered);
    return groups.map((g) => ({
      key: g.key,
      label: g.label,
      items: g.items,
    }));
  }, [filtered]);

  return (
    <section
      id="activity"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
      aria-label="GitHub Activity"
    >
      <div className="max-w-3xl mx-auto">
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

        {/* Filter bar */}
        <ActivityFilterBar active={filter} onChange={setFilter} />

        {/* Content area */}
        {loading && events.length === 0 ? (
          <ActivitySkeleton />
        ) : error && events.length === 0 ? (
          <ActivityErrorState message={error} onRetry={refresh} />
        ) : filtered.length === 0 ? (
          <ActivityEmptyState hasFilter={filter !== "all"} />
        ) : (
          <ActivityTimeline
            grouped={grouped}
            onLoadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
          />
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
              Showing {filtered.length} of {events.length} events
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
      </div>
    </section>
  );
}
