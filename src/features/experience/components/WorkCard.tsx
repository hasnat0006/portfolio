"use client";

import type { WorkExperience } from "@/data/timeline";
import { Star } from "lucide-react";
import { AchievementHighlight } from "./AchievementHighlight";
import { ExpandableDetail } from "./ExpandableDetail";
import { MetaPills } from "./MetaPills";
import { RoleTimeline } from "./RoleTimeline";
import { TechBadgeList } from "./TechBadgeList";
import { TimelineCard } from "./TimelineCard";

interface WorkCardProps {
  item: WorkExperience;
  index: number;
}

export function WorkCard({ item, index }: WorkCardProps) {
  const hasDetail = item.achievements && item.achievements.length > 0;

  return (
    <TimelineCard
      index={index}
      ariaLabel={`${item.role[0]?.name} at ${item.company_name}`}
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <p
            className="text-base sm:text-lg font-bold leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {item.company_name}
          </p>

          {item.role && item.role.length > 0 && (
            <RoleTimeline roles={item.role} />
          )}

          <MetaPills
            location={item.company_location}
            website={item.company_website}
            isCurrent={item.is_currently_working}
          />

          {/* Short description */}
          {item.description && (
            <p
              className="text-sm mt-2 leading-relaxed break-normal whitespace-normal"
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
        </div>
      </div>
    </TimelineCard>
  );
}
