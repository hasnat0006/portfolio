"use client";

import { EXP_ANIMATION, TIMELINE_CARD_STYLE } from "@/constants/experience";
import { useInView } from "@/hooks/useInView";
import type { ReactNode } from "react";
import { TimelineNode } from "./TimelineNode";

interface TimelineCardProps {
  type: "education" | "work" | "volunteer";
  isCurrent: boolean;
  index: number;
  ariaLabel: string;
  children: ReactNode;
}

/**
 * Shared timeline entry layout: node dot + animated card container.
 * Handles scroll-into-view animation for every timeline item.
 */
export function TimelineCard({
  type,
  isCurrent,
  index,
  ariaLabel,
  children,
}: TimelineCardProps) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      className="exp-item flex items-start gap-4"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: `opacity ${EXP_ANIMATION.fadeDuration} ease ${index * EXP_ANIMATION.staggerDelay}ms, transform ${EXP_ANIMATION.fadeDuration} ${EXP_ANIMATION.fadeCurve} ${index * EXP_ANIMATION.staggerDelay}ms`,
      }}
      aria-label={ariaLabel}
    >
      <TimelineNode
        type={type}
        isCurrent={isCurrent}
        inView={inView}
        delay={index * EXP_ANIMATION.staggerDelay + EXP_ANIMATION.nodeBaseDelay}
      />

      <div
        className="flex-1 min-w-0 rounded-md p-4 mb-4"
        style={TIMELINE_CARD_STYLE}
      >
        {children}
      </div>
    </article>
  );
}
