"use client";

import { ActivityIcon } from "./ActivityIcon";
import type { ActivityItem, ActivityType } from "@/types/github";
import { timeAgo } from "@/utils/timeAgo";
import { motion } from "framer-motion";
import { GitCommit } from "lucide-react";

interface ActivityTimelineProps {
  grouped: {
    key: string;
    label: string;
    items: ActivityItem[];
  }[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

/** Color mapping for the timeline dot and connector. */
function getTypeColor(type: ActivityType): string {
  const map: Record<string, string> = {
    push: "#10b981",
    pr: "#8b5cf6",
    pr_review: "#a78bfa",
    issue: "#f59e0b",
    issue_comment: "#f59e0b",
    create: "#3b82f6",
    delete: "#ef4444",
    release: "#f97316",
    fork: "#64748b",
    star: "#eab308",
    public: "#06b6d4",
    commit_comment: "#64748b",
    wiki: "#14b8a6",
    unknown: "var(--text-muted)",
  };
  return map[type] ?? "var(--text-muted)";
}

function ActivityRow({ item, index }: { item: ActivityItem; index: number }) {
  const color = getTypeColor(item.type);

  return (
    <motion.li
      className="relative flex items-start gap-3 py-2.5 group"
      initial={{ opacity: 0, x: -12 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: index * 0.035,
          duration: 0.4,
          ease: "easeOut",
        },
      }}
    >
      {/* Timeline dot */}
      <div className="relative z-10 mt-0.5 flex flex-col items-center">
        <div
          className="w-[26px] h-[26px] rounded-md flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: `${color}18`,
            color,
          }}
          aria-hidden="true"
        >
          <ActivityIcon type={item.type} size={13} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p
              className="text-xs font-medium leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <a
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono hover:underline transition-colors"
                style={{ color: "var(--text-accent)" }}
              >
                {item.repo}
              </a>
              {item.isProject && (
                <span
                  className="text-[8px] font-mono px-1 py-0.5 rounded-sm uppercase tracking-wider"
                  style={{
                    background: "rgba(52,211,153,0.12)",
                    color: "var(--text-accent)",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  Project
                </span>
              )}
            </div>
          </div>

          {/* Timestamp */}
          <span
            className="text-[10px] font-mono shrink-0 mt-0.5"
            style={{ color: "var(--text-muted)" }}
            title={new Date(item.date).toLocaleString()}
          >
            {timeAgo(item.date)}
          </span>
        </div>

        {/* Commit messages for push events */}
        {item.type === "push" && item.commitMessages && item.commitMessages.length > 0 && (
          <div
            className="mt-1.5 rounded-md p-2 space-y-1"
            style={{
              background: "var(--bg-code)",
              border: "1px solid var(--border-primary)",
            }}
          >
            {item.commitMessages.slice(0, 3).map((msg, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[10px] font-mono leading-tight">
                <GitCommit size={10} className="shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }} />
                <span style={{ color: "var(--text-secondary)" }}>
                  {msg.length > 72 ? msg.slice(0, 72) + "…" : msg}
                </span>
              </div>
            ))}
            {item.hasMoreCommits && (
              <a
                href={item.url ?? item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono inline-block mt-1 hover:underline"
                style={{ color: "var(--text-accent)" }}
              >
                View more commits →
              </a>
            )}
          </div>
        )}
      </div>
    </motion.li>
  );
}

// ── Date group header ──────────────────────────────────────────────────────────

function DateGroupHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span
        className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: "var(--border-primary)" }}
      />
    </div>
  );
}

// ── Timeline entry for a date group (today/yesterday/this week/older) ──────────

interface DateGroupTimelineProps {
  label: string;
  items: ActivityItem[];
}

function DateGroupTimeline({ label, items }: DateGroupTimelineProps) {
  return (
    <div className="mb-2">
      <DateGroupHeader label={label} />
      <div className="relative">
        {/* Vertical connector line */}
        <div
          className="absolute left-[12px] top-3 bottom-3 w-px"
          style={{ background: "var(--border-primary)" }}
          aria-hidden="true"
        />
        <ul className="space-y-0" role="list">
          {items.map((item, i) => (
            <ActivityRow key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Main timeline component ────────────────────────────────────────────────────

interface ActivityTimelineProps {
  grouped: { key: string; label: string; items: ActivityItem[] }[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export function ActivityTimeline({
  grouped,
  onLoadMore,
  hasMore,
  loading,
}: ActivityTimelineProps) {
  if (grouped.length === 0) return null;

  return (
    <div id="activity-timeline-panel" role="tabpanel">
      {grouped.map((group) => (
        <DateGroupTimeline
          key={group.key}
          label={group.label}
          items={group.items}
        />
      ))}

      {/* Load more */}
      {hasMore && !loading && onLoadMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={onLoadMore}
            className="px-4 py-2 rounded-md text-xs font-mono transition-all duration-200 hover:scale-[1.02]"
            style={{
              color: "var(--text-accent)",
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
            }}
          >
            Load More Activity
          </button>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-4">
          <div
            className="w-5 h-5 rounded-sm animate-spin"
            style={{
              border: "2px solid var(--border-primary)",
              borderTopColor: "var(--text-accent)",
            }}
          />
        </div>
      )}
    </div>
  );
}

// Also export the pieces for flexibility
export { ActivityRow, DateGroupHeader, DateGroupTimeline };
