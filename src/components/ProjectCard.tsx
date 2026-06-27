"use client";

import AnimatedTooltip from "@/components/ui/AnimatedTooltip";
import type { Collaborator } from "@/data/projects";
import { useEffect, useState } from "react";

// ── Skill Icons slug map ──────────────────────────────────────────
// Maps display names → skillicons.dev slug
const SKILL_SLUGS: Record<string, string> = {
  "Next.js": "nextjs",
  "React.js": "react",
  "Node.js": "nodejs",
  "Express.js": "express",
  TailwindCSS: "tailwind",
  Supabase: "supabase",
  PostgreSQL: "postgresql",
  CSS: "css",
  SQL: "sql",
  Java: "java",
  JavaFX: "javafx",
  MySQL: "mysql",
  Oracle: "oracle",
  "Scene Builder": "eclipse",
  Xampp: "xampp",
};

type RepoData = {
  forks: number;
  language: string | null;
  description: string | null;
};

type ProjectCardProps = {
  title: string;
  description?: string;
  techStack?: string[];
  githubUrl?: string;
  repoName?: string;
  duration?: string;
  photoUrl?: string[];
  liveUrl?: string;
  collaborators?: Collaborator[];
};

export default function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  duration,
  photoUrl,
  liveUrl,
  collaborators,
}: ProjectCardProps) {
  const [repoData, setRepoData] = useState<RepoData | null>(null);

  useEffect(() => {
    if (!githubUrl) return;
    const parts = githubUrl.replace("https://github.com/", "").split("/");
    if (parts.length < 2) return;
    const owner = parts[0];
    const repo = parts[1];
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.message) {
          setRepoData({
            forks: data.forks_count,
            language: data.language,
            description: data.description,
          });
        }
      })
      .catch(() => {});
  }, [githubUrl]);

  return (
    <article
      className="group relative rounded-xl border transition-all duration-300 overflow-hidden"
      style={{
        borderColor: "var(--border-accent)",
        background: "var(--bg-card)",
      }}
    >
      {/* Preview Image — edge to edge, no border/padding */}
      {photoUrl && photoUrl.length > 0 && (
        <div className="relative w-full overflow-hidden">
          <img
            src={`/${photoUrl[0]}`}
            alt={`${title} preview`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-6">
        {/* Duration Badge */}
        {duration && (
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md mb-3 text-meta"
            style={{
              background: "var(--bg-badge)",
              border: "1px solid var(--border-accent)",
              color: "var(--text-accent)",
            }}
          >
            ⏱ {duration}
          </div>
        )}

        {/* Title */}
        <h3
          className="text-subheading text-lg mb-2 group-hover:opacity-80 transition-opacity"
          style={{ color: "var(--text-primary)" }}
        >
          <span className="mr-2" style={{ color: "var(--text-muted)" }}>
            ▸
          </span>
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p
            className="text-sm mb-3 leading-relaxed line-clamp-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        )}

        {/* Tech Stack */}
        {techStack && techStack.length > 0 && (
          <div className="mb-4">
            <AnimatedTooltip
              items={techStack
                .map((tech, i) => ({
                  id: i,
                  name: tech,
                  image: SKILL_SLUGS[tech]
                    ? `https://skillicons.dev/icons?i=${SKILL_SLUGS[tech]}&theme=dark`
                    : "",
                }))
                .filter((item) => item.image)}
            />
          </div>
        )}

        {/* Collaborators */}
        {collaborators && collaborators.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              collaborators
            </span>
            <AnimatedTooltip
              items={collaborators.map((c, i) => ({
                id: i,
                name: c.name,
                image: `https://github.com/${c.github}.png`,
              }))}
            />
          </div>
        )}

        {/* GitHub Stats */}
        {repoData && (
          <div
            className="flex items-center gap-3 mb-4 text-meta"
            style={{ color: "var(--text-muted)" }}
          >
            {repoData.language && (
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{
                    backgroundColor:
                      repoData.language === "JavaScript"
                        ? "#f7df1e"
                        : repoData.language === "TypeScript"
                          ? "#3178c6"
                          : repoData.language === "Java"
                            ? "#b07219"
                            : repoData.language === "Python"
                              ? "#3572A5"
                              : repoData.language === "HTML"
                                ? "#e34c26"
                                : repoData.language === "CSS"
                                  ? "#563d7c"
                                  : repoData.language === "C++"
                                    ? "#f34b7d"
                                    : "#6e7681",
                  }}
                />
                {repoData.language}
              </span>
            )}
            <span className="flex items-center gap-1">⑂ {repoData.forks}</span>
          </div>
        )}

        {/* Links */}
        <div
          className="flex items-center gap-3 mt-auto pt-3"
          style={{ borderTop: "1px solid var(--border-primary)" }}
        >
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-small text-xs transition-colors px-3 py-1.5 rounded-md border"
              style={{
                color: "var(--text-accent)",
                borderColor: "var(--border-accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-badge)";
                e.currentTarget.style.borderColor = "var(--border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "var(--border-accent)";
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              live
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-small text-xs transition-colors px-3 py-1.5 rounded-md border"
              style={{
                color: "var(--text-accent)",
                borderColor: "var(--border-accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-badge)";
                e.currentTarget.style.borderColor = "var(--border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "var(--border-accent)";
              }}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
