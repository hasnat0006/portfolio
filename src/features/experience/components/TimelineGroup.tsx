"use client";

import type { ReactNode } from "react";

interface TimelineGroupProps {
  children: ReactNode;
}

/**
 * Wraps a group of timeline items in a responsive grid layout.
 * 2 columns on medium+ screens, 1 column on small screens.
 */
export function TimelineGroup({ children }: TimelineGroupProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  );
}
