"use client";

import AnimatedTooltip from "@/components/ui/AnimatedTooltip";
import type { Collaborator } from "@/data/projects";
import { skillIconUrl } from "@/data/skills";
import { useRef, useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 6;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const gradientStyle = isHovered
    ? {
        background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(52,211,153,0.08) 0%, transparent 70%)`,
      }
    : {};

  return (
    <article
      ref={cardRef}
      className="group relative rounded-md overflow-hidden flex flex-col h-full cursor-pointer"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-accent)",
        transition:
          "transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s cubic-bezier(0.23,1,0.32,1)",
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(52,211,153,0.25), 0 0 40px rgba(52,211,153,0.06)"
          : "0 2px 12px rgba(0,0,0,0.08)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Animated gradient spotlight overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-md transition-opacity duration-300"
        style={{
          ...gradientStyle,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* ── Animated border glow on hover ── */}
      <div
        className="absolute inset-0 rounded-md pointer-events-none z-0"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(52,211,153,0.15) 0%, transparent 50%, rgba(34,211,238,0.08) 100%)"
            : "transparent",
          transition: "background 0.4s ease",
        }}
      />

      {/* ── Preview Image ── */}
      {photoUrl && photoUrl.length > 0 && (
        <div className="relative w-full h-64 overflow-hidden flex-shrink-0">
          {/* Skeleton shimmer — always rendered; img covers it once loaded */}
          <div
            className="absolute inset-0 animate-pulse"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                animation: "shimmer 1.5s infinite",
              }}
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/${photoUrl[0]}`}
            alt={`${title} preview`}
            className="object-cover"
            loading="lazy"
            suppressHydrationWarning
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transition:
                "transform 0.6s cubic-bezier(0.23,1,0.32,1), filter 0.4s ease",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
              filter: isHovered ? "brightness(1.05)" : "brightness(0.95)",
            }}
          />
          {/* Image overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, var(--bg-card) 100%)",
              opacity: 0.8,
            }}
          />

          {/* Live badge floating on image */}
          {liveUrl && (
            <div className="absolute top-3 right-3 z-20">
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold backdrop-blur-sm"
                style={{
                  background: "rgba(52,211,153,0.15)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  color: "var(--text-accent)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-md"
                  style={{
                    background: "var(--text-accent)",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                Live
              </span>
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 p-5 flex flex-col flex-1">
        {/* ── Header row: duration badge + title ── */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            {/* Duration Badge */}
            {duration && (
              <div
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md mb-2 text-xs font-mono"
                style={{
                  background: "var(--bg-badge)",
                  border: "1px solid var(--border-accent)",
                  color: "var(--text-accent)",
                }}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {duration}
              </div>
            )}

            {/* Title */}
            <h3
              className="text-subheading mt-2 text-base leading-snug"
              style={{
                color: "var(--text-primary)",
                transition: "color 0.2s ease",
              }}
            >
              <span
                style={{
                  color: "var(--text-accent)",
                  marginRight: "6px",
                  display: "inline-block",
                  transition: "transform 0.3s ease",
                  transform: isHovered ? "translateX(3px)" : "translateX(0)",
                }}
              >
                ▸
              </span>
              {title}
            </h3>
          </div>
        </div>

        {/* ── Description ── */}
        {description && (
          <p
            className="text-sm mb-4 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        )}

        {/* ── Tech Stack ── */}
        {techStack && techStack.length > 0 && (
          <div className="mb-4 w-fit">
            <AnimatedTooltip
              items={techStack
                .map((tech, i) => ({
                  id: i,
                  name: tech,
                  image: skillIconUrl(tech, "dark"),
                }))
                .filter((item) => item.image)}
            />
          </div>
        )}

        {/* ── Collaborators ── */}
        {collaborators && collaborators.length > 0 && (
          <div className="flex items-center gap-3 mb-4 pb-3">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--text-muted)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <span
                className="text-xs font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                +{collaborators.length} member
                {collaborators.length > 1 ? "s" : ""}
              </span>
            </div>
            <AnimatedTooltip
              items={collaborators.map((c, i) => ({
                id: i,
                name: c.name,
                image: `https://github.com/${c.github}.png`,
              }))}
            />
          </div>
        )}

        {/* ── GitHub Stats ── */}

        {/* ── Spacer ── */}
        <div className="flex-1" />

        {/* ── Action Links ── */}
        <div
          className="flex items-center gap-2 pt-3"
          style={{ borderTop: "1px solid var(--border-primary)" }}
        >
          {liveUrl && (
            <ActionLink href={liveUrl} icon="live" label="Live Demo" />
          )}
          {githubUrl && (
            <ActionLink href={githubUrl} icon="github" label="Source Code" />
          )}
          {!liveUrl && !githubUrl && (
            <span
              className="text-xs font-mono italic"
              style={{ color: "var(--text-muted)" }}
            >
              Private project
            </span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </article>
  );
}

// ── Reusable action link button ──────────────────────────────────────────────
function ActionLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: "live" | "github";
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md"
      style={{
        color: hovered ? "var(--bg-primary)" : "var(--text-accent)",
        background: hovered ? "var(--text-accent)" : "transparent",
        border: "1px solid var(--border-accent)",
        transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered ? "0 4px 12px rgba(52,211,153,0.25)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon === "live" ? (
        <svg
          className="w-3.5 h-3.5"
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
      ) : (
        <svg
          className="w-3.5 h-3.5"
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
      )}
      {label}
    </a>
  );
}
