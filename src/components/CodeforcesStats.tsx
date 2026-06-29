"use client";

import { useCodeforcesData } from "./codeforces/hooks/useCodeforcesData";
import { ActivityHeatmap } from "./codeforces/components/ActivityHeatmap";
import { CFAchievements } from "./codeforces/components/CFAchievements";
import { CodeforcesHero } from "./codeforces/components/CodeforcesHero";
import { ContestTable } from "./codeforces/components/ContestTable";
import { ErrorState } from "./codeforces/components/ErrorState";
import { InsightCards } from "./codeforces/components/InsightCards";
import { LoadingSkeleton } from "./codeforces/components/LoadingSkeleton";
import { ProgrammingLanguages } from "./codeforces/components/ProgrammingLanguages";
import { RatingChart } from "./codeforces/components/RatingChart";
import { RatingDistribution } from "./codeforces/components/RatingDistribution";
import { RecentAcceptedProblems } from "./codeforces/components/RecentAcceptedProblems";
import { StatisticsGrid } from "./codeforces/components/StatisticsGrid";
import { TopicDistribution } from "./codeforces/components/TopicDistribution";

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

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-8">
      <span className="text-code text-xs" style={{ color: "var(--text-accent)" }}>—</span>
      <span
        className="text-meta uppercase tracking-widest"
        style={{ color: "var(--text-muted)", fontSize: "0.62rem", letterSpacing: "0.12em" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "var(--border-primary)" }} />
    </div>
  );
}

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

        {/* ── Rating Distribution + Topic Distribution ──────────────── */}
        <SectionDivider label="Problem Analytics" />
        <div className="cf-section grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ animationDelay: "160ms" }}>
          <RatingDistribution distribution={stats.ratingDistribution} />
          <TopicDistribution topics={stats.topics} />
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

        {/* ── Contest History ───────────────────────────────────────── */}
        <SectionDivider label="Contest History" />
        <div className="cf-section" style={{ animationDelay: "240ms" }}>
          <ContestTable contests={stats.contests} />
        </div>

        {/* ── Recent Accepted Problems ──────────────────────────────── */}
        <SectionDivider label="Recent Problems" />
        <div className="cf-section" style={{ animationDelay: "280ms" }}>
          <RecentAcceptedProblems problems={stats.recentProblems} />
        </div>

        {/* ── Programming Languages ─────────────────────────────────── */}
        <SectionDivider label="Languages" />
        <div className="cf-section" style={{ animationDelay: "320ms" }}>
          <ProgrammingLanguages languages={stats.languages} />
        </div>

        {/* ── Achievements ─────────────────────────────────────────── */}
        <SectionDivider label="Achievements" />
        <div className="cf-section" style={{ animationDelay: "360ms" }}>
          <CFAchievements achievements={stats.achievements} />
        </div>

        {/* ── Personal Insights ─────────────────────────────────────── */}
        <SectionDivider label="Insights" />
        <div className="cf-section" style={{ animationDelay: "400ms" }}>
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
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
            </svg>
            View full Codeforces profile →
          </a>
        </div>
      </div>
    </>
  );
}
