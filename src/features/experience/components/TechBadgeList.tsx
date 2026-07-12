"use client";

import { useTheme } from "@/components/ThemeProvider";
import AnimatedTooltip from "@/components/ui/AnimatedTooltip";
import { skillIconUrl } from "@/data/skills";

interface TechBadgeListProps {
  items: string[];
  label?: string;
  limit?: number;
  size?: "sm" | "md";
}

const iconSizeMap = {
  sm: 28,
  md: 36,
} as const;

/**
 * Renders a row of technology / skill badges with the AnimatedTooltip pattern.
 * Used in WorkCard (technologies) and EducationCard (coursework).
 */
export function TechBadgeList({
  items,
  label,
  limit,
  size = "sm",
}: TechBadgeListProps) {
  const { theme } = useTheme();
  const displayed = limit ? items.slice(0, limit) : items;

  if (!items.length) return null;

  const tooltipItems = displayed.map((name, idx) => ({
    id: idx,
    name,
    image: skillIconUrl(name, theme),
  }));

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
      <AnimatedTooltip
        items={tooltipItems}
        iconSize={iconSizeMap[size]}
        borderless
      />
    </div>
  );
}
