"use client";

import {
  education,
  volunteerExperience,
  workExperience,
  type Education,
  type VolunteerExperience,
  type WorkExperience,
} from "@/data/timeline";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ── Hook: useInView
// ─────────────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Injected CSS
// ─────────────────────────────────────────────────────────────────────────────

const STYLES = `
@keyframes exp-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes exp-node-pop {
  0%   { transform: scale(0.5); opacity: 0; }
  70%  { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .exp-item { transition: none !important; animation: none !important; }
}
.exp-show-more-content {
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.25s ease;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// ── SVG Icons (inline, zero-dep)
// ─────────────────────────────────────────────────────────────────────────────

function IconEducation({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function IconWork({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

function IconVolunteer({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconExternal({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconMapPin({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconChevron({
  size = 12,
  up = false,
}: {
  size?: number;
  up?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: up ? "rotate(180deg)" : "none",
        transition: "transform 0.25s ease",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}


/** Thin horizontal separator with a centred label — identical to AchievementsSection's SectionDivider */
function SectionDivider({ label }: { label: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className="flex items-center gap-4 mb-6 mt-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(8px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, rgba(52,211,153,0.5), transparent)",
        }}
      />
      <span
        className="text-sm font-mono uppercase tracking-[0.2em] px-4 py-1.5 rounded-full flex-shrink-0"
        style={{
          color: "var(--text-accent)",
          border: "1px solid rgba(52,211,153,0.25)",
          background: "rgba(52,211,153,0.07)",
        }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(52,211,153,0.5))",
        }}
      />
    </div>
  );
}

/** The small dot on the timeline spine */
function TimelineNode({
  type,
  isCurrent,
  inView,
  delay,
}: {
  type: "education" | "work" | "volunteer";
  isCurrent: boolean;
  inView: boolean;
  delay: number;
}) {
  const Icon =
    type === "education"
      ? IconEducation
      : type === "work"
        ? IconWork
        : IconVolunteer;

  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full relative"
      style={{
        width: isCurrent ? 36 : 32,
        height: isCurrent ? 36 : 32,
        background: isCurrent ? "var(--text-accent)" : "var(--bg-card)",
        border: isCurrent
          ? "2px solid var(--text-accent)"
          : "1.5px solid var(--border-accent)",
        color: isCurrent ? "var(--bg-primary)" : "var(--text-accent)",
        boxShadow: isCurrent
          ? "0 0 0 4px rgba(52,211,153,0.15), 0 0 16px rgba(52,211,153,0.2)"
          : "none",
        opacity: inView ? 1 : 0,
        animation: inView
          ? `exp-node-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both`
          : "none",
        transition: "box-shadow 0.3s ease",
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      <Icon size={isCurrent ? 15 : 13} />
    </div>
  );
}

/** Responsibility bullet list with Show More */
function ResponsibilityList({
  items,
  maxVisible = 4,
}: {
  items: string[];
  maxVisible?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > maxVisible;
  const visible = expanded ? items : items.slice(0, maxVisible);
  const hidden = items.slice(maxVisible);

  return (
    <div>
      <ul className="space-y-1 mt-2" role="list">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="mt-1.5 flex-shrink-0 w-1 h-1  rounded-full"
              style={{ background: "var(--text-accent)", marginTop: "0.45rem" }}
              aria-hidden="true"
            />
            <span
              className="text-sm font-mono leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <>
          {/* Hidden items with smooth expand */}
          <div
            className="exp-show-more-content"
            style={{
              maxHeight: expanded ? `${hidden.length * 40}px` : "0px",
              opacity: expanded ? 1 : 0,
            }}
          >
            <ul className="space-y-1 mt-1" role="list">
              {hidden.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="flex-shrink-0 w-1 h-1 rounded-full"
                    style={{
                      background: "var(--text-accent)",
                      marginTop: "0.45rem",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm font-mono leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 mt-2 text-sm font-mono transition-colors duration-200"
            style={{
              color: "var(--text-accent)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-expanded={expanded}
            aria-label={
              expanded
                ? "Show fewer responsibilities"
                : "Show more responsibilities"
            }
          >
            <IconChevron size={11} up={expanded} />
            {expanded ? "Show less" : `Show ${hidden.length} more`}
          </button>
        </>
      )}
    </div>
  );
}

/** Optional metadata pills row */
function MetaPills({
  location,
  website,
  cgpa,
  isCurrent,
  currentLabel = "Current",
}: {
  location?: string;
  website?: string;
  cgpa?: string;
  isCurrent?: boolean;
  currentLabel?: string;
}) {
  const hasPills = isCurrent || cgpa || location || website;
  if (!hasPills) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {cgpa && (
        <span
          className="text-xs font-mono px-3 py-1 rounded-full"
          style={{
            color: "var(--text-accent)",
            background: "rgba(52,211,153,0.06)",
            border: "1px solid rgba(52,211,153,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(52,211,153,0.14)";
            e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(52,211,153,0.06)";
            e.currentTarget.style.borderColor = "rgba(52,211,153,0.2)";
          }}
        >
          CGPA {cgpa}
        </span>
      )}

      {location && (
        <span
          className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full"
          style={{
            color: "var(--text-muted)",
            background: "var(--bg-code)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <IconMapPin size={10} />
          {location}
        </span>
      )}
    </div>
  );
}

function EducationCard({ item, index }: { item: Education; index: number }) {
  const { ref, inView } = useInView();
  const isCurrent =
    item.end_date.toLowerCase().includes("present") ||
    item.end_date.toLowerCase().includes("ongoing");

  return (
    <article
      ref={ref}
      className="exp-item flex items-start gap-4"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s cubic-bezier(0.23,1,0.32,1) ${index * 80}ms`,
      }}
      aria-label={`${item.degree} at ${item.name_of_institution}`}
    >
      {/* Node */}
      <TimelineNode
        type="education"
        isCurrent={isCurrent}
        inView={inView}
        delay={index * 80 + 60}
      />

      {/* Card */}
      <div
        className="flex-1 min-w-0 rounded-2xl p-4 mb-4"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-accent)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Top row: institution + date */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
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
            className="text-xs font-mono flex-shrink-0 whitespace-nowrap"
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
          currentLabel="Ongoing"
        />
      </div>
    </article>
  );
}

