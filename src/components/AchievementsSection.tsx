"use client";

import {
  CONTEST_ACHIEVEMENTS,
  KEY_CONTEST_ACHIEVEMENTS,
  OTHER_ACHIEVEMENTS,
} from "@/data/achievements";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ── Hooks
// ─────────────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

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

function useTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setTilt({ x: (dy / (r.height / 2)) * -5, y: (dx / (r.width / 2)) * 5 });
    setSpotlight({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const onEnter = () => setHovered(true);
  const onLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return { ref, tilt, spotlight, hovered, onMove, onEnter, onLeave };
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("champion") || (t.includes("1st") && !t.includes("runners")))
    return "🏆";
  if (t.includes("runners") || t.includes("runner")) return "🥈";
  if (t.includes("first solver") || t.includes("solver")) return "⚡";
  if (t.includes("globally") || t.includes("hacker cup")) return "🌐";
  if (t.includes("promising")) return "⭐";
  if (t.includes("dean")) return "📖";
  return "🎯";
}

function extractYear(name: string) {
  return name.match(/\d{4}/)?.[0] ?? "";
}

function percentile(rank: number, total: number) {
  return Math.round(((total - rank) / total) * 100);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── CSS (injected once)
// ─────────────────────────────────────────────────────────────────────────────
const STYLES = `
@keyframes ach-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ach-bar-fill {
  from { width: 0%; }
}
@keyframes ach-row-in {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes ach-count-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.08); }
  100% { transform: scale(1); }
}
.ach-shimmer-hover {
  position: relative;
  overflow: hidden;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// ── Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function GlassPanel({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`ach-shimmer-hover ${className}`}
      style={{
        background: "rgba(52,211,153,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(52,211,153,0.13)",
        borderRadius: "12px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className="flex items-center gap-4 mb-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(8px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, rgba(52,211,153,0.5), transparent)",
        }}
      />
      <span
        className="text-xs font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-md flex-shrink-0"
        style={{
          color: "var(--text-accent)",
          border: "1px solid rgba(52,211,153,0.25)",
          background: "rgba(52,211,153,0.07)",
        }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(52,211,153,0.5))",
        }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  delay = 0,
  isNumeric = true,
}: {
  label: string;
  value: string | number;
  sub: string;
  delay?: number;
  isNumeric?: boolean;
}) {
  const { ref, inView } = useInView();
  const num =
    typeof value === "number"
      ? value
      : parseInt(String(value).replace(/\D/g, "")) || 0;
  const prefix =
    typeof value === "string" ? (value.replace(/[0-9]/g, "")[0] ?? "") : "";
  const counted = useCounter(num, 1200, inView && isNumeric);
  const display = isNumeric ? `${prefix}${counted}` : value;

  return (
    <div
      ref={ref}
      className="ach-shimmer-hover"
      style={{
        background: "rgba(52,211,153,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(52,211,153,0.13)",
        borderRadius: "12px",
        padding: "1rem",
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      <p
        className="text-2xl font-bold font-mono"
        style={{
          color: "var(--text-accent)",
          textShadow: inView ? "0 0 20px rgba(52,211,153,0.3)" : "none",
          animation: inView
            ? `ach-count-pop 0.4s ease ${delay + 800}ms`
            : "none",
        }}
      >
        {display}
      </p>
      <p
        className="text-xs font-semibold mt-0.5"
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </p>
      <p
        className="text-[10px] font-mono"
        style={{ color: "var(--text-muted)" }}
      >
        {sub}
      </p>
    </div>
  );
}

function IcpcFeaturedCard({
  ach,
  index,
}: {
  ach: (typeof CONTEST_ACHIEVEMENTS)[0];
  index: number;
}) {
  const { ref: viewRef, inView } = useInView();
  const {
    ref: tiltRef,
    tilt,
    spotlight,
    hovered,
    onMove,
    onEnter,
    onLeave,
  } = useTilt();
  const pct = percentile(Number(ach.rank), ach.total_teams);

  return (
    <div
      ref={viewRef}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "none"
          : `translateY(32px) translateX(${index % 2 === 0 ? "-" : ""}12px)`,
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${index * 120}ms`,
      }}
    >
      <div
        ref={tiltRef as React.RefObject<HTMLDivElement>}
        className="ach-shimmer-hover relative rounded-md p-5"
        style={{
          background: "var(--bg-card)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered
            ? "1px solid rgba(52,211,153,0.4)"
            : "1px solid var(--border-accent)",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(52,211,153,0.15), 0 0 40px rgba(52,211,153,0.06)"
            : "0 2px 12px rgba(0,0,0,0.08)",
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(4px)`,
          transition: hovered
            ? "transform 0.1s ease, border-color 0.2s ease, box-shadow 0.2s ease"
            : "transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.3s ease",
          cursor: "default",
        }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 rounded-md pointer-events-none"
          style={{
            background: hovered
              ? "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, transparent 50%, rgba(34,211,238,0.04) 100%)"
              : "transparent",
            transition: "background 0.4s ease",
          }}
        />

        {/* Cursor spotlight */}
        {hovered && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: spotlight.x,
              top: spotlight.y,
              width: 280,
              height: 280,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(52,211,153,0.09) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
          />
        )}

        {/* Header row — right-aligned badges */}
        <div className="flex items-center justify-end gap-2 mb-4 relative z-10">
          <span
            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-widest"
            style={{
              color: "var(--text-accent)",
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.3)",
            }}
          >
            {ach.contest_type}
          </span>
          <span
            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md"
            style={{
              color: "var(--text-accent)",
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.3)",
            }}
          >
            top {100 - pct}%
          </span>
          <span
            className="text-[10px] font-mono px-2.5 py-1 rounded-md"
            style={{
              color: "var(--text-muted)",
              background: "rgba(52,211,153,0.06)",
              border: "1px solid rgba(52,211,153,0.15)",
            }}
          >
            {extractYear(ach.contest_name)}
          </span>
        </div>

        {/* Rank + Info */}
        <div className="flex items-start gap-4 relative z-10">
          <div className="flex-shrink-0 text-center">
            <p
              className="text-[10px] font-mono uppercase tracking-[0.15em] leading-none"
              style={{ color: "var(--text-accent)" }}
            >
              RANK
            </p>
            <p
              className="text-5xl font-bold font-mono leading-none mt-1"
              style={{
                color: "var(--text-accent)",
                textShadow: hovered
                  ? "0 0 24px rgba(52,211,153,0.5)"
                  : "0 0 12px rgba(52,211,153,0.2)",
                transition: "text-shadow 0.3s ease",
              }}
            >
              {ach.rank}
            </p>
            <p
              className="text-xs font-mono mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              out of {ach.total_teams}
            </p>
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <h4
              className="text-sm font-semibold leading-snug mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {ach.contest_name}
            </h4>
            <div className="space-y-1">
              <p
                className="text-xs font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                Hosted by:{" "}
                <span style={{ color: "var(--text-secondary)" }}>
                  {ach.hosted_by}
                </span>
              </p>
              <p
                className="text-xs font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                Team name:{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--text-accent)" }}
                >
                  {ach.team_name}
                </span>
              </p>
              {ach.problem_solved !== undefined && (
                <span
                  className="inline-block text-xs font-mono px-2 py-0.5 rounded-md mt-1"
                  style={{
                    background: "rgba(52,211,153,0.1)",
                    color: "var(--text-accent)",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  ✓ {ach.problem_solved} solved
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer links */}
        {(ach.standings_url && !ach.standings_url.includes("example.com")) ||
        (ach.post_url && ach.post_url.length > 0) ? (
          <div
            className="flex flex-wrap items-center gap-2 mt-4 pt-3 relative z-10"
            style={{ borderTop: "1px solid rgba(52,211,153,0.1)" }}
          >
            {ach.standings_url &&
              !ach.standings_url.includes("example.com") && (
                <a
                  href={ach.standings_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md"
                  style={{
                    color: "var(--text-accent)",
                    background: "rgba(52,211,153,0.08)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--text-accent)";
                    e.currentTarget.style.color = "#0a0f1a";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(52,211,153,0.08)";
                    e.currentTarget.style.color = "var(--text-accent)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <svg
                    className="inline-block w-3 h-3"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.4 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zm-144-80c0 8.8-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16zm0 64c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16s-16-7.2-16-16V256c0-8.8 7.2-16 16-16z" />
                  </svg>
                  Standings
                </a>
              )}
            {ach.post_url?.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md"
                style={{
                  color: "var(--text-accent)",
                  background: "rgba(52,211,153,0.08)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--text-accent)";
                  e.currentTarget.style.color = "#0a0f1a";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(52,211,153,0.08)";
                  e.currentTarget.style.color = "var(--text-accent)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Article_{i + 1}{" "}
                <svg
                  className="inline-block w-3 h-3"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ContestRow({
  ach,
  index,
  inView,
}: {
  ach: (typeof CONTEST_ACHIEVEMENTS)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const medals = ["🥇", "🥈", "🥉"];
  const isMedal = index < 3;
  const rankNum = Number(ach.rank);
  const rankColor =
    rankNum <= 50
      ? "var(--text-accent)"
      : rankNum <= 80
        ? "var(--text-primary)"
        : "var(--text-secondary)";

  return (
    <tr
      className="border-b"
      style={{
        borderColor: "rgba(52,211,153,0.07)",
        background: hovered ? "rgba(52,211,153,0.05)" : "transparent",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateX(-16px)",
        transition: `opacity 0.45s ease ${60 + index * 50}ms, transform 0.45s ease ${60 + index * 50}ms, background 0.2s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Medal / Index */}
      <td className="py-3 pl-4 pr-2 w-9">
        {isMedal ? (
          <span className="text-base" title={`#${index + 1} best result`}>
            {medals[index]}
          </span>
        ) : (
          <span
            className="text-xs font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            {index + 1}
          </span>
        )}
      </td>

      {/* Rank */}
      <td className="py-3 px-0 min-w-24">
        {ach.standings_url ? (
          <div className="flex flex-col items-center">
            <a
              href={ach.standings_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold font-mono no-underline hover:underline"
              style={{
                color: rankColor,
                textShadow:
                  rankNum <= 50 ? "0 0 10px rgba(52,211,153,0.3)" : "none",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              #{ach.rank}
            </a>
            <p
              className="text-xs font-mono mt-0.5 tracking-tighter"
              style={{ color: "var(--text-muted)" }}
            >
              out of {ach.total_teams}
            </p>
          </div>
        ) : (
          <span
            className="text-lg font-bold font-mono"
            style={{
              color: rankColor,
              textShadow:
                rankNum <= 50 ? "0 0 10px rgba(52,211,153,0.3)" : "none",
            }}
          >
            #{ach.rank}
          </span>
        )}
      </td>

      {/* Contest + host */}
      <td className="py-3 px-3 min-w-64">
        <p
          className="text-xs font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {ach.contest_name}
        </p>
        <p
          className="text-[10px] font-mono mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          {ach.hosted_by}
        </p>
      </td>

      {/* Team */}
      <td className="py-3 px-3">
        <span
          className="text-xs font-mono"
          style={{ color: "var(--text-accent)" }}
        >
          {ach.team_name}
        </span>
      </td>

      {/* Articles */}
      <td className="py-3 px-3 pr-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {ach.post_url?.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: "var(--text-accent)",
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--text-accent)";
                e.currentTarget.style.color = "#0a0f1a";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(52,211,153,0.1)";
                e.currentTarget.style.color = "var(--text-accent)";
                e.currentTarget.style.transform = "none";
              }}
            >
              Blog_{i + 1}{" "}
              <svg
                className="inline-block h-2.5 w-2.5"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
              </svg>
            </a>
          ))}
        </div>
      </td>
    </tr>
  );
}

