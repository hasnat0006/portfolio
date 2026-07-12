"use client";

import { GitCommit } from "lucide-react";

interface ActivityEmptyStateProps {
  hasFilter?: boolean;
}

export function ActivityEmptyState({ hasFilter }: ActivityEmptyStateProps) {
  return (
    <div
      className="rounded-md p-8 text-center"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-primary)",
      }}
    >
      <div
        className="w-12 h-12 rounded-md flex items-center justify-center mx-auto mb-4"
        style={{
          background: "var(--bg-code)",
          color: "var(--text-muted)",
        }}
        aria-hidden="true"
      >
        <GitCommit size={20} />
      </div>
      <p
        className="text-sm font-medium mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {hasFilter ? "No matching activity" : "No recent public activity"}
      </p>
      <p
        className="text-xs max-w-xs mx-auto"
        style={{ color: "var(--text-muted)" }}
      >
        {hasFilter
          ? "Try selecting a different filter to see more activity."
          : "GitHub activity will appear here when you push commits, open PRs, or contribute to repositories."}
      </p>
    </div>
  );
}
