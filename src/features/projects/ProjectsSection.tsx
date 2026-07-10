"use client";

import { useState } from "react";

import ProjectCard from "@/components/ProjectCard";
import { INITIAL_COUNT } from "@/constants/projects";
import { PROJECTS } from "@/data/projects";
import { ProjectsHeader } from "./components/ProjectsHeader";
import { ViewMoreButton } from "./components/ViewMoreButton";

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, INITIAL_COUNT);

  return (
    <section
      id="projects"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className="max-w-6xl mx-auto">
        <ProjectsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <ViewMoreButton
          showAll={showAll}
          onToggle={() => setShowAll((prev) => !prev)}
        />
      </div>
    </section>
  );
}
