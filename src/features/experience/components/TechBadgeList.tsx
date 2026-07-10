"use client";

interface TechBadgeListProps {
  items: string[];
  label?: string;
  limit?: number;
  size?: "sm" | "md";
}

const sizeStyles = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-2.5 py-0.5",
} as const;

/**
 * Renders a row of technology / skill badges with a subtle coloured tint.
 * Used in WorkCard (technologies) and EducationCard (coursework).
 */
export function TechBadgeList({
  items,
  label,
  limit,
  size = "sm",
}: TechBadgeListProps) {
  const displayed = limit ? items.slice(0, limit) : items;

  if (!items.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {label && (
        <span
          className="text-xs font-mono mr-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          {label}:
        </span>
      )}
      {displayed.map((item) => (
        <span
          key={item}
          className={`font-mono rounded-md leading-relaxed ${sizeStyles[size]}`}
          style={{
            color: "var(--text-accent)",
            background:
              "color-mix(in srgb, var(--text-accent) 8%, transparent)",
            border:
              "1px solid color-mix(in srgb, var(--text-accent) 18%, transparent)",
          }}
        >
          {item}
        </span>
      ))}
      {limit && items.length > limit && (
        <span
          className="text-xs font-mono"
          style={{ color: "var(--text-muted)" }}
        >
          +{items.length - limit} more
        </span>
      )}
    </div>
  );
}
