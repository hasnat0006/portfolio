"use client";

import { useTheme } from "@/components/ThemeProvider";
import AnimatedTooltip from "@/components/ui/AnimatedTooltip";
import { SKILLS } from "@/data/skills";

export default function SkillsSection() {
  const { theme } = useTheme();

  // Flatten all skills into AnimatedTooltip items
  const allSkills = SKILLS.flatMap((category) => category.skills);
  const tooltipItems = allSkills.map((skill, i) => ({
    id: i,
    name: skill.name,
    image: `https://skillicons.dev/icons?i=${skill.iconId}&theme=${theme}`,
  }));

  return (
    <section
      id="skills"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section header ─────────────────────────────────────── */}
        <h2
          className="text-heading text-2xl md:text-3xl mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Skills
        </h2>
        <p
          className="text-body text-sm mb-10"
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
