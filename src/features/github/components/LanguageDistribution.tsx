"use client";

import type { LanguageStat } from "@/types/github";

// Inline icon lookup to avoid cross-boundary import issues with Turbopack
// when this component is loaded via next/dynamic with ssr: false.
const LANGUAGE_ICON_MAP: Record<string, string> = {
  c: "c",
  "c++": "cpp",
  javascript: "js",
  typescript: "ts",
  python: "py",
  java: "java",
  dart: "dart",
  sql: "postgres",
  plpgsql: "postgres",
  tsql: "postgres",
  bash: "bash",
  shell: "bash",
  zsh: "bash",
  fish: "bash",
  powershell: "bash",
  "c#": "cs",
  "next.js": "nextjs",
  react: "react",
  "react.js": "react",
  "node.js": "nodejs",
  nodejs: "nodejs",
  "express.js": "express",
  flutter: "flutter",
  "tailwind css": "tailwind",
  tailwindcss: "tailwind",
  html: "html",
  css: "css",
  jquery: "jquery",
  arduino: "arduino",
  supabase: "supabase",
  postgresql: "postgresql",
  postgres: "postgresql",
  mysql: "mysql",
  bun: "bun",
  docker: "docker",
  git: "git",
  github: "github",
  bitbucket: "bitbucket",
  ".net": "dotnet",
  latex: "latex",
  tex: "latex",
  "vs code": "vscode",
};

function getLanguageIconUrl(
  name: string,
  theme: "light" | "dark" = "light",
): string {
  const iconId = LANGUAGE_ICON_MAP[name.trim().toLowerCase()];
  if (!iconId) return "";
  return `https://skillicons.dev/icons?i=${iconId}&theme=${theme}`;
}

interface Props {
  languages: LanguageStat[];
}

export function LanguageDistribution({ languages }: Props) {
  const top = languages.slice(0, 10);

  if (!top.length) {
    return (
      <div
        className="rounded-md p-6 text-center"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          No language data available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-md p-5 md:p-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-primary)",
      }}
    >
      <h3
        className="text-subheading font-semibold text-sm mb-4"
        style={{ color: "var(--text-secondary)" }}
      >
        Programming Languages
      </h3>

      <div className="flex flex-wrap gap-3">
        {top.map((lang) => {
          const iconUrl = getLanguageIconUrl(lang.name);
          return (
            <div
              key={lang.name}
              className="flex flex-col items-center justify-center gap-2 rounded-md transition-all duration-200 hover:scale-105"
              title={`${lang.name} — ${lang.percentage}% (${lang.repoCount} repo${lang.repoCount !== 1 ? "s" : ""})`}
            >
              {iconUrl.length != 0 ? (
                <img
                  src={iconUrl}
                  alt={lang.name}
                  width={56}
                  height={56}
                  className="pointer-events-none select-none"
                />
              ) : (
                <span
                  className="text-md w-14 text-center justify-content leading-tight clip-line-1 text-ellipsis overflow-hidden"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                  }}
                >
                  {lang.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
