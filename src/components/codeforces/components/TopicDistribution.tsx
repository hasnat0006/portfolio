"use client";

import { useEffect, useRef, useState } from "react";
import type { TopicStat } from "../types";

const CSS = `
@keyframes cf-topic-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes cf-progress-grow {
  from { width: 0; }
  to { width: var(--prog-w); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-topic-card { animation: none !important; }
  .cf-progress-bar { animation: none !important; width: var(--prog-w) !important; }
}
`;

// Consistent hue per topic (deterministic)
function topicHue(topic: string): number {
  let h = 0;
  for (let i = 0; i < topic.length; i++) h = (h * 31 + topic.charCodeAt(i)) % 360;
  return h;
}

interface Props {
  topics: TopicStat[];
}

export function TopicDistribution({ topics }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayed = showAll ? topics : topics.slice(0, 12);
  const maxCount = topics[0]?.count ?? 1;

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className="rounded-2xl p-5 md:p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-subheading font-semibold text-sm" style={{ color: "var(--text-secondary)" }}>
              Topic Distribution
            </h3>
            <p className="text-meta mt-0.5" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
              Tags of accepted problems, sorted by frequency
            </p>
          </div>
          <span
            className="text-meta px-2 py-1 rounded-lg"
            style={{ background: "var(--bg-code)", color: "var(--text-muted)", fontSize: "0.65rem" }}
          >
            {topics.length} topics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="list" aria-label="Topic statistics">
          {displayed.map((topic, i) => {
            const hue = topicHue(topic.topic);
            const color = `hsl(${hue}, 60%, 55%)`;
            const bgColor = `hsl(${hue}, 60%, 55%, 0.1)`;
            const progPct = (topic.count / maxCount) * 100;

            return (
              <div
                key={topic.topic}
                role="listitem"
                className="cf-topic-card group rounded-xl p-3 transition-all duration-200"
                style={{
                  background: "var(--bg-code)",
                  border: "1px solid var(--border-primary)",
                  animation: visible ? `cf-topic-in 0.4s ease-out ${(i % 12) * 40}ms both` : "none",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-medium capitalize leading-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {topic.topic}
                  </span>
                  <span
                    className="text-code text-xs font-bold px-1.5 py-0.5 rounded-md shrink-0"
                    style={{ background: bgColor, color }}
                  >
                    {topic.count}
                  </span>
                </div>
                {/* Progress bar */}
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-card-hover)" }}
                >
                  <div
                    className="cf-progress-bar h-full rounded-full"
                    style={{
                      // @ts-expect-error CSS custom property
                      "--prog-w": `${progPct}%`,
                      width: visible ? `${progPct}%` : "0%",
                      background: color,
                      animation: visible ? `cf-progress-grow 0.7s ease-out ${(i % 12) * 40 + 200}ms both` : "none",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {topics.length > 12 && (
          <button
            onClick={() => setShowAll((p) => !p)}
            className="mt-4 w-full text-sm py-2 rounded-xl transition-all duration-200 font-medium"
            style={{
              background: "var(--bg-code)",
              color: "var(--text-accent)",
              border: "1px solid var(--border-accent)",
            }}
            aria-expanded={showAll}
          >
            {showAll ? "Show less" : `Show all ${topics.length} topics`}
          </button>
        )}
      </div>
    </>
  );
}
