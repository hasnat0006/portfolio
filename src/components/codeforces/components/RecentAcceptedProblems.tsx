"use client";

import { useEffect, useRef, useState } from "react";
import type { RecentProblem } from "../types";
import { getRankColor } from "../types";

const CSS = `
@keyframes cf-card-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-prob-card { animation: none !important; }
}
`;

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  return `${mins}m ago`;
}

function shortLang(lang: string): string {
  if (/c\+\+20/i.test(lang)) return "C++20";
  if (/c\+\+17/i.test(lang)) return "C++17";
  if (/c\+\+14/i.test(lang)) return "C++14";
  if (/c\+\+/i.test(lang)) return "C++";
  if (/python/i.test(lang)) return "Python";
  if (/pypy/i.test(lang)) return "PyPy";
  if (/java/i.test(lang)) return "Java";
  if (/rust/i.test(lang)) return "Rust";
  return lang.slice(0, 8);
}

interface Props {
  problems: RecentProblem[];
}

export function RecentAcceptedProblems({ problems }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div ref={ref}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-subheading font-semibold text-sm" style={{ color: "var(--text-secondary)" }}>
              Recent Accepted Problems
            </h3>
            <p className="text-meta mt-0.5" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
              Latest unique accepted submissions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" role="list" aria-label="Recent accepted problems">
          {problems.map((prob, i) => {
            const ratingColor = prob.problemRating ? getRankColor(
              prob.problemRating >= 2600 ? "grandmaster"
              : prob.problemRating >= 2300 ? "master"
              : prob.problemRating >= 1900 ? "expert"
              : prob.problemRating >= 1600 ? "specialist"
              : prob.problemRating >= 1200 ? "pupil"
              : "newbie"
            ) : "var(--text-muted)";

            return (
              <a
                key={prob.id}
                href={prob.url}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                className="cf-prob-card group block rounded-xl p-4 transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-primary)",
                  textDecoration: "none",
                  animation: visible ? `cf-card-in 0.4s ease-out ${i * 50}ms both` : "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-hover)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-md)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "";
                }}
                aria-label={`${prob.problemName} — ${prob.problemRating ?? "unrated"} — ${prob.verdict}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p
                    className="text-xs font-semibold leading-tight line-clamp-2 group-hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {prob.problemName}
                  </p>
                  <span
                    className="text-code text-xs font-bold shrink-0 px-1.5 py-0.5 rounded-md"
                    style={{
                      color: ratingColor,
                      background: `${ratingColor}18`,
                    }}
                  >
                    {prob.problemRating ?? "?"}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2.5">
                  {prob.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-meta px-1.5 py-0.5 rounded"
                      style={{
                        background: "var(--bg-code)",
                        color: "var(--text-muted)",
                        fontSize: "0.58rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {prob.tags.length > 3 && (
                    <span className="text-meta" style={{ color: "var(--text-muted)", fontSize: "0.58rem", lineHeight: "1.6rem" }}>
                      +{prob.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Verdict */}
                    <span
                      className="text-meta px-1.5 py-0.5 rounded-md font-semibold"
                      style={{
                        background: "rgba(52,211,153,0.12)",
                        color: "var(--text-accent)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      AC
                    </span>
                    {/* Language */}
                    <span
                      className="text-meta px-1.5 py-0.5 rounded-md"
                      style={{
                        background: "var(--bg-code)",
                        color: "var(--text-secondary)",
                        fontSize: "0.6rem",
                      }}
                    >
                      {shortLang(prob.language)}
                    </span>
                  </div>
                  {/* Time */}
                  <span className="text-meta" style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}>
                    {timeAgo(prob.submittedAt)}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
