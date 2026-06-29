"use client";

import { useEffect, useRef, useState } from "react";
import type { ContestRow } from "../types";

const CSS = `
@keyframes cf-row-in {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-contest-row { animation: none !important; }
}
`;

interface Props {
  contests: ContestRow[];
}

type SortKey = "date" | "rank" | "delta" | "newRating";
type SortDir = "asc" | "desc";

export function ContestTable({ contests }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = [...contests].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "date") cmp = a.contestId - b.contestId;
    else if (sortKey === "rank") cmp = a.rank - b.rank;
    else if (sortKey === "delta") cmp = a.delta - b.delta;
    else if (sortKey === "newRating") cmp = a.newRating - b.newRating;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const displayed = showAll ? sorted : sorted.slice(0, 15);

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span style={{ opacity: sortKey === k ? 1 : 0.3, fontSize: "0.65rem" }}>
      {sortKey === k ? (sortDir === "asc" ? "▲" : "▼") : "⬍"}
    </span>
  );

  const Col = ({
    label, k, className = "",
  }: {
    label: string; k: SortKey; className?: string;
  }) => (
    <th
      className={`px-3 py-2.5 text-left text-meta cursor-pointer select-none hover:opacity-80 transition-opacity ${className}`}
      style={{
        color: sortKey === k ? "var(--text-accent)" : "var(--text-muted)",
        fontSize: "0.65rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: 600,
      }}
      onClick={() => handleSort(k)}
      aria-sort={sortKey === k ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
    >
      {label} <SortIcon k={k} />
    </th>
  );

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
      >
        <div className="px-5 pt-5 pb-3 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-subheading font-semibold text-sm" style={{ color: "var(--text-secondary)" }}>
              Contest History
            </h3>
            <p className="text-meta mt-0.5" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
              {contests.length} rated contests participated
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Contest history">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-primary)" }}>
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={{ color: "var(--text-muted)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  Contest
                </th>
                <Col label="Date" k="date" />
                <Col label="Rank" k="rank" />
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={{ color: "var(--text-muted)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  Old
                </th>
                <Col label="New" k="newRating" />
                <Col label="Δ" k="delta" />
              </tr>
            </thead>
            <tbody>
              {displayed.map((contest, i) => (
                <tr
                  key={contest.contestId}
                  className="cf-contest-row group"
                  style={{
                    borderBottom: "1px solid var(--border-primary)",
                    animation: visible ? `cf-row-in 0.35s ease-out ${Math.min(i, 14) * 35}ms both` : "none",
                  }}
                >
                  {/* Contest name */}
                  <td className="px-3 py-2.5" style={{ maxWidth: "240px" }}>
                    <a
                      href={`https://codeforces.com/contest/${contest.contestId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs leading-tight line-clamp-2 transition-colors hover:underline"
                      style={{ color: "var(--text-primary)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    >
                      {contest.contestName}
                    </a>
                  </td>

                  {/* Date */}
                  <td className="px-3 py-2.5">
                    <span className="text-meta text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                      {contest.date}
                    </span>
                  </td>

                  {/* Rank */}
                  <td className="px-3 py-2.5">
                    <span className="text-code text-xs" style={{ color: "var(--text-secondary)" }}>
                      #{contest.rank.toLocaleString()}
                    </span>
                  </td>

                  {/* Old rating */}
                  <td className="px-3 py-2.5">
                    <span className="text-code text-xs" style={{ color: "var(--text-muted)" }}>
                      {contest.oldRating}
                    </span>
                  </td>

                  {/* New rating */}
                  <td className="px-3 py-2.5">
                    <span className="text-code text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                      {contest.newRating}
                    </span>
                  </td>

                  {/* Delta */}
                  <td className="px-3 py-2.5">
                    <span
                      className="text-code text-xs font-bold px-1.5 py-0.5 rounded-md"
                      style={{
                        color: contest.delta >= 0 ? "var(--text-accent)" : "var(--text-error)",
                        background: contest.delta >= 0 ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                      }}
                    >
                      {contest.delta >= 0 ? "+" : ""}{contest.delta}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {contests.length > 15 && (
          <div className="px-5 py-3" style={{ borderTop: "1px solid var(--border-primary)" }}>
            <button
              onClick={() => setShowAll((p) => !p)}
              className="w-full text-sm py-2 rounded-xl transition-all duration-200 font-medium"
              style={{
                background: "var(--bg-code)",
                color: "var(--text-accent)",
                border: "1px solid var(--border-accent)",
              }}
              aria-expanded={showAll}
            >
              {showAll ? "Show fewer contests" : `Show all ${contests.length} contests`}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
