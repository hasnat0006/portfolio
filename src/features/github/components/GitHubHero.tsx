"use client";

import { ActionButton } from "@/components/ui/ActionButton";
import type { GitHubStats, GitHubUserInfo } from "@/types/github";
import { Building2, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CSS = `
@keyframes gh-hero-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes gh-badge-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
@keyframes gh-ring-pulse {
  0%, 100% { transform: scale(1);    opacity: 0.6; }
  50%       { transform: scale(1.1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .gh-hero-card, .gh-blink { animation: none !important; }
}
`;

function useCounter(target: number, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

interface ChipProps {
  label: string;
  value: string | number;
  icon?: string;
}
function InfoChip({ label, value, icon }: ChipProps) {
  return (
    <div
      className="flex flex-col items-center gap-0.5 p-2 rounded-md"
      style={{
        background: "var(--bg-code)",
        border: "1px solid var(--border-primary)",
        minWidth: 70,
      }}
    >
      {icon && (
        <span className="text-base" aria-hidden="true">
          {icon}
        </span>
      )}
      <span
        className="text-code font-bold text-sm"
        style={{ color: "var(--text-accent)" }}
      >
        {value}
      </span>
      <span
        className="font-mono tracking-light"
        style={{
          color: "var(--text-muted)",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

interface Props {
  userInfo: GitHubUserInfo;
  stats: GitHubStats;
}

export function GitHubHero({ userInfo, stats }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
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

  const followers = useCounter(userInfo.followers, 1600, visible);
  const repos = useCounter(userInfo.publicRepos, 1600, visible);
  const stars = useCounter(stats.totalStars, 1600, visible);
  const views = useCounter(userInfo.profileViews ?? 0, 1600, visible);
  const commitsThisYear = useCounter(stats.totalCommitsThisYear, 1600, visible);
  const prs = useCounter(stats.totalPRs, 1600, visible);
  const longestStreak = useCounter(stats.longestStreak, 1600, visible);

  const joinDate = new Date(userInfo.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className="gh-hero-card relative overflow-hidden rounded-md p-4"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
          boxShadow: "var(--shadow-md)",
          animation: visible ? "gh-hero-in 0.7s ease-out forwards" : "none",
          opacity: 0,
        }}
      >
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 8% 50%, var(--text-accent)06 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid var(--text-accent)",
                borderRadius: "9999px",
                animation: "gh-ring-pulse 2.8s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <div
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden"
              style={{
                border: "3px solid var(--text-accent)",
                boxShadow:
                  "0 0 24px color-mix(in srgb, var(--text-accent) 25%, transparent)",
              }}
            >
              {userInfo.avatarUrl ? (
                <Image
                  src={userInfo.avatarUrl}
                  alt={`${userInfo.login} avatar`}
                  fill
                  className="object-cover rounded-full"
                  unoptimized
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-3xl"
                  style={{ background: "var(--bg-code)" }}
                >
                  👤
                </div>
              )}
            </div>
            {/* Active badge */}
            {stats.isCurrentlyActive && (
              <div
                className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-md"
                style={{
                  background: "var(--bg-primary)",
                  border: "1.5px solid var(--text-accent)",
                  fontSize: "0.58rem",
                  color: "var(--text-accent)",
                }}
                title="Active in the last 30 days"
              >
                <span
                  className="gh-blink w-1.5 h-1.5 rounded-md"
                  style={{
                    background: "var(--text-accent)",
                    animation: "gh-badge-blink 1.4s ease-in-out infinite",
                  }}
                />
                Active
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-between md:items-center gap-2">
              <h3
                className="text-heading text-2xl md:text-3xl"
                style={{ color: "var(--text-primary)" }}
              >
                {userInfo.name ?? userInfo.login}
              </h3>
              <div className="shrink-0">
                <ActionButton
                  href={userInfo.htmlUrl}
                  icon="github"
                  label="View Profile"
                />
              </div>
            </div>

            {userInfo.login && (
              <p
                className="text-sm max-w-xl leading-relaxed"
                style={{ color: "var(--text-accent)" }}
              >
                @{userInfo.login}
              </p>
            )}
            <div
              className="flex mt-1 mb-4 flex-wrap justify-center md:justify-start gap-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {userInfo.company && (
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} aria-hidden="true" />
                  {userInfo.company.replace(/^@/, "")}
                </span>
              )}
              {userInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} aria-hidden="true" />
                  {userInfo.location}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={13} aria-hidden="true" />
                Member since {joinDate}
              </span>
            </div>
            {/* Chips */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
              <InfoChip label="Profile Views" value={visible ? views : "—"} />
              <InfoChip
                label="Contributions"
                value={stats.totalContributions}
              />
              <InfoChip label="Repositories" value={visible ? repos : "—"} />
              <InfoChip label="Followers" value={visible ? followers : "—"} />
              <InfoChip label="Stars Earned" value={visible ? stars : "—"} />
              <InfoChip
                label="Commits/Year"
                value={visible ? commitsThisYear : "—"}
              />
              <InfoChip label="Pull Requests" value={visible ? prs : "—"} />
              <InfoChip
                label="Longest Streak"
                value={visible ? longestStreak : "—"}
              />
            </div>

            {/* Meta */}
          </div>
        </div>
      </div>
    </>
  );
}
