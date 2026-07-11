"use client";

import { EXP_ANIMATION, TIMELINE_CARD_STYLE } from "@/constants/experience";
import { useInView } from "@/hooks/useInView";
import type { ReactNode } from "react";

interface TimelineCardProps {
  index: number;
  ariaLabel: string;
  children: ReactNode;
}

/**
 * Shared card container for timeline entries.
 * Handles scroll-into-view animation and hover lift.
 */
export function TimelineCard({
  index,
  ariaLabel,
  children,
}: TimelineCardProps) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      className="exp-item group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: `opacity ${EXP_ANIMATION.fadeDuration} ease ${index * EXP_ANIMATION.staggerDelay}ms, transform ${EXP_ANIMATION.fadeDuration} ${EXP_ANIMATION.fadeCurve} ${index * EXP_ANIMATION.staggerDelay}ms`,
      }}
      aria-label={ariaLabel}
    >
      <div
        className="rounded-md p-4 transition-all duration-300 relative"
        style={{
          ...TIMELINE_CARD_STYLE,
          transform: "translateY(0)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
          e.currentTarget.style.borderColor = "var(--text-accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "var(--shadow-sm)";
          e.currentTarget.style.borderColor = "var(--border-accent)";
        }}
      >
        {children}
      </div>
    </article>
  );
}
