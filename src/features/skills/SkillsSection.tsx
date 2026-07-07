"use client";

import AnimatedTooltip from "@/components/ui/AnimatedTooltip";
import { SKILLS } from "@/data/skills";

export default function SkillsSection() {
  // Flatten all skills into AnimatedTooltip items
  const allSkills = SKILLS.flatMap((category) => category.skills);
  const tooltipItems = allSkills.map((skill, i) => ({
    id: i,
    name: skill.name,
    image: `https://skillicons.dev/icons?i=${skill.iconId}&theme=dark`,
  }));

  return (
    <section
      id="skills"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section header ─────────────────────────────────────── */}
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
            cat skills.md
          </h2>
        </div>
        <p
          className="text-code text-sm ml-6 mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          Languages, frameworks, and tools I work with
        </p>

        {/* ── Skills as AnimatedTooltip ──────────────────────────── */}

        <AnimatedTooltip items={tooltipItems} iconSize={56} borderless />
      </div>
    </section>
  );
}
