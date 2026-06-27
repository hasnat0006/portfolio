"use client";

import { useEffect, useRef, useState } from "react";

type RatingEntry = {
  contestName: string;
  rating: number;
  date: string;
  rank: number;
};
type VerdictEntry = { verdict: string; count: number };

type CFData = {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  problemsSolved: number;
  totalSubmissions: number;
  ratingHistory: RatingEntry[];
  verdicts: VerdictEntry[];
};

const RANK_COLORS: Record<string, string> = {
  newbie: "#808080",
  pupil: "#008000",
  specialist: "#03a89e",
  expert: "#0000ff",
  "candidate master": "#aa00aa",
  master: "#ff8c00",
  "international master": "#ff8c00",
  grandmaster: "#ff0000",
  "international grandmaster": "#ff0000",
  "legendary grandmaster": "#ff0000",
};

function RatingGraph({ history }: { history: RatingEntry[] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  if (history.length < 2)
    return (
      <p style={{ color: "var(--text-muted)" }} className="text-sm">
        Not enough data for graph
      </p>
    );

  const width = 600;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const ratings = history.map((e) => e.rating);
  const minR = Math.min(...ratings) - 50;
  const maxR = Math.max(...ratings) + 50;

  const xScale = (i: number) =>
    padding.left + (i / (history.length - 1)) * chartW;
  const yScale = (r: number) =>
    padding.top + chartH - ((r - minR) / (maxR - minR)) * chartH;

  const linePath = history
    .map((e, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(e.rating)}`)
    .join(" ");
  const areaPath = `${linePath} L ${xScale(history.length - 1)} ${yScale(minR)} L ${xScale(0)} ${yScale(minR)} Z`;

  // Y-axis ticks
  const yTicks = [];
  const step = Math.ceil((maxR - minR) / 4 / 50) * 50;
  for (let v = Math.ceil(minR / step) * step; v <= maxR; v += step) {
    yTicks.push(v);
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
    >
      {/* Grid lines */}
      {yTicks.map((v) => (
        <g key={v}>
          <line
            x1={padding.left}
            y1={yScale(v)}
            x2={width - padding.right}
            y2={yScale(v)}
            stroke="var(--chart-grid)"
            strokeWidth="1"
          />
          <text
            x={padding.left - 8}
            y={yScale(v) + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-muted)"
          >
            {v}
          </text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="var(--chart-fill)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="var(--chart-line)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {history.map((e, i) => (
        <circle
          key={i}
          cx={xScale(i)}
          cy={yScale(e.rating)}
          r="3"
          fill="var(--chart-line)"
          stroke="var(--bg-primary)"
          strokeWidth="1.5"
        >
          <title>{`${e.contestName}\nRating: ${e.rating}\nRank: ${e.rank}`}</title>
        </circle>
      ))}
    </svg>
  );
}

export default function CodeforcesStats() {
  const [data, setData] = useState<CFData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/codeforces")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div
          className="h-6 rounded w-48"
          style={{ background: "var(--bg-card-hover)" }}
        />
        <div
          className="h-48 rounded-xl"
          style={{ background: "var(--bg-card-hover)" }}
        />
      </div>
    );
  }

  if (!data) return null;

  const rankColor =
    RANK_COLORS[data.rank.toLowerCase()] || "var(--text-accent)";

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <p className="text-meta" style={{ color: "var(--text-muted)" }}>
            Rating
          </p>
          <p
            className="text-2xl font-bold text-code"
            style={{ color: rankColor }}
          >
            {data.rating}
          </p>
        </div>
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <p className="text-meta" style={{ color: "var(--text-muted)" }}>
            Max Rating
          </p>
          <p
            className="text-2xl font-bold text-code"
            style={{ color: rankColor }}
          >
            {data.maxRating}
          </p>
        </div>
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <p className="text-meta" style={{ color: "var(--text-muted)" }}>
            Solved
          </p>
          <p
            className="text-2xl font-bold text-code"
            style={{ color: "var(--text-accent)" }}
          >
            {data.problemsSolved}
          </p>
        </div>
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <p className="text-meta" style={{ color: "var(--text-muted)" }}>
            Rank
          </p>
          <p
            className="text-lg font-bold text-code capitalize"
            style={{ color: rankColor }}
          >
            {data.rank}
          </p>
        </div>
      </div>

      {/* Rating graph */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h4
          className="text-small text-sm font-semibold mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Rating History
        </h4>
        <RatingGraph history={data.ratingHistory} />
      </div>

      {/* Verdict breakdown */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h4
          className="text-small text-sm font-semibold mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Verdict Distribution
        </h4>
        <div className="space-y-2">
          {data.verdicts.map((v) => {
            const pct = Math.round((v.count / data.totalSubmissions) * 100);
            return (
              <div key={v.verdict} className="flex items-center gap-3">
                <span
                  className="w-32 text-meta truncate"
                  style={{ color: "var(--text-muted)" }}
                >
                  {v.verdict.replace(/_/g, " ")}
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-card-hover)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background:
                        v.verdict === "OK"
                          ? "var(--text-accent)"
                          : "var(--text-muted)",
                    }}
                  />
                </div>
                <span
                  className="text-meta w-12 text-right"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {v.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CF profile link */}
      <a
        href={`https://codeforces.com/profile/${data.handle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-small text-sm transition-colors"
        style={{ color: "var(--text-accent)" }}
      >
        View Codeforces profile →
      </a>
    </div>
  );
}
