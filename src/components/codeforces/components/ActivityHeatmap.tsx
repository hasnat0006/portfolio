"use client";

import { useEffect, useRef, useState } from "react";
import type { HeatmapDay } from "../types";

const CSS = `
@keyframes cf-cell-in {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-heatmap-cell { animation: none !important; }
}
`;

interface TooltipState {
  day: HeatmapDay;
  x: number;
  y: number;
}

interface Props {
  heatmap: HeatmapDay[];
  currentStreak: number;
  longestStreak: number;
}

const LEVEL_COLORS = [
  "var(--bg-card-hover)",     // 0 — empty
  "var(--text-accent)",       // 1 — low
  "var(--text-accent)",       // 2 — medium
  "var(--text-accent)",       // 3 — high
  "var(--text-accent)",       // 4 — very high
];

const LEVEL_OPACITY = [0.08, 0.25, 0.5, 0.75, 1];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ActivityHeatmap({ heatmap, currentStreak, longestStreak }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Group days into weeks (columns of 7)
  const weeks: (HeatmapDay | null)[][] = [];
  // Find start day of week for first day
  const firstDay = new Date(heatmap[0]?.date ?? new Date());
  const startPad = firstDay.getDay(); // 0=Sun
  const padded: (HeatmapDay | null)[] = [
    ...Array.from({ length: startPad }, () => null),
    ...heatmap,
  ];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  // Month labels — find first day of each month in the weeks grid
  const monthLabels: { col: number; month: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    for (const day of week) {
      if (!day) continue;
      const d = new Date(day.date);
      if (d.getMonth() !== lastMonth) {
        lastMonth = d.getMonth();
        monthLabels.push({ col, month: MONTHS[d.getMonth()] });
      }
      break;
    }
  });

  const CELL = 16;
  const GAP = 3;
  const STEP = CELL + GAP;
  const LEFT_PAD = 30; // space for weekday labels

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className="rounded-2xl p-5 md:p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-subheading font-semibold text-sm" style={{ color: "var(--text-secondary)" }}>
              Activity Heatmap
            </h3>
            <p className="text-meta mt-0.5" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
              Accepted submissions over the last 52 weeks
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-code font-bold text-lg" style={{ color: "var(--text-accent)" }}>{currentStreak}</p>
              <p className="text-meta" style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>Current streak</p>
            </div>
            <div className="text-center">
              <p className="text-code font-bold text-lg" style={{ color: "#f59e0b" }}>{longestStreak}</p>
              <p className="text-meta" style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>Longest streak</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div style={{ position: "relative", paddingLeft: LEFT_PAD }}>
            {/* Weekday labels */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 16, // offset past month row
                display: "flex",
                flexDirection: "column",
                gap: GAP,
              }}
            >
              {WEEKDAYS_LABELS.map((d, i) =>
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
                marginLeft: 0,
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                height: 12,
                position: "relative",
              }}
            >
              {monthLabels.map(({ col, month }, i) => (
                <span
                  key={i}
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

            {/* Grid */}
            <div
              style={{
                display: "flex",
                gap: GAP,
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                  {Array.from({ length: 7 }).map((_, di) => {
                    const day = week[di] ?? null;
                    if (!day) {
                      return (
                        <div
                          key={di}
                          style={{ width: CELL, height: CELL, borderRadius: 2 }}
                        />
                      );
                    }
                    const opacity = LEVEL_OPACITY[day.level];
                    const color = day.level === 0
                      ? "var(--bg-card-hover)"
                      : `rgba(var(--text-accent-rgb, 52 211 153) / ${opacity})`;

                    return (
                      <div
                        key={di}
                        className="cf-heatmap-cell"
                        style={{
                          width: CELL,
                          height: CELL,
                          borderRadius: 2,
                          background: day.level === 0
                            ? "var(--bg-card-hover)"
                            : `color-mix(in srgb, var(--text-accent) ${Math.round(opacity * 100)}%, transparent)`,
                          cursor: "default",
                          animation: visible ? `cf-cell-in 0.3s ease-out ${wi * 5 + di * 2}ms both` : "none",
                          border: "1px solid var(--border-primary)",
                          transition: "transform 0.1s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = "scale(1.4)";
                          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                          setTooltip({ day, x: rect.left, y: rect.top });
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = "";
                          setTooltip(null);
                        }}
                        aria-label={`${day.date}: ${day.accepted} accepted, ${day.total} total`}
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
              <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: 2,
                    background: level === 0
                      ? "var(--bg-card-hover)"
                      : `color-mix(in srgb, var(--text-accent) ${Math.round(LEVEL_OPACITY[level] * 100)}%, transparent)`,
                    border: "1px solid var(--border-primary)",
                  }}
                />
              ))}
              <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>More</span>
            </div>
          </div>
        </div>

        {/* Fixed tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 pointer-events-none rounded-lg px-3 py-2 text-xs"
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
            <p className="font-semibold mb-1">{new Date(tooltip.day.date).toLocaleDateString("en-US", { dateStyle: "medium" })}</p>
            <p style={{ color: "var(--text-accent)" }}>{tooltip.day.accepted} accepted</p>
            <p style={{ color: "var(--text-muted)" }}>{tooltip.day.total} total submissions</p>
          </div>
        )}
      </div>
    </>
  );
}
