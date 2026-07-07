"use client";

import type { ReactNode } from "react";

interface TimelineGroupProps {
  children: ReactNode;
}

/**
 * Wraps a group of timeline items with the vertical line running through
 * the left column (where the nodes sit). The line is 15px offset so it
 * aligns with the centre of the 32px node.
 */
export function TimelineGroup({ children }: TimelineGroupProps) {
  return (
    <div className="relative">
      <div
        className="absolute top-4 bottom-4 pointer-events-none"
        style={{
          left: 15,
          width: 1,
          background:
            "linear-gradient(to bottom, var(--border-accent), var(--border-primary) 60%, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="space-y-0">{children}</div>
    </div>
  );
}
