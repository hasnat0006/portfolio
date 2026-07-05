"use client";

import { ContributionHeatmap } from "@/components/github/components/ContributionHeatmap";
import { ContributionTimeline } from "@/components/github/components/ContributionTimeline";
import { GHErrorState } from "@/components/github/components/GHErrorState";
import { GHLoadingSkeleton } from "@/components/github/components/GHLoadingSkeleton";
import { GitHubHero } from "@/components/github/components/GitHubHero";
import { LanguageDistribution } from "@/components/github/components/LanguageDistribution";
import { useGitHubData } from "@/components/github/hooks/useGitHubData";

// ── CSS fade-up animation (replaces framer-motion) ────────────────────────────

const SECTION_FADE_CSS = `
@keyframes gh-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.gh-section {
  opacity: 0;
  animation: gh-fade-up 0.5s ease-out forwards;
}
.gh-section:nth-child(1) { animation-delay: 0ms; }
.gh-section:nth-child(2) { animation-delay: 100ms; }
.gh-section:nth-child(3) { animation-delay: 200ms; }
.gh-section:nth-child(4) { animation-delay: 300ms; }
@media (prefers-reduced-motion: reduce) {
  .gh-section { opacity: 1; animation: none; }
}
`;

// ── Main component ────────────────────────────────────────────────────────────

export default function GitHubStats() {
  const { loading, error, data } = useGitHubData();

  if (loading) return <GHLoadingSkeleton />;
  if (error || !data)
    return <GHErrorState message={error ?? "No data available"} />;

  const { userInfo, stats, languages, heatmap, activityTimeline } = data;

  return (
    <>
      <style>{SECTION_FADE_CSS}</style>
      <div className="space-y-6 md:space-y-8">
        {/* ── Hero Card ──────────────────────────────────────────── */}
        <div className="gh-section">
          <GitHubHero userInfo={userInfo} stats={stats} />
        </div>

        {/* ── Contribution Heatmap (full width) ──────────────────── */}
        <div className="gh-section">
          <ContributionHeatmap
            heatmap={heatmap}
            currentStreak={stats.currentStreak}
            longestStreak={stats.longestStreak}
            totalContributions={stats.totalContributions}
          />
        </div>

        {/* ── Languages + Recent Activity (side by side on lg) ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="gh-section">
            <LanguageDistribution languages={languages} />
          </div>
          <div className="gh-section">
            <ContributionTimeline items={activityTimeline} maxItems={5} />
          </div>
        </div>
      </div>
    </>
  );
}
