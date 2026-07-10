import { PROJECTS_HEADER } from "@/constants/projects";

export function ProjectsHeader() {
  return (
    <>
      <h2
        className="text-heading text-2xl md:text-3xl mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {PROJECTS_HEADER.title}
      </h2>
      <p
        className="text-body text-sm mb-10"
        style={{ color: "var(--text-muted)" }}
      >
        {PROJECTS_HEADER.description}
      </p>
    </>
  );
}
