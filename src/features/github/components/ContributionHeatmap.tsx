"use client";

import type { GHHeatmapDay } from "@/types/github";
import { useEffect, useRef, useState } from "react";

const CSS = `
@keyframes gh-cell-in {
  from { opacity: 0; transform: scale(0.4); }
  to   { opacity: 1; transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .gh-heatmap-cell { animation: none !important; }
}
`;

interface Tooltip {
  day: GHHeatmapDay;
  x: number;
  y: number;
}
interface Props {
  heatmap: GHHeatmapDay[];
  currentStreak: number;
  longestStreak: number;
  totalContributions: number;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LEVEL_OPACITY = [0.07, 0.25, 0.5, 0.75, 1];

export function ContributionHeatmap({
  heatmap,
  currentStreak,
  longestStreak,
  totalContributions,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

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

  // Group into weeks (columns of 7)
  const firstDay = new Date(heatmap[0]?.date ?? new Date());
  const startPad = firstDay.getDay();
  const padded: (GHHeatmapDay | null)[] = [
    ...Array(startPad).fill(null),
    ...heatmap,
  ];
  const weeks: (GHHeatmapDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));

  // Month labels
  const monthLabels: { col: number; month: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    for (const day of week) {
      if (!day) continue;
      const m = new Date(day.date).getMonth();
      if (m !== lastMonth) {
        lastMonth = m;
        monthLabels.push({ col, month: MONTHS[m] });
      }
      break;
    }
  });

  const CELL = 16,
    GAP = 3,
    STEP = CELL + GAP,
    LEFT = 30;

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className="rounded-md p-5 md:p-6"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3
              className="text-subheading font-semibold text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Contribution Activity
            </h3>
            <p
              className="text-meta mt-0.5"
              style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}
            >
              {totalContributions.toLocaleString()} total contributions
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p
                className="text-code font-bold text-lg"
                style={{ color: "var(--text-accent)" }}
              >
                {currentStreak}
              </p>
              <p
                className="text-meta"
                style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}
              >
                Current streak
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-code font-bold text-lg"
                style={{ color: "#f59e0b" }}
              >
                {longestStreak}
              </p>
              <p
                className="text-meta"
                style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}
              >
                Longest streak
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div style={{ position: "relative", paddingLeft: LEFT }}>
            {/* Weekday labels */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 18,
                display: "flex",
                flexDirection: "column",
                gap: GAP,
              }}
            >
              {WEEKDAY_LABELS.map((d, i) =>
                i % 2 === 1 ? (
                  <div
                    key={d}
                    style={{
                      height: CELL,
                      fontSize: "0.55rem",
                      color: "var(--text-muted)",
                      lineHeight: `${CELL}px`,
                    }}
                  >
                    {d}
                  </div>
                ) : (
                  <div key={d} style={{ height: CELL }} />
                ),
              )}
            </div>

            {/* Month row */}
            <div
              style={{
                display: "flex",
                marginBottom: 4,
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                height: 14,
                position: "relative",
              }}
            >
              {monthLabels.map(({ col, month }, i) => (
                <span
                  key={`${month}-${i}`}
                  style={{
                    position: "absolute",
                    left: col * STEP,
                    whiteSpace: "nowrap",
                  }}
                >
                  {month}
                </span>
              ))}
            </div>

            {/* Grid of contribution cells */}
            <div
              style={{
                display: "flex",
                gap: GAP,
                alignItems: "flex-start",
              }}
            >
              {weeks.map((week, wi) => (
                <div
                  key={wi}
                  style={{ display: "flex", flexDirection: "column", gap: GAP }}
                >
                  {Array.from({ length: 7 }).map((_, di) => {
                    const cell = week[di] ?? null;
                    if (!cell) {
                      return (
                        <div
                          key={di}
                          style={{
                            width: CELL,
                            height: CELL,
                            borderRadius: 2,
                          }}
                        />
                      );
                    }
                    const opacity = LEVEL_OPACITY[cell.level];
                    return (
                      <div
                        key={di}
                        className="gh-heatmap-cell"
                        style={{
                          width: CELL,
                          height: CELL,
                          borderRadius: 2,
                          background:
                            cell.level === 0
                              ? "var(--bg-card-hover)"
                              : `color-mix(in srgb, var(--text-accent) ${Math.round(
                                  opacity * 100,
                                )}%, transparent)`,
                          cursor: "default",
                          animation: visible
                            ? `gh-cell-in 0.3s ease-out ${
                                wi * 5 + di * 2
                              }ms both`
                            : "none",
                          border: "1px solid var(--border-primary)",
                          transition: "transform 0.1s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.4)";
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({ day: cell, x: rect.left, y: rect.top });
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "";
                          setTooltip(null);
                        }}
                        aria-label={`${cell.date}: ${cell.count} contributions`}
                        role="gridcell"
                        tabIndex={-1}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-3">
              <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                Less
              </span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: 2,
                    background:
                      level === 0
                        ? "var(--bg-card-hover)"
                        : `color-mix(in srgb, var(--text-accent) ${Math.round(
                            LEVEL_OPACITY[level] * 100,
                          )}%, transparent)`,
                    border: "1px solid var(--border-primary)",
                  }}
                />
              ))}
              <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                More
              </span>
            </div>
          </div>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 pointer-events-none rounded-md px-3 py-2 text-xs"
            style={{
              background: "var(--bg-card-hover)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-lg)",
              left: tooltip.x + 16,
              top: tooltip.y - 80,
              color: "var(--text-primary)",
              minWidth: 140,
            }}
          >
            <p className="font-semibold mb-1">
              {new Date(tooltip.day.date).toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}
            </p>
            <p style={{ color: "var(--text-accent)" }}>
              {tooltip.day.count} contributions
            </p>
          </div>
        )}
      </div>
    </>
  );
}
