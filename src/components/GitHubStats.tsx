"use client";

import { useEffect, useState } from "react";

type GitHubStatsData = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  languages: Array<{ name: string; count: number }>;
};

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div
          className="h-6 rounded w-48"
          style={{ background: "var(--bg-card-hover)" }}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-xl"
              style={{ background: "var(--bg-card-hover)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const statItems = [
    { label: "Repositories", value: stats.publicRepos, icon: "📦" },
    { label: "Stars", value: stats.totalStars, icon: "⭐" },
    { label: "Forks", value: stats.totalForks, icon: "🍴" },
    { label: "Followers", value: stats.followers, icon: "👥" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-4 text-center transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span className="text-2xl">{item.icon}</span>
            <p
              className="text-2xl font-bold text-code mt-1"
              style={{ color: "var(--text-accent)" }}
            >
              {item.value}
            </p>
            <p
              className="text-meta mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h4
          className="text-small text-sm font-semibold mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Languages
        </h4>
        <div className="flex flex-wrap gap-2">
          {stats.languages.map((lang) => (
            <span
              key={lang.name}
              className="px-3 py-1 rounded-full text-meta font-medium"
              style={{
                background: "var(--bg-badge)",
                color: "var(--text-accent)",
                border: "1px solid var(--border-accent)",
              }}
            >
              {lang.name} ({lang.count})
            </span>
          ))}
        </div>
      </div>

      {/* GitHub link */}
      <a
        href={stats.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-small text-sm transition-colors"
        style={{ color: "var(--text-accent)" }}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
        View full profile →
      </a>
    </div>
  );
}
