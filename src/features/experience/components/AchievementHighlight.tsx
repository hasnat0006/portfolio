"use client";

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
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <circle
              cx="7"
              cy="7"
              r="3"
              fill="var(--text-accent)"
              opacity="0.3"
            />
            <path
              d="M5 7L6.5 8.5L9 5.5"
              stroke="var(--text-accent)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
