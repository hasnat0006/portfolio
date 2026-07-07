"use client";

import { StatCard } from "./StatCard";

interface AchievementStatsProps {
  totalContests: number;
  bestContest: number;
}

/**
 * Statistics bar showing key contest numbers with animated counters.
 */
export function AchievementStats({
  totalContests,
  bestContest,
}: AchievementStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
      <StatCard
        label="Total Contests"
        value={totalContests}
        sub="participated"
        delay={0}
      />
      <StatCard
        label="ICPC Regional Onsite"
        value={2}
        sub="appearances"
        delay={80}
      />
      <StatCard
        label="Best ICPC Onsite Rank"
        value="#77"
        sub="milestones"
        delay={160}
      />
      <StatCard
        label="Best IUPC Contest Rank"
        value={`#${bestContest}`}
        sub="in any contest"
        delay={240}
        isNumeric={false}
      />
    </div>
  );
}
