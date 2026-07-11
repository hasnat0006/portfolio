"use client";

import { ActionButton } from "@/components/ui/ActionButton";
import type { CFUserInfo, DashboardStats } from "@/types/codeforces";
import { getRankColor } from "@/types/codeforces";
import { Building2, Calendar } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── Animated counter ──────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1600, active = false) {
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

// ── Injected CSS ──────────────────────────────────────────────────────────────
const HERO_CSS = `
@keyframes cf-hero-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes cf-pulse-ring {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.08); }
}
@keyframes cf-badge-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@media (prefers-reduced-motion: reduce) {
  .cf-hero-card, .cf-badge-dot { animation: none !important; }
}
`;

interface Props {
  userInfo: CFUserInfo;
  stats: DashboardStats;
}

function InfoChip({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-0.5 px-4 py-3 rounded-md"
      style={{
        background: "var(--bg-code)",
        border: "1px solid var(--border-primary)",
        minWidth: "80px",
      }}
    >
      <span
        className="text-meta"
        style={{
          color: "var(--text-muted)",
          fontSize: "0.65rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        className="text-code font-bold text-sm"
        style={{ color: color ?? "var(--text-primary)" }}
      >
        {value}
      </span>
    </div>
  );
}

export function CodeforcesHero({ userInfo, stats }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
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

  const animatedRating = useCounter(userInfo.rating, 1800, visible);
  const rankColor = getRankColor(userInfo.rank);
  const maxRankColor = getRankColor(userInfo.maxRank);

  const regDate = userInfo.registrationTimeSeconds
    ? new Date(userInfo.registrationTimeSeconds * 1000).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      )
    : "—";

  return (
    <>
      <style>{HERO_CSS}</style>
      <div
        ref={cardRef}
        className="cf-hero-card relative overflow-hidden rounded-md p-6 md:p-8"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
          boxShadow: "var(--shadow-md)",
          animation: visible ? "cf-hero-in 0.7s ease-out forwards" : "none",
          opacity: 0,
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 10% 50%, ${rankColor}08 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            {/* Animated ring */}
            <div
              className="absolute inset-0 rounded-full cf-badge-dot"
              style={{
                border: `2px solid ${rankColor}`,
                borderRadius: "9999px",
                animation: "cf-pulse-ring 2.5s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <div
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden"
              style={{
                border: `3px solid ${rankColor}`,
                boxShadow: `0 0 24px ${rankColor}30`,
              }}
            >
              {userInfo.avatar ? (
                <Image
                  src={userInfo.avatar}
                  alt={`${userInfo.handle} avatar`}
                  fill
                  className="object-cover rounded-full"
                  unoptimized
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-4xl"
                  style={{ background: "var(--bg-code)" }}
                >
                  👤
                </div>
              )}
            </div>
            {/* Currently Active badge */}
            {stats.isCurrentlyActive && (
              <div
                className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-md text-meta"
                style={{
                  background: "var(--bg-primary)",
                  border: "1.5px solid var(--text-accent)",
                  fontSize: "0.6rem",
                  color: "var(--text-accent)",
                }}
                title="Has AC submissions in the last 30 days"
              >
                <span
                  className="cf-badge-dot w-1.5 h-1.5 rounded-md"
                  style={{
                    background: "var(--text-accent)",
                    animation: "cf-badge-blink 1.5s ease-in-out infinite",
                  }}
                />
                Active
              </div>
            )}
          </div>

          {/* Profile info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 mb-2">
              <h3
                className="text-heading text-2xl md:text-3xl"
                style={{ color: "var(--text-primary)" }}
              >
                {userInfo.handle}
              </h3>
              <span
                className="px-3 py-1 rounded-md text-meta font-semibold capitalize"
                style={{
                  background: `${rankColor}18`,
                  color: rankColor,
                  border: `1px solid ${rankColor}40`,
                  fontSize: "0.75rem",
                }}
              >
                {userInfo.rank}
              </span>
            </div>

            {/* Large animated rating */}
            <div className="flex flex-col md:flex-row items-center md:items-baseline gap-1 md:gap-3 mb-4">
              <span
                className="text-code font-bold"
                style={{
                  color: rankColor,
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  lineHeight: 1,
                }}
                aria-label={`Current rating: ${userInfo.rating}`}
              >
                {visible ? animatedRating : "—"}
              </span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                current rating
              </span>
            </div>

            {/* Info chips */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <InfoChip
                label="Max Rating"
                value={userInfo.maxRating}
                color={maxRankColor}
              />
              <InfoChip
                label="Max Rank"
                value={userInfo.maxRank}
                color={maxRankColor}
              />
              <InfoChip label="Contests" value={stats.contests.length} />
              <InfoChip
                label="Contribution"
                value={`${userInfo.contribution > 0 ? "+" : ""}${userInfo.contribution}`}
              />
              <InfoChip label="Friend of" value={`${userInfo.friendOfCount}`} />
            </div>

            {/* Registration & org */}
            <div
              className="flex flex-wrap justify-center md:justify-start gap-4 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                Registered {regDate}
              </span>
              {userInfo.organization && (
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} aria-hidden="true" />
                  {userInfo.organization}
                </span>
              )}
            </div>
          </div>

          {/* CF profile link */}
          <div className="shrink-0">
            <ActionButton
              href={`https://codeforces.com/profile/${userInfo.handle}`}
              icon="live"
              label="View Profile"
            />
          </div>
        </div>
      </div>
    </>
  );
}
