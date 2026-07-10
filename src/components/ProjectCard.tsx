"use client";

import { TechIconsRow, Tooltip } from "@/components/icons/tech";
import { ActionButton } from "@/components/ui/ActionButton";
import { slugify, type Project } from "@/data/projects";
import { useTilt } from "@/hooks/useTilt";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { ref, tilt, spotlight, hovered, onMove, onEnter, onLeave } =
    useTilt(5);

  const {
    title,
    short_description,
    techStack,
    githubUrl,
    duration,
    photoUrl,
    liveUrl,
    collaborators,
  } = project;

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative rounded-md overflow-hidden flex flex-col h-full"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-primary)",
        transition:
          "transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(6px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(52,211,153,0.2)"
          : "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-md"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: hovered
            ? `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, rgba(52,211,153,0.06) 0%, transparent 70%)`
            : "transparent",
        }}
      />

      {/* Preview Image */}
      {photoUrl && photoUrl.length > 0 && (
        <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
          <div
            className="absolute inset-0"
            style={{ background: "var(--bg-secondary)" }}
          />
          <Image
            src={`/${photoUrl[0]}`}
            alt={`${title} preview`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, var(--bg-card) 100%)",
              opacity: 0.8,
            }}
          />

          {/* Live badge */}
          {liveUrl && (
            <div className="absolute top-2.5 right-2.5 z-20">
              <span
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold backdrop-blur-sm"
                style={{
                  background: "rgba(52,211,153,0.15)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  color: "var(--text-accent)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--text-accent)" }}
                />
                Live
              </span>
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 p-4 flex flex-col flex-1 gap-3">
        {/* Title + Duration row */}
        <div className="flex items-start justify-between gap-3">
          <Link href={`/projects/${slugify(title)}`} className="no-underline">
            <h3
              className="text-base font-semibold leading-snug transition-colors"
              style={{
                color: hovered ? "var(--text-accent)" : "var(--text-primary)",
                transition: "color 0.2s ease",
              }}
            >
              {title}
              <span
                className="inline-block ml-1.5 text-xs opacity-0 transition-all duration-200"
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateX(0)" : "translateX(-4px)",
                  color: "var(--text-accent)",
                }}
              >
                ↗
              </span>
            </h3>
          </Link>
          {duration && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 mt-0.5"
              style={{
                color: "var(--text-muted)",
                background: "var(--bg-code)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {duration}
            </span>
          )}
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {short_description}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tech stack icons — larger */}
        {techStack && techStack.length > 0 && (
          <TechIconsRow techStack={techStack} max={6} size={32} />
        )}

        {/* Bottom row: collaborators + action links */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--border-primary)" }}
        >
          {/* Collaborator avatars */}
          {collaborators && collaborators.length > 0 ? (
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                {collaborators.slice(0, 4).map((collab) => (
                  <Tooltip key={collab.github} label={collab.name}>
                    <a
                      href={`https://github.com/${collab.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-6 h-6 rounded-full overflow-hidden block"
                      style={{
                        border: "2px solid var(--bg-card)",
                        boxShadow: "0 0 0 2px var(--border-primary)",
                      }}
                    >
                      <Image
                        src={`https://github.com/${collab.github}.png?size=60`}
                        alt={collab.name}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </a>
                  </Tooltip>
                ))}
              </div>
              {collaborators.length > 4 && (
                <span
                  className="text-[10px] font-mono ml-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  +{collaborators.length - 4}
                </span>
              )}
            </div>
          ) : (
            <span />
          )}

          {/* Action Links */}
          <div className="flex items-center gap-1.5">
            <Link
              href={`/projects/${slugify(title)}`}
              className="details-link inline-flex items-center gap-1 font-mono rounded-md whitespace-nowrap"
              style={{
                color: "var(--text-accent)",
                background: "transparent",
                border: "1px solid var(--border-accent)",
                transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
                fontSize: "10px",
                padding: "2px 8px",
                lineHeight: "20px",
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
              Details
            </Link>
            {liveUrl && (
              <ActionButton href={liveUrl} icon="live" label="Live" />
            )}
            {githubUrl && (
              <ActionButton href={githubUrl} icon="github" label="Code" />
            )}
            {!liveUrl && !githubUrl && (
              <span
                className="text-[10px] font-mono italic"
                style={{ color: "var(--text-muted)" }}
              >
                Private
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
