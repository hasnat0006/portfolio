"use client";

import { useTheme } from "@/components/ThemeProvider";
import { skillIconUrl } from "@/data/skills";
import { useInView } from "@/hooks/useInView";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

interface TechStackItem {
  name: string;
  description: string;
}

interface TechStackCategory {
  category: string;
  items: TechStackItem[];
}

interface ProjectTechStackProps {
  techStack?: string[];
  techStackDetails?: TechStackCategory[];
}

function generateTechDetails(techs: string[]): TechStackCategory[] {
  const frontend = [
    "React.js",
    "Next.js",
    "TailwindCSS",
    "CSS",
    "Framer Motion",
    "JavaFX",
    "Flutter",
    "Dart",
  ];
  const backend = ["Node.js", "Express.js", "Python", "Bun"];
  const database = [
    "Supabase",
    "PostgreSQL",
    "SQL",
    "Oracle",
    "MySQL",
    "Xampp",
  ];
  const deployment = ["Vercel"];

  const categories: { name: string; items: string[] }[] = [
    { name: "Frontend", items: frontend },
    { name: "Backend", items: backend },
    { name: "Database", items: database },
    { name: "Deployment", items: deployment },
  ];

  const result: TechStackCategory[] = [];
  const categorized = new Set<string>();

  for (const cat of categories) {
    const matched = techs.filter((t) => cat.items.includes(t));
    if (matched.length > 0) {
      result.push({
        category: cat.name,
        items: matched.map((t) => ({
          name: t,
          description: getDefaultDescription(t),
        })),
      });
      matched.forEach((t) => categorized.add(t));
    }
  }

  // Remaining uncategorized go to "Tools"
  const uncategorized = techs.filter((t) => !categorized.has(t));
  if (uncategorized.length > 0) {
    result.push({
      category: "Tools",
      items: uncategorized.map((t) => ({
        name: t,
        description: getDefaultDescription(t),
      })),
    });
  }

  return result;
}

function getDefaultDescription(tech: string): string {
  const descriptions: Record<string, string> = {
    "Next.js": "React framework with SSR, ISR, and App Router",
    "React.js": "Component-based UI library for interactive interfaces",
    TailwindCSS: "Utility-first CSS framework for rapid styling",
    "Node.js": "JavaScript runtime for server-side applications",
    "Express.js": "Minimal web framework for Node.js APIs",
    Supabase: "Open-source Firebase alternative with PostgreSQL",
    PostgreSQL: "Advanced relational database with strong integrity",
    Bun: "Fast all-in-one JavaScript runtime & toolchain",
    Flutter: "Cross-platform UI framework from Google",
    Dart: "Optimized programming language for Flutter apps",
    Python: "Versatile language for automation and scripting",
    Java: "Robust, platform-independent programming language",
    JavaFX: "Modern Java GUI toolkit for desktop applications",
    MySQL: "Popular open-source relational database",
    "Scene Builder": "Visual layout tool for JavaFX applications",
    Xampp: "Cross-platform web server solution stack",
    CSS: "Styling language for web page presentation",
    SQL: "Standard language for relational database management",
    Oracle: "Enterprise-grade database management system",
    Vercel: "Cloud platform for static sites and serverless functions",
  };
  return descriptions[tech] || `${tech} — Core technology used in this project`;
}

/* ── Icon with hover tooltip (matches Skills section aesthetic) ── */
function TechIcon({
  name,
  theme,
  size,
}: {
  name: string;
  theme: string;
  size: number;
}) {
  const [hovered, setHovered] = useState(false);

  const iconSrc =
    skillIconUrl(name, theme as "light" | "dark") ||
    `https://skillicons.dev/icons?i=${name.toLowerCase().replace(/[^a-z0-9]/g, "")}&theme=${theme}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="popLayout">
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 260, damping: 10 },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            className="absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-3 py-1.5 text-xs shadow-xl pointer-events-none"
            style={{ whiteSpace: "nowrap" }}
          >
            <div className="absolute inset-x-8 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="absolute -bottom-px left-8 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
            <div className="relative z-30 font-semibold text-white font-mono">
              {name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        className="object-contain transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
}

/**
 * Tech stack section with categorized technology cards.
 * Each card shows icon, name, and short description.
 */
export function ProjectTechStack({
  techStack,
  techStackDetails,
}: ProjectTechStackProps) {
  const { ref, inView } = useInView(0.1);
  const { theme } = useTheme();

  if (!techStack || techStack.length === 0) return null;

  const categories = techStackDetails || generateTechDetails(techStack);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <ProjectSectionHeader label="Tech Stack" title="Technologies used" />

        <div ref={ref} className="space-y-8">
          {categories.map((cat, catIndex) => (
            <div
              key={cat.category}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${catIndex * 0.1}s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${catIndex * 0.1}s`,
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md"
                  style={{
                    background:
                      "color-mix(in srgb, var(--text-accent) 10%, transparent)",
                    color: "var(--text-accent)",
                    border: "1px solid var(--border-accent)",
                  }}
                >
                  {cat.category}
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: "var(--border-primary)" }}
                />
              </div>

              {/* Tech items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-md py-2 px-4 flex gap-4 transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-primary)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {/* Tech icon with tooltip */}
                    <div className="mb-3">
                      <TechIcon name={item.name} theme={theme} size={48} />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h4
                        className="text-sm font-semibold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.name}
                      </h4>
                      <p
                        className="text-[11px] leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.description}
                      </p>{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
