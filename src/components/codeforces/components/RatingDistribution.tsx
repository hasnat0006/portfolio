"use client";

import { useEffect, useRef, useState } from "react";
import type { RatingBucket } from "../types";
import { getRankColor } from "../types";

const CSS = `
@keyframes cf-bar-grow {
  from { width: 0; }
  to { width: var(--bar-w); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-dist-bar { animation: none !important; width: var(--bar-w) !important; }
}
`;

interface Props {
  distribution: RatingBucket[];
}

export function RatingDistribution({ distribution }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const maxCount = Math.max(...distribution.map((b) => b.count), 1);

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className="rounded-2xl p-5 md:p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
      >
        <h3
          className="text-subheading font-semibold text-sm mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Rating Distribution
        </h3>
        <p className="text-meta mb-5" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
          Solved problems grouped by difficulty rating
        </p>

        <div className="space-y-2" role="list" aria-label="Problems solved by rating">
          {distribution.map((bucket, i) => {
            const barPct = (bucket.count / maxCount) * 100;
            const color = getRankColor(
              bucket.rating >= 2600 ? "grandmaster"
              : bucket.rating >= 2300 ? "master"
              : bucket.rating >= 1900 ? "expert"
              : bucket.rating >= 1600 ? "specialist"
              : bucket.rating >= 1200 ? "pupil"
              : "newbie"
            );

            return (
              <div
                key={bucket.rating}
                role="listitem"
                className="flex items-center gap-3 group relative"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Rating label */}
                <span
                  className="text-code text-xs w-10 shrink-0 text-right"
                  style={{ color }}
                >
                  {bucket.rating}
                </span>

                {/* Bar */}
                <div
                  className="flex-1 h-5 rounded-md overflow-hidden relative"
                  style={{ background: "var(--bg-code)" }}
                >
                  <div
                    className="cf-dist-bar h-full rounded-md"
                    style={{
                      // @ts-expect-error CSS custom property
                      "--bar-w": `${barPct}%`,
                      width: visible ? `${barPct}%` : "0%",
                      background: `linear-gradient(90deg, ${color}cc, ${color}88)`,
                      animation: visible ? `cf-bar-grow 0.8s ease-out ${i * 40}ms both` : "none",
                      transition: "opacity 0.2s",
                      opacity: hovered === null || hovered === i ? 1 : 0.4,
                    }}
                  />
                </div>

                {/* Count */}
                <span
                  className="text-code text-xs w-6 shrink-0 text-right"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {bucket.count}
                </span>

                {/* Tooltip */}
                {hovered === i && (
                  <div
                    className="absolute left-14 top-full mt-1 z-20 rounded-lg px-3 py-1.5 text-xs pointer-events-none"
                    style={{
                      background: "var(--bg-card-hover)",
                      border: "1px solid var(--border-primary)",
                      boxShadow: "var(--shadow-md)",
                      color: "var(--text-primary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ color }}>★ {bucket.rating}</span> — {bucket.count} solved ({bucket.percentage}%)
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
