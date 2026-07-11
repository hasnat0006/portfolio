"use client";

import { ActionButton } from "@/components/ui/ActionButton";
import { Badge } from "@/components/ui/Badge";
import { GlowIcon } from "@/components/ui/GlowIcon";
import { HoverCard } from "@/components/ui/HoverCard";
import { ANIMATION } from "@/constants/achievements";
import { type OtherAchievement } from "@/data/achievements";
import { useInView } from "@/hooks/useInView";
import { getIcon } from "@/utils/achievements";

interface OtherAchievementCardProps {
  achievement: OtherAchievement;
  index: number;
}

/**
 * Non-contest achievement card (awards, first solves, recognition).
 * Renders with 3D tilt, accent bar, and staggered fade-in.
 */
export function OtherAchievementCard({
  achievement,
  index,
}: OtherAchievementCardProps) {
  const { ref: viewRef, inView } = useInView();
  const icon = getIcon(achievement.title);
  const hasPosts = achievement.post_url && achievement.post_url.length > 0;

  return (
    <div
      ref={viewRef}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: `opacity ${ANIMATION.fadeDuration} ease ${(index % 4) * ANIMATION.cardStaggerDelayFast}ms, transform ${ANIMATION.fadeDuration} ${ANIMATION.springCurve} ${(index % 4) * ANIMATION.cardStaggerDelayFast}ms`,
      }}
    >
      <HoverCard className="p-5" topAccent>
        {(hovered) => (
          <>
            {/* Header row — icon bubble + badge */}
            <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
              <GlowIcon icon={icon} hovered={hovered} />
              <Badge bold uppercase>
                {achievement.type}
              </Badge>
            </div>

            {/* Title + detail */}
            <div className="relative z-10">
              <h4
                className="text-sm font-semibold leading-snug mb-1"
                style={{
                  color: "var(--text-primary)",
                  textShadow: hovered
                    ? "0 0 20px rgba(52,211,153,0.15)"
                    : "none",
                  transition: "text-shadow 0.3s ease",
                }}
              >
                {achievement.title}
              </h4>
              {achievement.detail && (
                <p
                  className="text-xs font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  {achievement.detail}
                </p>
              )}
              <p
                className="text-xs font-mono mt-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Hosted by:{" "}
                <span style={{ color: "var(--text-secondary)" }}>
                  {achievement.hosted_by}
                </span>
              </p>
            </div>

            {/* Footer links */}
            {hasPosts && (
              <div
                className="flex flex-wrap items-center gap-2 mt-4 pt-3 relative z-10"
                style={{ borderTop: "1px solid rgba(52,211,153,0.1)" }}
              >
                {achievement.post_url!.map((url, i) => (
                  <ActionButton key={i} href={url} label={`post_${i + 1}`} />
                ))}
              </div>
            )}
          </>
        )}
      </HoverCard>
    </div>
  );
}
