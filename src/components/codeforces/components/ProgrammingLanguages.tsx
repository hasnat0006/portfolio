"use client";

import { useEffect, useRef, useState } from "react";
import type { LanguageStat } from "../types";

const CSS = `
@keyframes cf-lang-bar {
  from { width: 0; }
  to { width: var(--lang-w); }
}
@keyframes cf-lang-in {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-lang-bar { animation: none !important; width: var(--lang-w) !important; }
  .cf-lang-row { animation: none !important; }
}
`;

// Deterministic hue for each language
const LANG_COLORS: Record<string, string> = {
  "C++17": "#0ea5e9",
  "C++20": "#6366f1",
  "C++14": "#22d3ee",
  "C++": "#3b82f6",
  "Python": "#eab308",
  "PyPy": "#f59e0b",
  "Java": "#f97316",
  "Rust": "#ef4444",
  "Go": "#06b6d4",
  "Kotlin": "#a855f7",
};

function langColor(displayName: string): string {
  return LANG_COLORS[displayName] ?? "var(--text-accent)";
}

interface Props {
  languages: LanguageStat[];
}

export function ProgrammingLanguages({ languages }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const maxTotal = Math.max(...languages.map((l) => l.total), 1);

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className="rounded-2xl p-5 md:p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
      >
        <h3 className="text-subheading font-semibold text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
          Programming Languages
        </h3>
        <p className="text-meta mb-5" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
          Submission breakdown by language
        </p>

        <div className="space-y-4" role="list" aria-label="Programming language statistics">
          {languages.map((lang, i) => {
            const color = langColor(lang.displayName);
            const barPct = (lang.total / maxTotal) * 100;

            return (
              <div
                key={lang.language}
                role="listitem"
                className="cf-lang-row"
                style={{
                  animation: visible ? `cf-lang-in 0.4s ease-out ${i * 60}ms both` : "none",
                }}
              >
                <div className="flex items-center justify-between mb-1.5 gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: color }}
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      {lang.displayName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-meta" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                    <span>{lang.total} total</span>
                    <span style={{ color: "var(--text-accent)" }}>{lang.accepted} AC</span>
                    <span
                      className="font-bold"
                      style={{ color: lang.acceptanceRate >= 50 ? "var(--text-accent)" : "var(--text-error)" }}
                    >
                      {lang.acceptanceRate}%
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-code)" }}
                  role="progressbar"
                  aria-valuenow={lang.total}
                  aria-valuemax={maxTotal}
                  aria-label={`${lang.displayName}: ${lang.total} submissions`}
                >
                  <div
                    className="cf-lang-bar h-full rounded-full"
                    style={{
                      // @ts-expect-error CSS custom property
                      "--lang-w": `${barPct}%`,
                      width: visible ? `${barPct}%` : "0%",
                      background: `linear-gradient(90deg, ${color}, ${color}99)`,
                      animation: visible ? `cf-lang-bar 0.8s ease-out ${i * 60 + 200}ms both` : "none",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
