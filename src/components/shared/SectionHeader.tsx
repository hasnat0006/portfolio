interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
}

/**
 * Section header used across sections.
 */
export function SectionHeader({
  title,
  description,
  className = "mb-12",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2
        className="text-heading text-2xl md:text-3xl mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      <p className="text-body text-sm" style={{ color: "var(--text-muted)" }}>
        {description}
      </p>
    </div>
  );
}
