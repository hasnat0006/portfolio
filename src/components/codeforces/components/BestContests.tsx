"use client";

import { useEffect, useRef, useState } from "react";
import type { ContestRow } from "../types";
import { getRankColor } from "../types";

const CSS = `
@keyframes cf-row-in {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-best-row { animation: none !important; }
}
`;

interface Props {
  contests: ContestRow[];
}

export function BestContests({ contests }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Sort by best rank (ascending) and take top 10
  const best = [...contests].sort((a, b) => a.rank - b.rank).slice(0, 10);

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <div className="px-5 pt-5 pb-3">
          <h3
            className="text-subheading font-semibold text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Best Performances
          </h3>
          <p
            className="text-meta mt-0.5"
            style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}
          >
            Top 10 contests by rank
          </p>
        </div>

        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse"
            aria-label="Best contest performances"
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-primary)" }}>
                <th
                  className="px-3 py-2.5 text-center text-meta w-8"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  #
                </th>
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Contest
                </th>
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Rank
                </th>
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Rating
                </th>
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Δ
                </th>
                <th
                  className="px-3 py-2.5 text-center text-meta w-12"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Solved
                </th>
              </tr>
            </thead>
            <tbody>
              {best.map((contest, i) => {
                const rankColor = getRankColor(
                  contest.newRating >= 2600
                    ? "grandmaster"
                    : contest.newRating >= 2300
                      ? "master"
                      : contest.newRating >= 1900
                        ? "expert"
                        : contest.newRating >= 1600
                          ? "specialist"
                          : contest.newRating >= 1200
                            ? "pupil"
                            : "newbie",
                );

                return (
                  <tr
                    key={contest.contestId}
                    className="cf-best-row group"
                    style={{
                      borderBottom: "1px solid var(--border-primary)",
                      animation: visible
                        ? `cf-row-in 0.35s ease-out ${i * 50}ms both`
                        : "none",
                    }}
                  >
                    {/* # */}
                    <td className="px-3 py-3 text-center">
                      <span
                        className="text-meta text-xs font-bold"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {i + 1}
                      </span>
                    </td>

                    {/* Contest name */}
                    <td className="px-3 py-3" style={{ maxWidth: "240px" }}>
                      <a
                        href={`https://codeforces.com/contest/${contest.contestId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs leading-tight line-clamp-2 transition-colors hover:underline"
                        style={{ color: "var(--text-primary)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--text-accent)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--text-primary)")
                        }
                      >
                        {contest.contestName}
                      </a>
                    </td>

                    {/* Rank / total participants */}
                    <td className="px-3 py-3">
                      <span
                        className="text-code text-xs font-bold px-1.5 py-0.5 rounded-md"
                        style={{
                          color: rankColor,
                          background: "var(--bg-code)",
                        }}
                      >
                        #{contest.rank.toLocaleString()}
                        {contest.totalParticipants != null &&
                          ` / ${contest.totalParticipants.toLocaleString()}`}
                      </span>
                    </td>

                    {/* New rating */}
                    <td className="px-3 py-3">
                      <span
                        className="text-code text-xs font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {contest.newRating}
                      </span>
                    </td>

                    {/* Delta */}
                    <td className="px-3 py-3">
                      <span
                        className="text-code text-xs font-bold px-1.5 py-0.5 rounded-md"
                        style={{
                          color:
                            contest.delta >= 0
                              ? "var(--text-accent)"
                              : "var(--text-error)",
                          background:
                            contest.delta >= 0
                              ? "rgba(52,211,153,0.1)"
                              : "rgba(248,113,113,0.1)",
                        }}
                      >
                        {contest.delta >= 0 ? "+" : ""}
                        {contest.delta}
                      </span>
                    </td>

                    {/* Problems solved */}
                    <td className="px-3 py-3 text-center">
                      <span
                        className="text-code text-xs font-medium px-1.5 py-0.5 rounded-md"
                        style={{
                          color: rankColor,
                          background: `${rankColor}15`,
                        }}
                      >
                        {contest.problemsSolved}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
