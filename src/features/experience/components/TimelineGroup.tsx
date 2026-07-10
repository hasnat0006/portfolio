"use client";

import type { ReactNode } from "react";

interface TimelineGroupProps {
  children: ReactNode;
}

/**
 * Wraps a group of timeline items with a smoothly animating gradient
 * vertical line running through the left column. The line pulses subtly
 * to give the timeline a sense of motion.
 */
export function TimelineGroup({ children }: TimelineGroupProps) {
  return (
    <div className="relative">
      {/* Animated gradient timeline line */}
      <div
        className="absolute top-4 bottom-4 pointer-events-none"
        style={{
          left: 15,
          width: 2,
          background:
            "linear-gradient(to bottom, var(--text-accent), color-mix(in srgb, var(--text-accent) 40%, transparent) 60%, transparent)",
          animation: "timeline-pulse 3s ease-in-out infinite",
          borderRadius: 1,
        }}
        aria-hidden="true"
      />
      <div className="space-y-0">{children}</div>
    </div>
  );
}
