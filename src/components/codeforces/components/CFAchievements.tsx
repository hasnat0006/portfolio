"use client";

import { useEffect, useRef, useState } from "react";
import type { Achievement } from "../types";

const CSS = `
@keyframes cf-badge-in {
  from { opacity: 0; transform: scale(0.8) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes cf-badge-shine {
  0% { transform: translateX(-100%) rotate(20deg); }
  100% { transform: translateX(200%) rotate(20deg); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-badge { animation: none !important; }
  .cf-badge-shine { display: none !important; }
}
`;

const TIER_STYLES: Record<
  Achievement["tier"],
  { border: string; glow: string; textColor: string; bg: string; label: string }
> = {
  bronze: {
    border: "rgba(180,120,80,0.5)",
    glow: "rgba(180,120,80,0.15)",
    textColor: "#b47850",
    bg: "rgba(180,120,80,0.08)",
    label: "Bronze",
  },
  silver: {
    border: "rgba(160,170,185,0.5)",
    glow: "rgba(160,170,185,0.12)",
    textColor: "#94a3b8",
    bg: "rgba(160,170,185,0.08)",
    label: "Silver",
  },
  gold: {
    border: "rgba(245,190,60,0.5)",
    glow: "rgba(245,190,60,0.15)",
    textColor: "#f59e0b",
    bg: "rgba(245,190,60,0.08)",
    label: "Gold",
  },
  platinum: {
    border: "rgba(52,211,200,0.5)",
    glow: "rgba(52,211,200,0.18)",
    textColor: "#34d3c8",
    bg: "rgba(52,211,200,0.08)",
    label: "Platinum",
  },
};

interface Props {
  achievements: Achievement[];
}

export function CFAchievements({ achievements }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "unlocked">("unlocked");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const displayed = filter === "unlocked" ? achievements.filter((a) => a.unlocked) : achievements;

  return (
    <>
      <style>{CSS}</style>
      <div ref={ref}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-subheading font-semibold text-sm" style={{ color: "var(--text-secondary)" }}>
              Achievements
            </h3>
            <p className="text-meta mt-0.5" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
              {unlockedCount} / {achievements.length} unlocked
            </p>
          </div>
          <div className="flex gap-2">
            {(["unlocked", "all"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="text-meta px-3 py-1 rounded-lg transition-all duration-200 capitalize"
                style={{
                  background: filter === f ? "var(--bg-card-hover)" : "var(--bg-code)",
                  color: filter === f ? "var(--text-accent)" : "var(--text-muted)",
                  border: filter === f ? "1px solid var(--border-hover)" : "1px solid var(--border-primary)",
                  fontSize: "0.7rem",
                  fontWeight: filter === f ? 600 : 400,
                }}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          role="list"
          aria-label="Achievement badges"
        >
          {displayed.map((ach, i) => {
            const tier = TIER_STYLES[ach.tier];
            return (
              <div
                key={ach.id}
                role="listitem"
                className="cf-badge relative group flex flex-col items-center gap-1.5 p-3 rounded-xl text-center overflow-hidden"
                style={{
                  background: ach.unlocked ? tier.bg : "var(--bg-code)",
                  border: `1px solid ${ach.unlocked ? tier.border : "var(--border-primary)"}`,
                  boxShadow: ach.unlocked ? `0 0 16px ${tier.glow}` : "none",
                  opacity: ach.unlocked ? 1 : 0.35,
                  animation: visible ? `cf-badge-in 0.4s ease-out ${i * 40}ms both` : "none",
                  cursor: "default",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (ach.unlocked) {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.06) translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${tier.glow}`;
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = ach.unlocked ? `0 0 16px ${tier.glow}` : "none";
                }}
                aria-label={`${ach.title}: ${ach.description}${ach.unlocked ? " — Unlocked" : " — Locked"}`}
                title={ach.description}
              >
                {/* Shine sweep on unlocked hover */}
                {ach.unlocked && (
                  <div
                    className="cf-badge-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                      animation: "cf-badge-shine 1s ease-in-out infinite",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Tier label */}
                {ach.unlocked && (
                  <span
                    className="absolute top-1.5 right-1.5 text-meta px-1 py-0 rounded"
                    style={{
                      fontSize: "0.5rem",
                      color: tier.textColor,
                      background: `${tier.border}30`,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {tier.label}
                  </span>
                )}

                <span className="text-2xl" aria-hidden="true">{ach.icon}</span>
                <p
                  className="text-meta font-semibold leading-tight"
                  style={{
                    color: ach.unlocked ? tier.textColor : "var(--text-muted)",
                    fontSize: "0.62rem",
                  }}
                >
                  {ach.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
