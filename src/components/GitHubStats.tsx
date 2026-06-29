"use client";

import { ContributionHeatmap } from "@/components/github/components/ContributionHeatmap";
import { ContributionTimeline } from "@/components/github/components/ContributionTimeline";
import { GHErrorState } from "@/components/github/components/GHErrorState";
import { GHLoadingSkeleton } from "@/components/github/components/GHLoadingSkeleton";
import { GitHubHero } from "@/components/github/components/GitHubHero";
import { LanguageDistribution } from "@/components/github/components/LanguageDistribution";
import { useGitHubData } from "@/components/github/hooks/useGitHubData";
import { motion } from "framer-motion";

// ── Section wrapper with fade-up animation ───────────────────────────────────

function SectionWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function GitHubStats() {
  const { loading, error, data } = useGitHubData();

  if (loading) return <GHLoadingSkeleton />;
  if (error || !data)
    return <GHErrorState message={error ?? "No data available"} />;

  const { userInfo, stats, languages, heatmap, activityTimeline } = data;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div>
        <h2
          className="text-heading text-2xl md:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          Open Source &amp; Development
        </h2>
        <p
          className="text-code text-sm mt-1"
          style={{ color: "var(--text-muted)" }}
        >
          Building production software, contributing to open source, and
          continuously learning through real-world engineering.
        </p>
      </div>

      {/* ── Hero Card ──────────────────────────────────────────── */}
      <SectionWrapper>
        <GitHubHero userInfo={userInfo} stats={stats} />
      </SectionWrapper>

      {/* ── Contribution Heatmap (full width) ──────────────────── */}
      <SectionWrapper>
        <ContributionHeatmap
          heatmap={heatmap}
          currentStreak={stats.currentStreak}
          longestStreak={stats.longestStreak}
          totalContributions={stats.totalContributions}
        />
      </SectionWrapper>

      {/* ── Languages + Recent Activity (side by side on lg) ────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionWrapper>
          <LanguageDistribution languages={languages} />
        </SectionWrapper>
        <SectionWrapper>
          <ContributionTimeline items={activityTimeline} maxItems={5} />
        </SectionWrapper>
      </div>
    </div>
  );
}
