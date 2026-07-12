"use client";

import { EXP_ANIMATION } from "@/constants/experience";
import { useInView } from "@/hooks/useInView";
import { useTilt } from "@/hooks/useTilt";
import type { ReactNode } from "react";

interface TimelineCardProps {
  index: number;
  ariaLabel: string;
  children: ReactNode;
}

/**
 * Shared card container for timeline entries.
 * Handles scroll-into-view animation, 3D tilt, and spotlight hover effect —
 * consistent with the project card and featured achievement card design pattern.
 */
export function TimelineCard({
  index,
  ariaLabel,
  children,
}: TimelineCardProps) {
  const { ref: viewRef, inView } = useInView();
  const {
    ref: tiltRef,
    tilt,
    spotlight,
    hovered,
    onMove,
    onEnter,
    onLeave,
  } = useTilt(5);

  return (
    <article
      ref={viewRef}
      className="exp-item group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: `opacity ${EXP_ANIMATION.fadeDuration} ease ${index * EXP_ANIMATION.staggerDelay}ms, transform ${EXP_ANIMATION.fadeDuration} ${EXP_ANIMATION.fadeCurve} ${index * EXP_ANIMATION.staggerDelay}ms`,
      }}
      aria-label={ariaLabel}
    >
      <div
        ref={tiltRef}
        className="relative rounded-md p-4 overflow-hidden"
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
          transition: hovered ? "all 0.15s ease-out" : "all 0.3s ease-in",
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

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </article>
  );
}
