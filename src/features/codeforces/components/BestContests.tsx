"use client";

import type { CFContestRow } from "@/types/codeforces";
import { getRankColor } from "@/types/codeforces";
import { useEffect, useRef, useState } from "react";

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
  contests: CFContestRow[];
}

function ratingToRank(rating: number) {
  if (rating >= 2600) return "grandmaster";
  if (rating >= 2300) return "master";
  if (rating >= 1900) return "expert";
  if (rating >= 1600) return "specialist";
  if (rating >= 1200) return "pupil";
  return "newbie";
}

export function BestContests({ contests }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const best = [...contests].sort((a, b) => a.rank - b.rank).slice(0, 10);

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className="rounded-md overflow-hidden"
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
                  style={headerStyle}
                >
                  #
                </th>
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={headerStyle}
                >
                  Contest
                </th>
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={headerStyle}
                >
                  Rank
                </th>
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={headerStyle}
                >
                  Rating
                </th>
                <th
                  className="px-3 py-2.5 text-left text-meta"
                  style={headerStyle}
                >
                  Delta
                </th>
                <th
                  className="px-3 py-2.5 text-center text-meta w-12"
                  style={headerStyle}
                >
                  Solved
                </th>
              </tr>
            </thead>
            <tbody>
              {best.map((contest, index) => {
                const rankColor = getRankColor(ratingToRank(contest.newRating));

                return (
                  <tr
                    key={contest.contestId}
                    className="cf-best-row group"
                    style={{
                      borderBottom: "1px solid var(--border-primary)",
                      animation: visible
                        ? `cf-row-in 0.35s ease-out ${index * 50}ms both`
                        : "none",
                    }}
                  >
                    <td className="px-3 py-3 text-center">
                      <span
                        className="text-meta text-xs font-bold"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-3 py-3" style={{ maxWidth: "240px" }}>
                      <a
                        href={`https://codeforces.com/contest/${contest.contestId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs leading-tight line-clamp-2 transition-colors hover:underline"
                        style={{ color: "var(--text-primary)" }}
                        onMouseEnter={(event) =>
                          (event.currentTarget.style.color =
                            "var(--text-accent)")
                        }
                        onMouseLeave={(event) =>
                          (event.currentTarget.style.color =
                            "var(--text-primary)")
                        }
                      >
                        {contest.contestName}
                      </a>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="text-code text-xs font-bold px-1.5 py-0.5 rounded-md"
                        style={{
                          color: rankColor,
                          background: "var(--bg-code)",
                        }}
                      >
                        #{contest.rank.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="text-code text-xs font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {contest.newRating}
                      </span>
                    </td>
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

const headerStyle = {
  color: "var(--text-muted)",
  fontSize: "0.65rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
} as const;
