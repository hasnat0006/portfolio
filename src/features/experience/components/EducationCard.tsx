"use client";

import type { Education } from "@/data/timeline";
import { isCurrentEntry } from "@/utils/experience";
import { MetaPills } from "./MetaPills";
import { TimelineCard } from "./TimelineCard";

interface EducationCardProps {
  item: Education;
  index: number;
}

/**
 * Education entry in the timeline.
 */
export function EducationCard({ item, index }: EducationCardProps) {
  const isCurrent = isCurrentEntry(item.end_date);

  return (
    <TimelineCard
      type="education"
      isCurrent={isCurrent}
      index={index}
      ariaLabel={`${item.degree} at ${item.name_of_institution}`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-3">
        <div className="flex-1 min-w-0">
          <p
            className="text-md font-semibold leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {item.name_of_institution}
          </p>
          <p
            className="text-sm font-mono mt-0.5"
            style={{ color: "var(--text-accent)" }}
          >
            {item.degree}
          </p>
          <p
            className="text-sm font-mono mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            {item.field_of_study}
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
        location={item.institution_location}
        website={item.institution_website}
        cgpa={item.cgpa}
        isCurrent={isCurrent}
      />
    </TimelineCard>
  );
}
