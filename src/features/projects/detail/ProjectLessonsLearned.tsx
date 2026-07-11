"use client";

import { useInView } from "@/hooks/useInView";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

interface LessonItem {
  title: string;
  description: string;
}

interface ProjectLessonsLearnedProps {
  lessons?: LessonItem[];
}

const fallbackLessons: LessonItem[] = [
  {
    title: "Planning is Key",
    description:
      "Spending time upfront on architecture decisions and component design saved significant development time and reduced rework.",
  },
  {
    title: "User-Centered Design",
    description:
      "Early user feedback loops helped identify usability issues before they became costly to fix. Iterative testing was invaluable.",
  },
  {
    title: "Performance Matters",
    description:
      "Optimizing early — not as an afterthought — ensured the project remained fast and responsive even as features grew.",
  },
];

/**
 * Lessons Learned section with professional reflection cards.
 * Each card shows a key takeaway from the project experience.
 */
export function ProjectLessonsLearned({ lessons }: ProjectLessonsLearnedProps) {
  const { ref, inView } = useInView(0.1);
  const items = lessons && lessons.length > 0 ? lessons : fallbackLessons;

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <ProjectSectionHeader
          label="Reflection"
          title="Lessons learned"
          description="Key takeaways and professional growth from building this project."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((lesson, i) => (
            <div
              key={lesson.title}
              className="rounded-2xl p-6 md:p-7 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-sm)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.12}s`,
              }}
            >
              {/* Number */}
              <span
                className="text-4xl font-bold font-mono block mb-4"
                style={{
                  color: "var(--border-primary)",
                  opacity: 0.5,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background:
                    "color-mix(in srgb, var(--text-accent) 10%, transparent)",
                  color: "var(--text-accent)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {lesson.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {lesson.description}
              </p>

              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(52,211,153,0.04) 0%, transparent 60%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
