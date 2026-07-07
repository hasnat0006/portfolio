interface SectionHeaderProps {
  command: string;
  description: string;
  className?: string;
}

/**
 * Terminal-style section header used across sections.
 * Renders as: $ command
 *             description
 */
export function SectionHeader({
  command,
  description,
  className = "mb-12",
}: SectionHeaderProps) {
  return (
    <div className={className}>
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
          {command}
        </h2>
      </div>
      <p
        className="text-code text-sm ml-6"
        style={{ color: "var(--text-muted)" }}
      >
        {description}
      </p>
    </div>
  );
}