function WorkCard({ item, index }: { item: WorkExperience; index: number }) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      className="exp-item flex items-start gap-4"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s cubic-bezier(0.23,1,0.32,1) ${index * 80}ms`,
      }}
      aria-label={`${item.position} at ${item.company_name}`}
    >
      {/* Node */}
      <TimelineNode
        type="work"
        isCurrent={!!item.is_currently_working}
        inView={inView}
        delay={index * 80 + 60}
      />

      {/* Card */}
      <div
        className="flex-1 min-w-0 rounded-2xl p-4 mb-4"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-accent)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
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
            className="text-xs font-mono flex-shrink-0 whitespace-nowrap"
            style={{ color: "var(--text-muted)" }}
          >
            {item.start_date} — {item.end_date}
          </span>
        </div>

        <MetaPills
          location={item.company_location}
          website={item.company_website}
          isCurrent={item.is_currently_working}
          currentLabel="Present"
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
      </div>
    </article>
  );
}

function VolunteerCard({
  item,
  index,
}: {
  item: VolunteerExperience;
  index: number;
}) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      className="exp-item flex items-start gap-4"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s cubic-bezier(0.23,1,0.32,1) ${index * 80}ms`,
      }}
      aria-label={`${item.role} at ${item.organization_name}`}
    >
      {/* Node */}
      <TimelineNode
        type="volunteer"
        isCurrent={!!item.is_currently_volunteering}
        inView={inView}
        delay={index * 80 + 60}
      />

      {/* Card */}
      <div
        className="flex-1 min-w-0 rounded-2xl p-4 mb-4"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-accent)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
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
            className="text-xs font-mono flex-shrink-0 whitespace-nowrap"
            style={{ color: "var(--text-muted)" }}
          >
            {item.start_date} — {item.end_date}
          </span>
        </div>

        <MetaPills
          location={item.organization_location}
          website={item.organization_website}
          isCurrent={item.is_currently_volunteering}
          currentLabel="Current"
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
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Timeline spine wrapper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wraps a group of timeline items with the vertical line running through the
 * left column (where the nodes sit). The line is 20px wide left-offset so it
 * aligns with the centre of the 32px node.
 */
function TimelineGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative"
      style={{
        // The line runs from the top node to the bottom node, centred under the nodes.
        // Nodes are 32–36px wide; this line is offset 15px (half of 32px - 1px border).
        paddingLeft: 0,
      }}
    >
      {/* Vertical spine */}
      <div
        className="absolute top-4 bottom-4 pointer-events-none"
        style={{
          left: 15,
          width: 1,
          background:
            "linear-gradient(to bottom, var(--border-accent), var(--border-primary) 60%, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="space-y-0">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Main export
// ─────────────────────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
      aria-label="Experience"
    >
      <style>{STYLES}</style>

      <div className="max-w-3xl mx-auto">
        {/* Section heading — same pattern as AchievementsSection */}
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-code text-sm"
            style={{ color: "var(--text-accent)" }}
          >
            $
          </span>
          <h2
            className="text-heading text-2xl md:text-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            cat ./experience
          </h2>
        </div>
        <p
          className="text-code text-sm ml-6 mb-12"
          style={{ color: "var(--text-muted)" }}
        >
          Education, work &amp; volunteer milestones
        </p>

        {/* ── Education ── */}
        <SectionDivider label="Education" />
        <TimelineGroup>
          {education.map((item, i) => (
            <EducationCard key={i} item={item} index={i} />
          ))}
        </TimelineGroup>

        {/* ── Work Experience ── */}
        <SectionDivider label="Work Experience" />
        <TimelineGroup>
          {workExperience.map((item, i) => (
            <WorkCard key={i} item={item} index={i} />
          ))}
        </TimelineGroup>

        {/* ── Volunteer ── */}
        <SectionDivider label="Volunteer" />
        <TimelineGroup>
          {volunteerExperience.map((item, i) => (
            <VolunteerCard key={i} item={item} index={i} />
          ))}
        </TimelineGroup>
      </div>
    </section>
  );
}
