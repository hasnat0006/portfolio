"use client";

import { SectionDivider } from "@/components/shared/SectionDivider";
import { BestContests } from "@/features/codeforces/components/BestContests";
import { CodeforcesHero } from "@/features/codeforces/components/CodeforcesHero";
import { ErrorState } from "@/features/codeforces/components/ErrorState";
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
          <StatisticsGrid
            userInfo={userInfo}
            stats={stats}
            insights={stats.insights}
          />
        </div>

        {/* ── Rating Progress ───────────────────────────────────────── */}
        <SectionDivider label="Rating Progress" />
        <div className="cf-section" style={{ animationDelay: "120ms" }}>
          <RatingChart ratingHistory={ratingHistory} />
        </div>

        {/* ── Best Contests ─────────────────────────────────────────── */}
        <SectionDivider label="Best Performances" />
        <div className="cf-section" style={{ animationDelay: "240ms" }}>
          <BestContests contests={stats.contests} />
        </div>
      </div>
    </>
  );
}
