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

        <div className="columns-1 md:columns-2 gap-6 space-y-0">
          {visibleProjects.map((project) => (
            <div key={project.title} className="break-inside-avoid mb-6">
              <ProjectCard
                title={project.title}
                description={project.short_description}
                techStack={project.techStack}
                githubUrl={project.githubUrl}
                duration={project.duration}
                photoUrl={project.photoUrl}
                liveUrl={project.liveUrl}
                collaborators={project.collaborators}
              />
            </div>
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
