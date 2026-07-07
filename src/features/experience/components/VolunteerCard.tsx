"use client";

import type { VolunteerExperience } from "@/data/timeline";
import { MetaPills } from "./MetaPills";
import { ResponsibilityList } from "./ResponsibilityList";
import { TimelineCard } from "./TimelineCard";

interface VolunteerCardProps {
  item: VolunteerExperience;
  index: number;
}

/**
 * Volunteer experience entry in the timeline.
 */
export function VolunteerCard({ item, index }: VolunteerCardProps) {
  return (
    <TimelineCard
      type="volunteer"
      isCurrent={!!item.is_currently_volunteering}
      index={index}
      ariaLabel={`${item.role} at ${item.organization_name}`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-3">
        <div className="flex-1 min-w-0">
          <p
            className="text-md font-semibold leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {item.organization_name}
          </p>
          <p
            className="text-md font-mono mt-0.5"
            style={{ color: "var(--text-accent)" }}
          >
            {item.role}
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
        location={item.organization_location}
        website={item.organization_website}
        isCurrent={item.is_currently_volunteering}
      />

      {item.description && (
        <p
          className="text-sm mt-2 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {item.description}
        </p>
      )}

      {item.responsibilities.length > 0 && (
        <ResponsibilityList items={item.responsibilities} />
      )}
    </TimelineCard>
  );
}
