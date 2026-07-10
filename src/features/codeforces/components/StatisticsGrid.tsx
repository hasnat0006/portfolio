"use client";

import type { CFInsight, CFUserInfo, DashboardStats } from "@/types/codeforces";
import { getRankColor } from "@/types/codeforces";
import { useEffect, useRef, useState } from "react";

const STATS_CSS = `
@keyframes cf-stat-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes cf-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.cf-stat-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.4s ease;
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(52, 211, 153, 0.04) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  pointer-events: none;
}
.cf-stat-card:hover::before {
  opacity: 1;
  animation: cf-shimmer 2.5s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .cf-stat-card { animation: none !important; }
  .cf-stat-card::before { display: none; }
}
`;

function useCounter(target: number, duration = 1400, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const pct = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setVal(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

interface StatCardProps {
  value: number | string;
  label: string;
  description: string;
  color?: string;
  delay?: number;
  visible: boolean;
  isText?: boolean;
}

function StatCard({
  value,
  label,
  description,
  color,
  delay = 0,
  visible,
  isText = false,
}: StatCardProps) {
  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const numericTarget = typeof value === "number" ? value : 0;
  const animated = useCounter(numericTarget, 1400, visible && !isText);

  const displayValue = isText
    ? String(value)
    : typeof value === "number"
      ? animated
      : value;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const accentColor = color ?? "var(--text-accent)";

  return (
    <div
      ref={ref}
      className="cf-stat-card relative rounded-lg overflow-hidden transition-all duration-300"
      style={{
        background: hovered
          ? "color-mix(in srgb, var(--bg-card-hover) 80%, transparent)"
          : "color-mix(in srgb, var(--bg-card) 65%, transparent)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: hovered
          ? `1px solid color-mix(in srgb, ${accentColor} 40%, transparent)`
          : "1px solid var(--border-primary)",
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px color-mix(in srgb, ${accentColor} 15%, transparent)`
          : "var(--shadow-sm)",
        animation: visible
          ? `cf-stat-in 0.5s ease-out ${delay}ms both`
          : "none",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setSpotlight({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Accent top strip */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-lg"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, color-mix(in srgb, ${accentColor} 20%, transparent))`,
          opacity: hovered ? 0.9 : 0.5,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: hovered
            ? `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, color-mix(in srgb, ${accentColor} 8%, transparent) 0%, transparent 70%)`
            : "transparent",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-3 flex flex-col items-center justify-center gap-1.5">
        <div className="flex flex-col items-center justify-center">
          <p
            className="font-bold text-base leading-tight"
            style={{
              color: accentColor,
              transition: "color 0.3s ease",
            }}
            aria-label={`${label}: ${value}`}
          >
            {displayValue}
          </p>
          <p
            className="text-sm text-[0.65rem] font-medium mt-0.5"
            style={{
              color: "var(--text-secondary)",
              transition: "color 0.3s ease",
            }}
          >
            {label}
          </p>
          <p
            className="text-meta leading-tight mt-0.5"
            style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface Props {
  userInfo: CFUserInfo;
  stats: DashboardStats;
  insights?: CFInsight[];
}

export function StatisticsGrid({ userInfo, stats, insights }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const rankColor = getRankColor(userInfo.rank);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cards: StatCardProps[] = [
    {
      value: userInfo.rating,
      label: "Current Rating",
      description: `${userInfo.rank} tier`,
      color: rankColor,
      visible,
      delay: 0,
    },
    {
      value: userInfo.maxRating,
      label: "Highest Rating",
      description: `Peak: ${userInfo.maxRank}`,
      color: getRankColor(userInfo.maxRank),
      visible,
      delay: 50,
    },
    {
      value: stats.contests.length,
      label: "Total Contests",
      description: "Rated rounds participated",
      visible,
      delay: 100,
    },
    {
      value: stats.solved.count,
      label: "Problems Solved",
      description: "Unique accepted problems",
      visible,
      delay: 150,
    },
    {
      value: stats.totalSubmissions,
      label: "Total Submissions",
      description: "All attempts ever made",
      visible,
      delay: 200,
    },
    {
      value: stats.acceptanceRate,
      label: "Acceptance Rate",
      description: "% of submissions accepted",
      color:
        stats.acceptanceRate >= 50 ? "var(--text-accent)" : "var(--text-error)",
      visible,
      delay: 250,
    },
    {
      value: stats.currentStreak,
      label: "Current Streak",
      description: "Consecutive solving days",
      color: stats.currentStreak > 0 ? "#f97316" : undefined,
      visible,
      delay: 300,
    },
    {
      value: stats.longestStreak,
      label: "Longest Streak",
      description: "Best consecutive days ever",
      color: "#f59e0b",
      visible,
      delay: 350,
    },
    {
      value: stats.averageSolvedRating,
      label: "Avg Solved Rating",
      description: "Mean rating of solved problems",
      visible,
      delay: 400,
    },
    {
      value: stats.hardestSolved?.rating ?? 0,
      label: "Hardest Solved",
      description: stats.hardestSolved?.name
        ? stats.hardestSolved.name.length > 22
          ? stats.hardestSolved.name.slice(0, 22) + "…"
          : stats.hardestSolved.name
        : "No rated problem solved",
      color: stats.hardestSolved?.rating
        ? getRankColor(
            stats.hardestSolved.rating >= 2600
              ? "grandmaster"
              : stats.hardestSolved.rating >= 2300
                ? "master"
                : stats.hardestSolved.rating >= 1900
                  ? "expert"
                  : stats.hardestSolved.rating >= 1600
                    ? "specialist"
                    : "pupil",
          )
        : undefined,
      visible,
      delay: 450,
    },
  ];

  const insightCards: StatCardProps[] = (insights ?? []).map((insight, i) => ({
    value: insight.value,
    label: insight.label,
    description: insight.sub ?? "",
    visible,
    delay: 500 + i * 40,
    isText: true,
  }));

  const allCards = [...cards, ...insightCards];

  return (
    <>
      <style>{STATS_CSS}</style>
      <div ref={ref}>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3"
          role="list"
          aria-label="Codeforces statistics"
        >
          {allCards.map((card, i) => (
            <div key={i} role="listitem">
              <StatCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
