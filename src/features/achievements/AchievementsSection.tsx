"use client";

import { SectionDivider } from "@/components/shared/SectionDivider";
import {
  CONTEST_ACHIEVEMENTS,
  KEY_CONTEST_ACHIEVEMENTS,
  OTHER_ACHIEVEMENTS,
} from "@/data/achievements";
import { AchievementHeader } from "./components/AchievementHeader";
import { AchievementStats } from "./components/AchievementStats";
import { AchievementTable } from "./components/AchievementTable";
import { FeaturedContestCard } from "./components/FeaturedContestCard";
import { OtherAchievementCard } from "./components/OtherAchievementCard";

export default function AchievementsSection() {
  const bestContest = Math.min(
    ...CONTEST_ACHIEVEMENTS.map((a) => Number(a.rank)),
  );
  const totalContests =
    KEY_CONTEST_ACHIEVEMENTS.length + CONTEST_ACHIEVEMENTS.length;

  return (
    <section
      id="achievements"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
    >
      <style>{`@keyframes achievement-count-pop{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}.achievement-shimmer-hover{position:relative;overflow:hidden}`}</style>

      <div className="max-w-6xl mx-auto">
        <AchievementHeader />
        <AchievementStats
          totalContests={totalContests}
          bestContest={bestContest}
        />

        <SectionDivider label="Key Achievements" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {KEY_CONTEST_ACHIEVEMENTS.map((achievement, index) => (
            <div key={index} className="break-inside-avoid">
              <FeaturedContestCard achievement={achievement} index={index} />
            </div>
          ))}
        </div>

        <SectionDivider label="All ICPC & IUPC Contests" />
        <AchievementTable achievements={CONTEST_ACHIEVEMENTS} />

        <div className="mt-12">
          <SectionDivider label="Other Achievements" />
          <div className="columns-1 md:columns-2 lg:columns-3 gap-3">
            {OTHER_ACHIEVEMENTS.map((achievement, index) => (
              <div key={index} className="break-inside-avoid mb-3">
                <OtherAchievementCard achievement={achievement} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
