"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { type ContestAchievement } from "@/data/achievements";
import { useInView } from "@/hooks/useInView";
import { ContestRow } from "./ContestRow";
import { TableHeader } from "./TableHeader";

interface AchievementTableProps {
  achievements: ContestAchievement[];
}

/**
 * Full ICPC / IUPC achievements table with glassmorphism container.
 * Handles the scroll-into-view animation for all rows.
 */
export function AchievementTable({ achievements }: AchievementTableProps) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref}
      className="overflow-x-auto md:overflow-visible mb-8 md:mb-10"
    >
      <GlassCard className="min-w-[650px] md:min-w-full">
        <table className="w-full border-collapse">
          <TableHeader />
          <tbody>
            {achievements.map((achievement, index) => (
              <ContestRow
                key={index}
                achievement={achievement}
                index={index}
                inView={inView}
              />
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
