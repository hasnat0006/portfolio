"use client";

import type { VolunteerExperience } from "@/data/timeline";
import { MetaPills } from "./MetaPills";
import { ResponsibilityList } from "./ResponsibilityList";
import { RoleTimeline } from "./RoleTimeline";
import { TimelineCard } from "./TimelineCard";

interface VolunteerCardProps {
  item: VolunteerExperience;
  index: number;
}

/**
 * Volunteer experience entry in the timeline.
 * LinkedIn-inspired design with avatar, prominent org name, and role history.
 */
export function VolunteerCard({ item, index }: VolunteerCardProps) {
  return (
    <TimelineCard
      index={index}
      ariaLabel={`${item.role[0]?.name} at ${item.organization_name}`}
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Right content */}
        <div className="flex-1 min-w-0">
          <p
            className="text-base sm:text-lg font-bold leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {item.organization_name}
          </p>

          {item.role && item.role.length > 0 && (
            <RoleTimeline roles={item.role} />
          )}

          {/* Description */}
          {item.description && (
            <p
              className="text-sm mt-2 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    </TimelineCard>
  );
}
