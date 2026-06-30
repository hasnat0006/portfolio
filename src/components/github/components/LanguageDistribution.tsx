"use client";

import { skillIconUrl } from "@/data/languageIcons";
import type { LanguageStat } from "../types";

interface Props {
  languages: LanguageStat[];
}

export function LanguageDistribution({ languages }: Props) {
  const top = languages.slice(0, 10);

  if (!top.length) {
    return (
      <div
        className="rounded-2xl p-6 text-center"
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
      className="rounded-2xl p-5 md:p-6"
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
          const iconUrl = skillIconUrl(lang.name);
          return (
            <div
              key={lang.name}
              className="flex flex-col items-center justify-center gap-2 rounded-xl transition-all duration-200 hover:scale-105"
              title={`${lang.name} — ${lang.percentage}% (${lang.repoCount} repo${lang.repoCount !== 1 ? "s" : ""})`}
            >
              {iconUrl.length != 0 ? (
                <img
                  src={iconUrl}
                  alt={lang.name}
                  className="w-14 pointer-events-none select-none"
                  loading="lazy"
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
