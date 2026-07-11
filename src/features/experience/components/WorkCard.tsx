"use client";

import type { WorkExperience } from "@/data/timeline";
import { Star } from "lucide-react";
import { AchievementHighlight } from "./AchievementHighlight";
import { ExpandableDetail } from "./ExpandableDetail";
import { MetaPills } from "./MetaPills";
import { ResponsibilityList } from "./ResponsibilityList";
import { TechBadgeList } from "./TechBadgeList";
import { TimelineCard } from "./TimelineCard";

interface WorkCardProps {
  item: WorkExperience;
  index: number;
}

/**
 * Work experience entry in the timeline with tech badges,
 * achievement highlights, metrics, and expandable detail.
 */
export function WorkCard({ item, index }: WorkCardProps) {
  const hasDetail = item.achievements && item.achievements.length > 0;

  return (
    <TimelineCard
      index={index}
      ariaLabel={`${item.position} at ${item.company_name}`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-3">
        <div className="flex-1 min-w-0">
          <p
            className="text-md font-semibold leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {item.company_name}
          </p>
          <p
            className="text-sm font-mono mt-0.5"
            style={{ color: "var(--text-accent)" }}
          >
            {item.position}
          </p>
        </div>
        <span
          className="text-xs font-mono md:text-right md:flex-shrink-0 md:whitespace-nowrap"
          style={{ color: "var(--text-muted)" }}
        >
          {item.start_date} — {item.end_date}
        </span>
      </div>

      <MetaPills
        location={item.company_location}
        website={item.company_website}
        isCurrent={item.is_currently_working}
      />

      {/* Short description */}
      {item.description && (
        <p
          className="text-sm mt-2 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {item.description}
        </p>
      )}

      {/* Technologies used */}
      {item.technologies && item.technologies.length > 0 && (
        <div className="mt-3">
          <TechBadgeList items={item.technologies} size="sm" />
        </div>
      )}

      {/* Responsibilities */}
      {item.responsibilities.length > 0 && (
        <ResponsibilityList items={item.responsibilities} />
      )}

      {/* Expandable: key achievements */}
      {hasDetail && (
        <ExpandableDetail
          title="Key Achievements"
          icon={<Star size={12} aria-hidden="true" />}
          count={item.achievements?.length}
        >
          {item.achievements && item.achievements.length > 0 && (
            <AchievementHighlight items={item.achievements} />
          )}
        </ExpandableDetail>
      )}
    </TimelineCard>
  );
}
