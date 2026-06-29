"use client";

import { useEffect, useRef, useState } from "react";
import type { CFRatingEntry } from "../types";
import { getRankColor } from "../types";

const CHART_CSS = `
@keyframes cf-line-draw {
  from { stroke-dashoffset: var(--path-len); }
  to { stroke-dashoffset: 0; }
}
@keyframes cf-dot-pop {
  from { r: 0; opacity: 0; }
  to { r: 4; opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .cf-chart-line { animation: none !important; stroke-dashoffset: 0 !important; }
}
`;

interface TooltipData {
  x: number;
  y: number;
  entry: CFRatingEntry;
  delta: number;
}

interface Props {
  ratingHistory: CFRatingEntry[];
}

const RANK_BANDS = [
  { label: "LGM", min: 3000, color: "#ff0000" },
  { label: "GM", min: 2600, color: "#ff0000" },
  { label: "IM", min: 2400, color: "#ff8c00" },
  { label: "Master", min: 2300, color: "#ff8c00" },
  { label: "CM", min: 2100, color: "#aa00aa" },
  { label: "Expert", min: 1900, color: "#0000ff" },
  { label: "Specialist", min: 1600, color: "#03a89e" },
  { label: "Pupil", min: 1200, color: "#008000" },
  { label: "Newbie", min: 0, color: "#808080" },
];

