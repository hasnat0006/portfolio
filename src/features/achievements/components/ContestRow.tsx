"use client";

import { ActionButton } from "@/components/ui/ActionButton";
import { type ContestAchievement } from "@/data/achievements";
import { getRankColor } from "@/utils/achievements";
import { useState } from "react";

interface ContestRowProps {
  achievement: ContestAchievement;
  index: number;
  inView: boolean;
}

const MEDALS = ["🥇", "🥈", "🥉"];

/**
 * Single table row in the ICPC / IUPC achievements table.
 * Shows rank, contest details, team name, and article links.
 */
export function ContestRow({ achievement, index, inView }: ContestRowProps) {
  const [hovered, setHovered] = useState(false);
  const isMedal = index < 3;
  const rankNum = Number(achievement.rank);
  const rankColor = getRankColor(rankNum);

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
            {MEDALS[index]}
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
        <div className="flex flex-col items-center">
          {achievement.standings_url ? (
            <a
              href={achievement.standings_url}
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
              #{achievement.rank}
            </a>
          ) : (
            <span
              className="text-lg font-bold font-mono"
              style={{
                color: rankColor,
                textShadow:
                  rankNum <= 50 ? "0 0 10px rgba(52,211,153,0.3)" : "none",
              }}
            >
              #{achievement.rank}
            </span>
          )}
          <p
            className="text-xs font-mono mt-0.5 tracking-tighter"
            style={{ color: "var(--text-muted)" }}
          >
            out of {achievement.total_teams}
          </p>
        </div>
      </td>

      {/* Contest + host */}
      <td className="py-3 px-3 min-w-64">
        <p
          className="text-xs font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {achievement.contest_name}
        </p>
        <p
          className="text-[10px] font-mono mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          {achievement.hosted_by}
        </p>
      </td>

      {/* Team */}
      <td className="py-3 px-3">
        <span
          className="text-xs font-mono"
          style={{ color: "var(--text-accent)" }}
        >
          {achievement.team_name}
        </span>
      </td>

      {/* Articles */}
      <td className="py-3 px-3 pr-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {achievement.post_url?.map((url, i) => (
            <ActionButton key={i} href={url} label={`post_${i + 1}`} />
          ))}
        </div>
      </td>
    </tr>
  );
}
