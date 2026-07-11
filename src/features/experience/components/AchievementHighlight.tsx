"use client";

import { CheckCircle } from "lucide-react";

interface AchievementHighlightProps {
  items: string[];
}

/**
 * Bullet list of achievements/notable accomplishments with a check icon.
 * Used inside ExpandableDetail in WorkCard and EducationCard.
 */
export function AchievementHighlight({ items }: AchievementHighlightProps) {
  if (!items.length) return null;

  return (
    <ul className="space-y-1.5" role="list">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <CheckCircle
            size={14}
            className="flex-shrink-0 mt-0.5"
            style={{ color: "var(--text-accent)" }}
            aria-hidden="true"
          />
          <span
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
