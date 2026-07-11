"use client";

import type { Education } from "@/data/timeline";
import { isCurrentEntry } from "@/utils/experience";
import { AchievementHighlight } from "./AchievementHighlight";
import { ExpandableDetail } from "./ExpandableDetail";
import { MetaPills } from "./MetaPills";
import { TimelineCard } from "./TimelineCard";

interface EducationCardProps {
  item: Education;
  index: number;
}

/**
 * Education entry in the timeline with coursework badges,
 * activities, certifications, and notable achievements.
 */
export function EducationCard({ item, index }: EducationCardProps) {
  const isCurrent = isCurrentEntry(item.end_date);
  const hasDetail =
    (item.activities && item.activities.length > 0) ||
    (item.notableAchievements && item.notableAchievements.length > 0) ||
    (item.certifications && item.certifications.length > 0);

  return (
    <TimelineCard
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

      {/* Expandable detail: activities, achievements, certifications */}
      {hasDetail && (
        <ExpandableDetail
          title="Details &amp; Achievements"
          icon={
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="6"
                cy="6"
                r="5"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M6 3.5V6.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M6 8.5V8.505"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          }
          count={
            (item.activities?.length ?? 0) +
            (item.notableAchievements?.length ?? 0) +
            (item.certifications?.length ?? 0)
          }
        >
          {/* Activities */}
          {item.activities && item.activities.length > 0 && (
            <div className="mb-3">
              <p
                className="text-xs font-mono font-semibold mb-1.5 uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Activities
              </p>
              <ul className="space-y-1.5" role="list">
                {item.activities.map((act, i) => (
                  <li
                    key={i}
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {act.role}
                    </span>
                    {" — "}
                    <span>{act.name}</span>
                    <span
                      className="text-xs ml-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ({act.period})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notable achievements */}
          {item.notableAchievements && item.notableAchievements.length > 0 && (
            <div className="mb-3">
              <p
                className="text-xs font-mono font-semibold mb-1.5 uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Achievements
              </p>
              <AchievementHighlight items={item.notableAchievements} />
            </div>
          )}

          {/* Certifications */}
          {item.certifications && item.certifications.length > 0 && (
            <div>
              <p
                className="text-xs font-mono font-semibold mb-1.5 uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Certifications
              </p>
              <ul className="space-y-1" role="list">
                {item.certifications.map((cert, i) => (
                  <li
                    key={i}
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: "var(--text-accent)" }}
                      >
                        {cert.title}
                      </a>
                    ) : (
                      cert.title
                    )}
                    <span
                      className="text-xs ml-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      — {cert.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ExpandableDetail>
      )}
    </TimelineCard>
  );
}
