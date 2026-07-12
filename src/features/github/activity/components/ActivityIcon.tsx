"use client";

import type { ActivityType } from "@/types/github";
import {
  CircleDot,
  GitCommit,
  GitFork,
  GitPullRequest,
  MessageSquare,
  type LucideIcon,
  Plus,
  Rocket,
  Star,
  Trash2,
  BookOpen,
  Globe,
  MessageCircle,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  push: GitCommit,
  pr: GitPullRequest,
  pr_review: MessageSquare,
  issue: CircleDot,
  issue_comment: MessageCircle,
  create: Plus,
  delete: Trash2,
  release: Rocket,
  fork: GitFork,
  star: Star,
  public: Globe,
  commit_comment: MessageSquare,
  wiki: BookOpen,
};

const COLOR_MAP: Record<string, string> = {
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
};

interface ActivityIconProps {
  type: ActivityType;
  size?: number;
}

export function ActivityIcon({ type, size = 16 }: ActivityIconProps) {
  const Icon = ICON_MAP[type] ?? CircleDot;
  const color = COLOR_MAP[type] ?? "var(--text-muted)";
  const bgColor = `${color}18`;

  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-md"
      style={{
        width: size + 12,
        height: size + 12,
        background: bgColor,
        color,
      }}
      aria-hidden="true"
    >
      <Icon size={size} />
    </div>
  );
}

/** Get the accent color for a given activity type. */
export function getActivityColor(type: ActivityType): string {
  return COLOR_MAP[type] ?? "var(--text-muted)";
}