function OtherCard({
  ach,
  index,
}: {
  ach: (typeof OTHER_ACHIEVEMENTS)[0];
  index: number;
}) {
  const { ref: viewRef, inView } = useInView();
  const {
    ref: tiltRef,
    tilt,
    spotlight,
    hovered,
    onMove,
    onEnter,
    onLeave,
  } = useTilt();
  const icon = getIcon(ach.title);

  return (
    <div
      ref={viewRef}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: `opacity 0.55s ease ${(index % 4) * 90}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${(index % 4) * 90}ms`,
      }}
    >
      <div
        ref={tiltRef as React.RefObject<HTMLDivElement>}
        className="ach-shimmer-hover relative overflow-hidden rounded-md p-5"
        style={{
          background: "var(--bg-card)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered
            ? "1px solid rgba(52,211,153,0.4)"
            : "1px solid var(--border-accent)",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(52,211,153,0.15), 0 0 40px rgba(52,211,153,0.06)"
            : "0 2px 12px rgba(0,0,0,0.08)",
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(4px)`,
          transition: hovered
            ? "transform 0.1s ease, border-color 0.2s ease, box-shadow 0.2s ease"
            : "transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.3s ease",
          cursor: "default",
        }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-md pointer-events-none"
          style={{
            background: hovered
              ? "linear-gradient(90deg, rgba(52,211,153,0.7), rgba(34,211,238,0.5), transparent)"
              : "linear-gradient(90deg, rgba(52,211,153,0.3), transparent)",
            transition: "background 0.4s ease",
          }}
        />

        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 rounded-md pointer-events-none"
          style={{
            background: hovered
              ? "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, transparent 50%, rgba(34,211,238,0.04) 100%)"
              : "transparent",
            transition: "background 0.4s ease",
          }}
        />

        {/* Cursor spotlight */}
        {hovered && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: spotlight.x,
              top: spotlight.y,
              width: 260,
              height: 260,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(52,211,153,0.09) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
          />
        )}

        {/* Header row — icon bubble + badge pills */}
        <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
          {/* Glowing icon bubble */}
          <div
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md text-xl"
            style={{
              background: hovered
                ? "rgba(52,211,153,0.15)"
                : "rgba(52,211,153,0.08)",
              border: hovered
                ? "1px solid rgba(52,211,153,0.35)"
                : "1px solid rgba(52,211,153,0.18)",
              boxShadow: hovered ? "0 0 16px rgba(52,211,153,0.25)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            {icon}
          </div>

          {/* Badge pills */}
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-widest"
              style={{
                color: "var(--text-accent)",
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.3)",
              }}
            >
              {ach.type}
            </span>
          </div>
        </div>

        {/* Title + detail */}
        <div className="relative z-10">
          <h4
            className="text-sm font-semibold leading-snug mb-1"
            style={{
              color: "var(--text-primary)",
              textShadow: hovered ? "0 0 20px rgba(52,211,153,0.15)" : "none",
              transition: "text-shadow 0.3s ease",
            }}
          >
            {ach.title}
          </h4>
          {ach.detail && (
            <p
              className="text-xs font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              {ach.detail}
            </p>
          )}
          {/* Hosted by */}
          <p
            className="text-xs font-mono mt-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Hosted by:{" "}
            <span style={{ color: "var(--text-secondary)" }}>
              {ach.hosted_by}
            </span>
          </p>
        </div>

        {/* Footer links */}
        {ach.post_url && ach.post_url.length > 0 && (
          <div
            className="flex flex-wrap items-center gap-2 mt-4 pt-3 relative z-10"
            style={{ borderTop: "1px solid rgba(52,211,153,0.1)" }}
          >
            {ach.post_url.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md"
                style={{
                  color: "var(--text-accent)",
                  background: "rgba(52,211,153,0.08)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--text-accent)";
                  e.currentTarget.style.color = "#0a0f1a";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(52,211,153,0.08)";
                  e.currentTarget.style.color = "var(--text-accent)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <svg
                  className="inline-block w-3 h-3"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
                Post_{i + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Main export
// ─────────────────────────────────────────────────────────────────────────────
export default function AchievementsSection() {
  const { ref: tableRef, inView: tableInView } = useInView(0.08);
  const bestContest = Math.min(
    ...CONTEST_ACHIEVEMENTS.map((a) => Number(a.rank)),
  );
  const totalContests =
    KEY_CONTEST_ACHIEVEMENTS.length + CONTEST_ACHIEVEMENTS.length;

  return (
    <section
      id="achievements"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
    >
      {/* Inject animations */}
      <style>{STYLES}</style>

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-code text-sm"
            style={{ color: "var(--text-accent)" }}
          >
            $
          </span>
          <h2
            className="text-heading text-2xl md:text-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            cat ./achievements
          </h2>
        </div>
        <p
          className="text-code text-sm ml-6 mb-12"
          style={{ color: "var(--text-muted)" }}
        >
          Competitive programming &amp; other milestones
        </p>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          <StatCard
            label="Total Contests"
            value={totalContests}
            sub="participated"
            delay={0}
          />
          <StatCard
            label="ICPC Regional Onsite"
            value={2}
            sub="appearances"
            delay={80}
          />
          <StatCard
            label="Best ICPC Onsite Rank"
            value={`#77`}
            sub="milestones"
            delay={160}
          />
          <StatCard
            label="Best IUPC Contest Rank"
            value={`#${bestContest}`}
            sub="in any contest"
            delay={240}
            isNumeric={false}
          />
        </div>

        {/* ════════════════════════════════════════════
            PART 1 — PROGRAMMING CONTESTS
        ════════════════════════════════════════════ */}
        <SectionDivider label="Key Achievements" />
        <div className="columns-1 md:columns-2 gap-4">
          {KEY_CONTEST_ACHIEVEMENTS.map((ach, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <IcpcFeaturedCard ach={ach} index={i} />
            </div>
          ))}
        </div>

        {/* IUPC Glass Table */}
        <SectionDivider label="All ICPC & IUPC Contests" />
        <div
          ref={tableRef}
          className="overflow-x-auto md:overflow-visible mb-8 md:mb-10"
        >
          <GlassPanel className="min-w-[650px] md:min-w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid rgba(52,211,153,0.1)",
                    background: "rgba(52,211,153,0.04)",
                  }}
                >
                  {["", "Rank", "Contest", "Team Name", "Articles"].map(
                    (h, i) => (
                      <th
                        key={i}
                        className={`py-3 text-left ${i === 0 ? "pl-4 pr-2 w-9" : i === 1 ? "px-3 w-16" : i === 3 ? "px-3 w-48" : i === 4 ? "px-3 w-44" : i === 5 ? "px-3 pr-4" : "px-3"}`}
                      >
                        <span
                          className="text-[10px] font-mono uppercase tracking-widest font-semibold"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {h}
                        </span>
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {CONTEST_ACHIEVEMENTS.map((ach, i) => (
                  <ContestRow
                    key={i}
                    ach={ach}
                    index={i}
                    inView={tableInView}
                  />
                ))}
              </tbody>
            </table>
          </GlassPanel>
        </div>

        {/* ════════════════════════════════════════════
            PART 2 — OTHER ACHIEVEMENTS
        ════════════════════════════════════════════ */}
        <div className="mt-12">
          <SectionDivider label="Other Achievements" />
          <div className="columns-1 md:columns-2 gap-3">
            {OTHER_ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className="break-inside-avoid mb-3">
                <OtherCard ach={ach} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
