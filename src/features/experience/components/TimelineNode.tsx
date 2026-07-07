"use client";

import {
  IconEducation,
  IconVolunteer,
  IconWork,
} from "@/components/icons/experience";
import { EXP_ANIMATION } from "@/constants/experience";

interface TimelineNodeProps {
  type: "education" | "work" | "volunteer";
  isCurrent: boolean;
  inView: boolean;
  delay: number;
}

const IconMap = {
  education: IconEducation,
  work: IconWork,
  volunteer: IconVolunteer,
} as const;

export function TimelineNode({
  type,
  isCurrent,
  inView,
  delay,
}: TimelineNodeProps) {
  const Icon = IconMap[type];

  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-md relative"
      style={{
        width: isCurrent ? 36 : 32,
        height: isCurrent ? 36 : 32,
        background: isCurrent ? "var(--text-accent)" : "var(--bg-card)",
        border: isCurrent
          ? "2px solid var(--text-accent)"
          : "1.5px solid var(--border-accent)",
        color: isCurrent ? "var(--bg-primary)" : "var(--text-accent)",
        boxShadow: isCurrent
          ? "0 0 0 4px rgba(52,211,153,0.15), 0 0 16px rgba(52,211,153,0.2)"
          : "none",
        opacity: inView ? 1 : 0,
        animation: inView
          ? `exp-node-pop ${EXP_ANIMATION.nodePopDuration} ${EXP_ANIMATION.nodePopCurve} ${delay}ms both`
          : "none",
        transition: "box-shadow 0.3s ease",
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      <Icon size={isCurrent ? 15 : 13} />
    </div>
  );
}
