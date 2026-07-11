"use client";

import { useInView } from "@/hooks/useInView";
import Image from "next/image";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

interface FeatureItem {
  title: string;
  description: string;
  image?: string;
}

interface ProjectFeatureShowcaseProps {
  features?: FeatureItem[];
}

const fallbackFeatures: FeatureItem[] = [
  {
    title: "Responsive Design",
    description:
      "Fully responsive layout that works seamlessly across all screen sizes and devices.",
  },
  {
    title: "Modern Architecture",
    description:
      "Built with reusable components, clean separation of concerns, and scalable patterns.",
  },
  {
    title: "Performance Optimized",
    description:
      "Fast load times, optimized assets, and efficient rendering for a smooth user experience.",
  },
];

/**
 * Feature Showcase section with alternating image and content layout.
 * Features rich cards with smooth reveal animations on scroll.
 */
export function ProjectFeatureShowcase({
  features,
}: ProjectFeatureShowcaseProps) {
  const displayFeatures =
    features && features.length > 0 ? features : fallbackFeatures;
  const { ref, inView } = useInView(0.05);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <ProjectSectionHeader
          label="Features"
          title="What makes it stand out"
          description="Key features and capabilities that define this project."
        />

        <div ref={ref} className="space-y-8 md:space-y-12">
          {displayFeatures.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              inView={inView}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  inView,
  reversed,
}: {
  feature: FeatureItem;
  index: number;
  inView: boolean;
  reversed: boolean;
}) {
  const hasImage = feature.image;

  return (
    <div
      className={`grid grid-cols-1 ${hasImage ? "lg:grid-cols-2" : ""} gap-6 md:gap-10 items-center rounded-2xl p-6 md:p-8 transition-all duration-500`}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-primary)",
        boxShadow: "var(--shadow-sm)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`,
      }}
    >
      {/* Content */}
      <div className={reversed && hasImage ? "lg:order-2" : ""}>
        {/* Feature number */}
        <span
          className="text-[10px] font-mono uppercase tracking-wider mb-2 block"
          style={{ color: "var(--text-muted)" }}
        >
          Feature {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className="text-xl md:text-2xl font-semibold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {feature.title}
        </h3>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {feature.description}
        </p>

        {/* Accent indicator */}
        <div
          className="mt-4 w-8 h-1 rounded-full"
          style={{ background: "var(--text-accent)" }}
        />
      </div>

      {/* Image */}
      {hasImage && (
        <div
          className={`relative aspect-video rounded-xl overflow-hidden ${reversed ? "lg:order-1" : ""}`}
          style={{
            border: "1px solid var(--border-primary)",
            background: "var(--bg-secondary)",
          }}
        >
          <Image
            src={`/${feature.image}`}
            alt={feature.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
