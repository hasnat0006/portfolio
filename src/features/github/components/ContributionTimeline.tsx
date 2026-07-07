"use client";

import type { TimelineItem } from "@/types/github";
import { timeAgo } from "@/utils/timeAgo";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// ── Inline SVG Icons ──────────────────────────────────────────────────────────

const Icons: Record<
  string,
  (props?: React.SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  commit: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="1.05" y1="12" x2="7" y2="12" />
      <line x1="17.01" y1="12" x2="22.96" y2="12" />
    </svg>
  ),
  pr: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" y1="9" x2="6" y2="21" />
    </svg>
  ),
  issue: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  create: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  release: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  star: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  fork: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
      <line x1="12" y1="12" x2="12" y2="15" />
    </svg>
  ),
};

function getIconSvg(type: string): React.ReactElement {
  const fn = Icons[type];
  if (fn) return fn();
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

// ── Color map ─────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, string> = {
  push: "#10b981",
  pr: "#8b5cf6",
  issue: "#ef4444",
  create: "#3b82f6",
  release: "#f59e0b",
  star: "#f59e0b",
  fork: "#64748b",
};

interface Props {
  items: TimelineItem[];
  maxItems?: number;
}

export function ContributionTimeline({ items, maxItems = 20 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayed = items.slice(0, maxItems);

  if (!displayed.length) {
    return (
      <div
        className="rounded-md p-6 text-center"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          No recent activity to display.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="rounded-md p-5 md:p-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-primary)",
      }}
    >
      <h3
        className="text-subheading font-semibold text-sm mb-5"
        style={{ color: "var(--text-secondary)" }}
      >
        Recent Activity
      </h3>
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[13px] top-2 bottom-2 w-px"
          style={{ background: "var(--border-primary)" }}
          aria-hidden="true"
        />

        <ul className="space-y-0" role="list">
          {displayed.map((item, i) => {
            const color = TYPE_COLORS[item.type] ?? "var(--text-accent)";
            return (
              <motion.li
                key={`${item.date}-${item.repo}-${i}`}
                className="relative flex items-start gap-4 py-3"
                initial={{ opacity: 0, x: -16 }}
                animate={
                  visible
                    ? {
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: i * 0.04,
                          duration: 0.4,
                          ease: "easeOut",
                        },
                      }
                    : {}
                }
              >
                {/* Dot */}
                <div
                  className="relative z-10 mt-0.5 w-[26px] h-[26px] rounded-md flex items-center justify-center shrink-0"
                  style={{ background: `${color}18`, color }}
                  aria-hidden="true"
                >
                  {getIconSvg(item.icon)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span
                      className="text-meta font-medium"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.6rem",
                      }}
                    >
                      {item.repo}
                    </span>
                    <span
                      className="text-meta"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.6rem",
                      }}
                    >
                      ·{" "}
                      {item.type === "push"
                        ? "commit"
                        : item.type.replace("_", " ")}
                    </span>
                  </div>
                  {item.description ? (
                    <p
                      className="text-xs font-semibold mt-0.5 leading-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.description}
                    </p>
                  ) : null}
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-meta"
                      style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}
                    >
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      {" · "}
                      {timeAgo(item.date)}
                    </span>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{
                          color: "var(--text-accent)",
                          fontSize: "0.6rem",
                        }}
                      >
                        View →
                      </a>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
