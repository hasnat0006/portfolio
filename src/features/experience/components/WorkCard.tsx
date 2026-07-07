"use client";

import type { WorkExperience } from "@/data/timeline";
import { MetaPills } from "./MetaPills";
import { ResponsibilityList } from "./ResponsibilityList";
import { TimelineCard } from "./TimelineCard";

interface WorkCardProps {
  item: WorkExperience;
  index: number;
}

/**
 * Work experience entry in the timeline.
 */
export function WorkCard({ item, index }: WorkCardProps) {
  return (
    <TimelineCard
      type="work"
      isCurrent={!!item.is_currently_working}
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
