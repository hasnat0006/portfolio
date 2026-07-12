"use client";

import type { ActivityFilter } from "@/types/github";
import { motion } from "framer-motion";

interface FilterOption {
  value: ActivityFilter;
  label: string;
}

const FILTERS: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "commits", label: "Commits" },
  { value: "prs", label: "PRs" },
  { value: "stars", label: "Stars" },
  { value: "forks", label: "Forks" },
  { value: "issues", label: "Issues" },
];

interface ActivityFilterBarProps {
  active: ActivityFilter;
  onChange: (filter: ActivityFilter) => void;
}

export function ActivityFilterBar({
  active,
  onChange,
}: ActivityFilterBarProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-1.5 p-1 rounded-md mb-6 overflow-hidden"
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
      }}
      role="tablist"
      aria-label="Filter activity by type"
    >
      {FILTERS.map((filter) => {
        const isActive = active === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className="relative px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors duration-200"
            style={{
              color: isActive ? "var(--text-accent)" : "var(--text-muted)",
              background: isActive ? "var(--bg-card)" : "transparent",
              border: isActive
                ? "1px solid"
                : "1px solid transparent",
            }}
            role="tab"
            aria-selected={isActive}
            aria-controls="activity-timeline-panel"
          >
            {filter.label}
            {isActive && (
              <motion.div
                layoutId="activity-filter-indicator"
                className="absolute inset-0 rounded-md"
                style={{
                  border: "1px solid rgba(52,211,153,0.3)",
                  boxShadow: "0 0 12px rgba(52,211,153,0.08)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
