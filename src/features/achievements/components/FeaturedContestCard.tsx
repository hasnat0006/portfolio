"use client";

import { Badge } from "@/components/ui/Badge";
import { ExternalLinkButton } from "@/components/ui/ExternalLinkButton";
import { HoverCard } from "@/components/ui/HoverCard";
import { ANIMATION, EYE_ICON_PATH } from "@/constants/achievements";
import { type ContestAchievement } from "@/data/achievements";
import { useInView } from "@/hooks/useInView";
import { extractYear, percentile } from "@/utils/achievements";

interface FeaturedContestCardProps {
  achievement: ContestAchievement;
  index: number;
}

const EYE_ICON = (
  <svg
    className="inline-block w-3 h-3"
    viewBox="0 0 576 512"
    fill="currentColor"
  >
    <path d={EYE_ICON_PATH} />
  </svg>
);

/**
 * Featured contest card (for key achievements like ICPC regionals, top ranks).
 * Renders with 3D tilt, spotlight, and staggered fade-in animation.
 */
export function FeaturedContestCard({
  achievement,
  index,
}: FeaturedContestCardProps) {
  const { ref: viewRef, inView } = useInView();
  const percentileRank = percentile(
    Number(achievement.rank),
    achievement.total_teams,
  );
  const year = extractYear(achievement.contest_name);
  const hasStandings =
    achievement.standings_url &&
    !achievement.standings_url.includes("example.com");
  const hasPosts = achievement.post_url && achievement.post_url.length > 0;

  return (
    <div
      ref={viewRef}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "none"
          : `translateY(32px) translateX(${index % 2 === 0 ? "-" : ""}12px)`,
        transition: `opacity ${ANIMATION.fadeDurationSlow} ease ${index * ANIMATION.cardStaggerDelay}ms, transform ${ANIMATION.fadeDurationSlow} ${ANIMATION.springCurve} ${index * ANIMATION.cardStaggerDelay}ms`,
      }}
    >
      <HoverCard className="p-4">
        {(hovered) => (
          <>
            {/* Header row — right-aligned badges */}
            <div className="flex items-center justify-end gap-1.5 mb-3 relative z-10">
              {achievement.contest_type && (
                <Badge bold uppercase>
                  {achievement.contest_type}
                </Badge>
              )}
              {!Number.isNaN(percentileRank) && (
                <Badge bold>top {100 - percentileRank}%</Badge>
              )}
              {year && <Badge variant="muted">{year}</Badge>}
            </div>

            {/* Rank + Info */}
            <div className="flex items-start gap-3 relative z-10">
              <div className="flex-shrink-0 text-center">
                <p
                  className="text-[10px] font-mono uppercase tracking-[0.15em] leading-none"
                  style={{ color: "var(--text-accent)" }}
                >
                  RANK
                </p>
                <p
                  className="text-4xl font-bold font-mono leading-none mt-1"
                  style={{
                    color: "var(--text-accent)",
                    textShadow: hovered
                      ? "0 0 24px rgba(52,211,153,0.5)"
                      : "0 0 12px rgba(52,211,153,0.2)",
                    transition: "text-shadow 0.3s ease",
                  }}
                >
                  #{achievement.rank}
                </p>
                <p
                  className="text-xs font-mono mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  out of {achievement.total_teams}
                </p>
              </div>

              <div className="flex-1 min-w-0 pt-1 items-start justify-start">
                <h4
                  className="text-sm font-semibold"
                  style={{
                    color: "var(--text-primary)",
                    textShadow: hovered
                      ? "0 0 20px rgba(52,211,153,0.15)"
                      : "none",
                    transition: "text-shadow 0.3s ease",
                  }}
                >
                  {achievement.contest_name}
                </h4>
                <p
                  className="text-xs font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  By:{" "}
                  <span style={{ color: "var(--text-secondary)" }}>
                    {achievement.hosted_by}
                  </span>
                </p>
              </div>
            </div>

            {/* Footer links */}
            {(hasStandings || hasPosts) && (
              <div
                className="flex flex-wrap items-center gap-2 mt-4 pt-3 relative z-10"
                style={{ borderTop: "1px solid rgba(52,211,153,0.1)" }}
              >
                {hasStandings && (
                  <ExternalLinkButton
                    href={achievement.standings_url!}
                    label="Standings"
                    icon={EYE_ICON}
                  />
                )}
                {achievement.post_url?.map((url, i) => (
                  <ExternalLinkButton
                    key={i}
                    href={url}
                    label={`post_${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </HoverCard>
    </div>
  );
}