export function RatingChart({ ratingHistory }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [pathLength, setPathLength] = useState(0);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (visible && lineRef.current) {
      const len = lineRef.current.getTotalLength();
      setPathLength(len);
    }
  }, [visible]);

  if (ratingHistory.length < 2) {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
      >
        <p style={{ color: "var(--text-muted)" }}>Not enough contest data for chart</p>
      </div>
    );
  }

  const W = 800;
  const H = 300;
  const PAD = { top: 32, right: 32, bottom: 48, left: 56 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const ratings = ratingHistory.map((e) => e.newRating);
  const minR = Math.min(...ratings) - 100;
  const maxR = Math.max(...ratings) + 100;
  const n = ratingHistory.length;

  const xScale = (i: number) => PAD.left + (i / (n - 1)) * chartW;
  const yScale = (r: number) => PAD.top + chartH - ((r - minR) / (maxR - minR)) * chartH;

  // Build path
  const linePath = ratingHistory
    .map((e, i) => `${i === 0 ? "M" : "L"} ${xScale(i).toFixed(1)} ${yScale(e.newRating).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${xScale(n - 1).toFixed(1)} ${(PAD.top + chartH).toFixed(1)} L ${xScale(0).toFixed(1)} ${(PAD.top + chartH).toFixed(1)} Z`;

  // Y axis ticks
  const step = Math.ceil((maxR - minR) / 5 / 100) * 100;
  const yTicks: number[] = [];
  for (let v = Math.ceil(minR / step) * step; v <= maxR; v += step) yTicks.push(v);

  // X axis labels — show every Nth contest
  const xLabelEvery = Math.ceil(n / 8);
  const xLabels = ratingHistory
    .map((e, i) => ({ i, date: new Date(e.ratingUpdateTimeSeconds * 1000) }))
    .filter((_, i) => i % xLabelEvery === 0 || i === n - 1);

  // Highlights
  const peakIdx = ratings.indexOf(Math.max(...ratings));
  const deltas = ratingHistory.map((e) => e.newRating - e.oldRating);
  const bestGainIdx = deltas.indexOf(Math.max(...deltas));
  const worstLossIdx = deltas.indexOf(Math.min(...deltas));

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const relX = svgX - PAD.left;
    const idx = Math.max(0, Math.min(n - 1, Math.round((relX / chartW) * (n - 1))));
    const entry = ratingHistory[idx];
    setTooltip({
      x: xScale(idx),
      y: yScale(entry.newRating),
      entry,
      delta: entry.newRating - entry.oldRating,
    });
  };

  const rankColor = getRankColor(
    ratingHistory[ratingHistory.length - 1].newRating >= 2600 ? "grandmaster"
    : ratingHistory[ratingHistory.length - 1].newRating >= 2300 ? "master"
    : ratingHistory[ratingHistory.length - 1].newRating >= 1900 ? "expert"
    : ratingHistory[ratingHistory.length - 1].newRating >= 1600 ? "specialist"
    : ratingHistory[ratingHistory.length - 1].newRating >= 1200 ? "pupil"
    : "newbie"
  );

  return (
    <>
      <style>{CHART_CSS}</style>
      <div
        ref={containerRef}
        className="rounded-2xl p-5 md:p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-subheading font-semibold text-sm" style={{ color: "var(--text-secondary)" }}>
            Rating Progress
          </h3>
          <div className="flex items-center gap-4 text-meta" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
              Peak
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              Best gain
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
              Worst loss
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-hidden" style={{ minHeight: 220 }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            style={{ overflow: "visible" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTooltip(null)}
            aria-label="Rating history chart"
            role="img"
          >
            <defs>
              <linearGradient id="cf-area-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={rankColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={rankColor} stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {yTicks.map((v) => (
              <g key={v}>
                <line
                  x1={PAD.left} y1={yScale(v)} x2={W - PAD.right} y2={yScale(v)}
                  stroke="var(--chart-grid)" strokeWidth="1" strokeDasharray="4,4"
                />
                <text x={PAD.left - 8} y={yScale(v) + 4} textAnchor="end" fontSize="10" fill="var(--text-muted)">
                  {v}
                </text>
              </g>
            ))}

            {/* X axis labels */}
            {xLabels.map(({ i, date }) => (
              <text
                key={i}
                x={xScale(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="var(--text-muted)"
              >
                {date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })}
              </text>
            ))}

            {/* Area */}
            <path d={areaPath} fill="url(#cf-area-grad)" />

            {/* Line */}
            <path
              ref={lineRef}
              className="cf-chart-line"
              d={linePath}
              fill="none"
              stroke={rankColor}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={
                pathLength > 0
                  ? {
                      strokeDasharray: pathLength,
                      strokeDashoffset: pathLength,
                      // @ts-expect-error CSS custom property
                      "--path-len": pathLength,
                      animation: "cf-line-draw 1.8s ease-out forwards",
                    }
                  : {}
              }
            />

            {/* Highlight dots */}
            {[
              { idx: peakIdx, color: "#facc15", label: "Peak" },
              { idx: bestGainIdx, color: "#4ade80", label: "Best gain" },
              { idx: worstLossIdx, color: "#f87171", label: "Worst loss" },
            ].map(({ idx, color, label }) => (
              <circle
                key={label}
                cx={xScale(idx)}
                cy={yScale(ratingHistory[idx].newRating)}
                r={5}
                fill={color}
                stroke="var(--bg-primary)"
                strokeWidth="2"
                style={{ animation: visible ? "cf-dot-pop 0.4s ease-out 1.8s both" : "none" }}
              >
                <title>{label}: {ratingHistory[idx].newRating}</title>
              </circle>
            ))}

            {/* All dots */}
            {ratingHistory.map((e, i) => (
              <circle
                key={i}
                cx={xScale(i)}
                cy={yScale(e.newRating)}
                r={3}
                fill={rankColor}
                stroke="var(--bg-primary)"
                strokeWidth="1.5"
                style={{ opacity: 0.7 }}
              />
            ))}

            {/* Tooltip crosshair */}
            {tooltip && (
              <>
                <line
                  x1={tooltip.x} y1={PAD.top} x2={tooltip.x} y2={PAD.top + chartH}
                  stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3,3"
                />
                <circle
                  cx={tooltip.x} cy={tooltip.y} r={5}
                  fill={rankColor} stroke="var(--bg-primary)" strokeWidth="2"
                />
              </>
            )}
          </svg>

          {/* Tooltip box */}
          {tooltip && (
            <div
              className="absolute pointer-events-none rounded-xl px-3 py-2 text-sm z-20"
              style={{
                background: "var(--bg-card-hover)",
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-lg)",
                left: tooltip.x > W * 0.7 ? "auto" : `${(tooltip.x / W) * 100}%`,
                right: tooltip.x > W * 0.7 ? "0" : "auto",
                top: tooltip.y < 100 ? "2rem" : "0",
                transform: tooltip.x > W * 0.7 ? "none" : "translateX(-50%)",
                maxWidth: "200px",
                minWidth: "160px",
              }}
            >
              <p className="font-semibold text-xs mb-1 leading-tight" style={{ color: "var(--text-primary)" }}>
                {tooltip.entry.contestName}
              </p>
              <p className="text-meta" style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>
                {new Date(tooltip.entry.ratingUpdateTimeSeconds * 1000).toLocaleDateString("en-US", { dateStyle: "medium" })}
              </p>
              <div className="mt-1.5 space-y-0.5 text-meta" style={{ fontSize: "0.7rem" }}>
                <div className="flex justify-between gap-4">
                  <span style={{ color: "var(--text-muted)" }}>Old</span>
                  <span style={{ color: "var(--text-primary)" }}>{tooltip.entry.oldRating}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span style={{ color: "var(--text-muted)" }}>New</span>
                  <span style={{ color: "var(--text-primary)" }}>{tooltip.entry.newRating}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span style={{ color: "var(--text-muted)" }}>Change</span>
                  <span style={{ color: tooltip.delta >= 0 ? "var(--text-accent)" : "var(--text-error)", fontWeight: 700 }}>
                    {tooltip.delta >= 0 ? "+" : ""}{tooltip.delta}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span style={{ color: "var(--text-muted)" }}>Rank</span>
                  <span style={{ color: "var(--text-primary)" }}>#{tooltip.entry.rank}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
