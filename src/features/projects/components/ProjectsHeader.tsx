import { PROJECTS_HEADER } from "@/constants/projects";

/**
 * Terminal-style section header for the Projects section.
 */
export function ProjectsHeader() {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-code text-sm"
          style={{ color: "var(--text-accent)" }}
        >
          {PROJECTS_HEADER.prompt}
        </span>
        <h2
          className="text-heading text-2xl md:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          {PROJECTS_HEADER.command}
        </h2>
      </div>
      <p
        className="text-code text-sm ml-6 mb-10"
        style={{ color: "var(--text-muted)" }}
        dangerouslySetInnerHTML={{ __html: PROJECTS_HEADER.description }}
      />
    </>
  );
}
