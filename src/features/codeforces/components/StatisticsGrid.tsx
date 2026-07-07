"use client";

import type { CFUserInfo, DashboardStats } from "@/types/codeforces";
import { getRankColor } from "@/types/codeforces";
import { useEffect, useRef, useState } from "react";

const STATS_CSS = `
@keyframes cf-stat-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-stat-card { animation: none !important; }
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
  icon: React.ReactNode;
  value: number | string;
  label: string;
  description: string;
  color?: string;
  delay?: number;
  visible: boolean;
  isText?: boolean;
}

function StatCard({
  icon,
  value,
  label,
  description,
  color,
  delay = 0,
  visible,
  isText = false,
}: StatCardProps) {
  const [hovered, setHovered] = useState(false);
  const numericTarget = typeof value === "number" ? value : 0;
  const animated = useCounter(numericTarget, 1400, visible && !isText);

  const displayValue = isText
    ? String(value)
    : typeof value === "number"
      ? animated
      : value;

  return (
    <div
      className="cf-stat-card relative rounded-md p-4 flex flex-col gap-2 transition-all duration-300"
      style={{
        background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-primary)"}`,
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        animation: visible
          ? `cf-stat-in 0.5s ease-out ${delay}ms both`
          : "none",
        transform: hovered ? "translateY(-2px)" : "none",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center"
        style={{ background: `${color ?? "var(--text-accent)"}18` }}
        aria-hidden="true"
      >
        <span style={{ color: color ?? "var(--text-accent)" }}>{icon}</span>
      </div>
      <div>
        <p
          className="text-code font-bold text-xl leading-tight"
          style={{ color: color ?? "var(--text-accent)" }}
          aria-label={`${label}: ${value}`}
        >
          {displayValue}
        </p>
        <p
          className="text-subheading text-xs font-medium mt-0.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </p>
        <p
          className="text-meta mt-1 leading-tight"
          style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const IconRating = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconTrophy = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);
const IconCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconList = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const IconTarget = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const IconFlame = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);
const IconStar = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconChevronUp = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const IconPercent = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);
const IconBarChart = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

interface Props {
  userInfo: CFUserInfo;
  stats: DashboardStats;
}

export function StatisticsGrid({ userInfo, stats }: Props) {
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
      icon: <IconRating />,
      value: userInfo.rating,
      label: "Current Rating",
      description: `${userInfo.rank} tier`,
      color: rankColor,
      visible,
      delay: 0,
    },
    {
      icon: <IconTrophy />,
      value: userInfo.maxRating,
      label: "Highest Rating",
      description: `Peak: ${userInfo.maxRank}`,
      color: getRankColor(userInfo.maxRank),
      visible,
      delay: 50,
    },
    {
      icon: <IconBarChart />,
      value: stats.contests.length,
      label: "Total Contests",
      description: "Rated rounds participated",
      visible,
      delay: 100,
    },
    {
      icon: <IconCheck />,
      value: stats.solved.count,
      label: "Problems Solved",
      description: "Unique accepted problems",
      visible,
      delay: 150,
    },
    {
      icon: <IconList />,
      value: stats.totalSubmissions,
      label: "Total Submissions",
      description: "All attempts ever made",
      visible,
      delay: 200,
    },
    {
      icon: <IconPercent />,
      value: stats.acceptanceRate,
      label: "Acceptance Rate",
      description: "% of submissions accepted",
      color:
        stats.acceptanceRate >= 50 ? "var(--text-accent)" : "var(--text-error)",
      visible,
      delay: 250,
    },
    {
      icon: <IconFlame />,
      value: stats.currentStreak,
      label: "Current Streak",
      description: "Consecutive solving days",
      color: stats.currentStreak > 0 ? "#f97316" : undefined,
      visible,
      delay: 300,
    },
    {
      icon: <IconStar />,
      value: stats.longestStreak,
      label: "Longest Streak",
      description: "Best consecutive days ever",
      color: "#f59e0b",
      visible,
      delay: 350,
    },
    {
      icon: <IconTarget />,
      value: stats.averageSolvedRating,
      label: "Avg Solved Rating",
      description: "Mean rating of solved problems",
      visible,
      delay: 400,
    },
    {
      icon: <IconChevronUp />,
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

  return (
    <>
      <style>{STATS_CSS}</style>
      <div
        ref={ref}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
        role="list"
        aria-label="Codeforces statistics"
      >
        {cards.map((card, i) => (
          <div key={i} role="listitem">
            <StatCard {...card} />
          </div>
        ))}
      </div>
    </>
  );
}
