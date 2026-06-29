"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GitHubStats, GitHubUserInfo } from "../types";

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
      className="flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-xl"
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
        className="text-meta"
        style={{
          color: "var(--text-muted)",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
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
        className="gh-hero-card relative overflow-hidden rounded-2xl p-6 md:p-8"
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
                  className="object-cover"
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
                className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--bg-primary)",
                  border: "1.5px solid var(--text-accent)",
                  fontSize: "0.58rem",
                  color: "var(--text-accent)",
                }}
                title="Active in the last 30 days"
              >
                <span
                  className="gh-blink w-1.5 h-1.5 rounded-full"
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
            <div className="flex flex-col md:flex-row items-center md:items-center gap-2">
              <h3
                className="text-heading text-2xl md:text-3xl"
                style={{ color: "var(--text-primary)" }}
              >
                {userInfo.name ?? userInfo.login}
              </h3>
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
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  {userInfo.company.replace(/^@/, "")}
                </span>
              )}
              {userInfo.location && (
                <span className="flex items-center gap-1.5">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {userInfo.location}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Member since {joinDate}
              </span>
            </div>
            {/* Chips */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
              <InfoChip label="Profile Views" value={visible ? views : "—"} />
              <InfoChip
                label="Contributions"
                value={stats.totalContributions}
              />
              <InfoChip label="Repositories" value={visible ? repos : "—"} />
              <InfoChip label="Followers" value={visible ? followers : "—"} />
              <InfoChip label="Following" value={userInfo.following} />
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

          {/* GitHub link */}
          <div className="shrink-0">
            <a
              href={userInfo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 -mt-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--bg-code)",
                color: "var(--text-accent)",
                border: "1px solid var(--border-accent)",
              }}
              aria-label="View GitHub profile"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View Profile
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
