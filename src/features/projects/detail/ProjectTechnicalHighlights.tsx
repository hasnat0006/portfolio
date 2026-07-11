"use client";

import { useInView } from "@/hooks/useInView";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

interface HighlightItem {
  title: string;
  description: string;
  category: string;
}

interface ProjectTechnicalHighlightsProps {
  highlights?: HighlightItem[];
}

const fallbackHighlights: HighlightItem[] = [
  {
    title: "Performance",
    description:
      "Optimized for fast loading with efficient rendering, lazy loading, and minimal bundle sizes.",
    category: "performance",
  },
  {
    title: "SEO",
    description:
      "Proper meta tags, semantic HTML, structured data, and optimized content for search engines.",
    category: "seo",
  },
  {
    title: "Accessibility",
    description:
      "Built with semantic elements, keyboard navigation, ARIA labels, and high contrast support.",
    category: "accessibility",
  },
  {
    title: "Responsiveness",
    description:
      "Fluid layouts, adaptive components, and thorough testing across all device sizes.",
    category: "responsiveness",
  },
  {
    title: "Component Architecture",
    description:
      "Modular, reusable component system with clear separation of concerns.",
    category: "architecture",
  },
  {
    title: "Reusable Design System",
    description:
      "Consistent design tokens, shared UI primitives, and theming support.",
    category: "design",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  performance: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  seo: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  accessibility: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  responsiveness: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  ),
  architecture: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  design: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
};

const categoryColors: Record<string, string> = {
  performance: "var(--text-accent)",
  seo: "#3b82f6",
  accessibility: "#f59e0b",
  responsiveness: "#8b5cf6",
  architecture: "var(--text-accent)",
  design: "#ec4899",
};

/**
 * Technical highlights grid section.
 * Shows implementation highlights across performance, SEO, accessibility, etc.
 */
export function ProjectTechnicalHighlights({
  highlights,
}: ProjectTechnicalHighlightsProps) {
  const { ref, inView } = useInView(0.1);
  const items =
    highlights && highlights.length > 0 ? highlights : fallbackHighlights;

  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <ProjectSectionHeader
          label="Highlights"
          title="Technical highlights"
          description="Key engineering decisions and quality metrics."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-sm)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.08}s`,
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `color-mix(in srgb, ${categoryColors[item.category] || "var(--text-accent)"} 10%, transparent)`,
                  color: categoryColors[item.category] || "var(--text-accent)",
                }}
              >
                {categoryIcons[item.category] || categoryIcons.architecture}
              </div>

              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
