"use client";

import { SectionDivider } from "@/components/shared/SectionDivider";
import { ActivityHeatmap } from "@/features/codeforces/components/ActivityHeatmap";
import { BestContests } from "@/features/codeforces/components/BestContests";
import { CodeforcesHero } from "@/features/codeforces/components/CodeforcesHero";
import { ErrorState } from "@/features/codeforces/components/ErrorState";
import { InsightCards } from "@/features/codeforces/components/InsightCards";
import { LoadingSkeleton } from "@/features/codeforces/components/LoadingSkeleton";
import { RatingChart } from "@/features/codeforces/components/RatingChart";
import { StatisticsGrid } from "@/features/codeforces/components/StatisticsGrid";
import { useCodeforcesData } from "@/hooks/useCodeforcesData";

const SECTION_CSS = `
@keyframes cf-section-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.cf-section {
  animation: cf-section-in 0.6s ease-out both;
}
@media (prefers-reduced-motion: reduce) {
  .cf-section { animation: none !important; }
}
`;

export default function CodeforcesStats() {
  const { loading, error, data } = useCodeforcesData();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <ErrorState message={error ?? undefined} />;

  const { userInfo, ratingHistory, stats } = data;

  return (
    <>
      <style>{SECTION_CSS}</style>
      <div className="space-y-6">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="cf-section" style={{ animationDelay: "0ms" }}>
          <CodeforcesHero userInfo={userInfo} stats={stats} />
        </div>

        {/* ── Statistics Grid ───────────────────────────────────────── */}
        <div className="cf-section" style={{ animationDelay: "80ms" }}>
          <StatisticsGrid userInfo={userInfo} stats={stats} />
        </div>

        {/* ── Rating Progress ───────────────────────────────────────── */}
        <SectionDivider label="Rating Progress" />
        <div className="cf-section" style={{ animationDelay: "120ms" }}>
          <RatingChart ratingHistory={ratingHistory} />
        </div>

        {/* ── Activity Heatmap ──────────────────────────────────────── */}
        <SectionDivider label="Activity" />
        <div className="cf-section" style={{ animationDelay: "200ms" }}>
          <ActivityHeatmap
            heatmap={stats.heatmap}
            currentStreak={stats.currentStreak}
            longestStreak={stats.longestStreak}
          />
        </div>

        {/* ── Best Contests ─────────────────────────────────────────── */}
        <SectionDivider label="Best Performances" />
        <div className="cf-section" style={{ animationDelay: "240ms" }}>
          <BestContests contests={stats.contests} />
        </div>

        {/* ── Personal Insights ─────────────────────────────────────── */}
        <SectionDivider label="Insights" />
        <div className="cf-section" style={{ animationDelay: "280ms" }}>
          <InsightCards insights={stats.insights} />
        </div>

        {/* ── Footer link ───────────────────────────────────────────── */}
        <div className="flex justify-center pt-4">
          <a
            href={`https://codeforces.com/profile/${userInfo.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-opacity"
            style={{ color: "var(--text-accent)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.7")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
            </svg>
            View full Codeforces profile →
          </a>
        </div>
      </div>
    </>
  );
}
