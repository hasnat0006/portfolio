"use client";

import { useEffect, useRef, useState } from "react";
import type { Insight } from "../types";

const CSS = `
@keyframes cf-insight-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-insight-card { animation: none !important; }
}
`;

interface Props {
  insights: Insight[];
}

export function InsightCards({ insights }: Props) {
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
        <div className="mb-4">
          <h3 className="text-subheading font-semibold text-sm" style={{ color: "var(--text-secondary)" }}>
            Personal Insights
          </h3>
          <p className="text-meta mt-0.5" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
            Derived statistics from your competitive programming journey
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          role="list"
          aria-label="Personal insights"
        >
          {insights.map((insight, i) => (
            <div
              key={insight.label}
              role="listitem"
              className="cf-insight-card rounded-xl p-4 flex flex-col gap-1.5 transition-all duration-200"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
                animation: visible ? `cf-insight-in 0.4s ease-out ${i * 50}ms both` : "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-primary)";
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <span className="text-xl" aria-hidden="true">{insight.icon}</span>
              <p
                className="text-code font-bold text-sm leading-tight"
                style={{ color: "var(--text-accent)" }}
              >
                {insight.value}
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {insight.label}
              </p>
              {insight.sub && (
                <p
                  className="text-meta"
                  style={{ color: "var(--text-muted)", fontSize: "0.62rem" }}
                >
                  {insight.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
